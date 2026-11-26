// Codigo vibecodeado, usar con cuidado
import type { VulnInfo } from "@/models";

export type Severity = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW" | "NONE";
type CvssVersion = "4.0" | "3" | "2" | "distro";

export type CategorizedCve = {
  id: string;
  vuln: VulnInfo;
  severity: Severity;
  score: number | null;
  source: string;
  cvssVersion: CvssVersion;
};

export type UnCategorizedCve = {
  id: string;
  vuln: VulnInfo;
};

export type SortedCves = {
  categorized: CategorizedCve[];
  uncategorized: UnCategorizedCve[];
};

type CvssMetric = {
  score: number | null;
  severity: Severity;
};

const severityRank: Record<Severity, number> = {
  CRITICAL: 5,
  HIGH: 4,
  MEDIUM: 3,
  LOW: 2,
  NONE: 1,
};

function normalizeSeverity(value: string | null | undefined): Severity | null {
  switch (value?.trim().toUpperCase()) {
    case "CRITICAL":
      return "CRITICAL";
    case "HIGH":
    case "IMPORTANT":
      return "HIGH";
    case "MEDIUM":
    case "MODERATE":
      return "MEDIUM";
    case "LOW":
    case "NEGLIGIBLE":
      return "LOW";
    case "NONE":
      return "NONE";
    default:
      return null;
  }
}

function severityFromScore(score: number): Severity {
  if (score >= 9) return "CRITICAL";
  if (score >= 7) return "HIGH";
  if (score >= 4) return "MEDIUM";
  if (score > 0) return "LOW";
  return "NONE";
}

function getMetric(
  content: NonNullable<VulnInfo["cveContents"]>[string][number],
  version: Exclude<CvssVersion, "distro">,
): CvssMetric | null {
  let score: number;
  let rawSeverity: string;

  switch (version) {
    case "4.0":
      score = content.cvss40Score;
      rawSeverity = content.cvss40Severity;
      break;
    case "3":
      score = content.cvss3Score;
      rawSeverity = content.cvss3Severity;
      break;
    case "2":
      score = content.cvss2Score;
      rawSeverity = content.cvss2Severity;
      break;
  }

  const validScore =
    Number.isFinite(score) && score >= 0 && score <= 10 ? score : null;

  // En estos modelos, 0 también puede ser el valor por defecto cuando no
  // hay puntuación. Por eso se considera puntuación disponible solo si > 0.
  if (validScore !== null && validScore > 0) {
    return { score: validScore, severity: severityFromScore(validScore) };
  }

  const severity = normalizeSeverity(rawSeverity);
  if (severity !== null) {
    return { score: severity === "NONE" ? 0 : null, severity };
  }

  return null;
}

function getThreat(vuln: VulnInfo): Omit<CategorizedCve, "id" | "vuln"> | null {
  const contents = Object.entries(vuln.cveContents ?? {}).flatMap(
    ([source, entries]) =>
      (entries ?? []).map((content) => ({ source, content })),
  );

  // Se elige primero la versión CVSS más reciente disponible. Dentro de
  // esa versión, se conserva la métrica de mayor severidad.
  const versions: Exclude<CvssVersion, "distro">[] = ["4.0", "3", "2"];

  for (const version of versions) {
    const candidates = contents.flatMap(({ source, content }) => {
      const metric = getMetric(content, version);
      return metric ? [{ ...metric, source, cvssVersion: version }] : [];
    });

    if (candidates.length > 0) {
      candidates.sort(
        (a, b) =>
          severityRank[b.severity] - severityRank[a.severity] ||
          (b.score ?? -1) - (a.score ?? -1) ||
          a.source.localeCompare(b.source),
      );

      return candidates[0];
    }
  }

  // Si no hay severidad CVSS, se intenta con los avisos de la distribución.
  const advisoryCandidates = (vuln.distroAdvisories ?? []).flatMap(
    (advisory) => {
      const severity = normalizeSeverity(advisory.severity);
      return severity
        ? [
            {
              severity,
              score: null,
              source: advisory.advisoryID,
              cvssVersion: "distro" as const,
            },
          ]
        : [];
    },
  );

  advisoryCandidates.sort(
    (a, b) =>
      severityRank[b.severity] - severityRank[a.severity] ||
      a.source.localeCompare(b.source),
  );

  return advisoryCandidates[0] ?? null;
}

export function sortVulnsBySeverity(
  vulns: Record<string, VulnInfo>,
): SortedCves {
  const categorized: CategorizedCve[] = [];
  const uncategorized: UnCategorizedCve[] = [];

  for (const [key, vuln] of Object.entries(vulns)) {
    const id = vuln.cveID ?? key;
    const threat = getThreat(vuln);

    if (threat) {
      categorized.push({ id, vuln, ...threat });
    } else {
      uncategorized.push({ id, vuln });
    }
  }

  categorized.sort(
    (a, b) =>
      severityRank[b.severity] - severityRank[a.severity] ||
      (b.score ?? -1) - (a.score ?? -1) ||
      a.id.localeCompare(b.id),
  );

  uncategorized.sort((a, b) => a.id.localeCompare(b.id));

  return { categorized, uncategorized };
}
