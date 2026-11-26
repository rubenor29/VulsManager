import type { VulnInfo } from "@/models";
import { sortVulnsBySeverity } from "@/modules";
import { CvesSummary } from "./CvesSummary";
import type { Severity } from "@/modules/cveModules";

function formatString(value: string | null | undefined) {
    return value === null || value === undefined || value.trim() === "" ? "N/A" : value;
}

function formatBoolean(value: boolean | null, negate: boolean = false) {
    if (value === null) return "N/A";
    if (negate) return !value ? "Si" : "No";
    else return value ? "Si" : "No";
}

/** Mapea la severidad a clases de DaisyUI (solo presentación). */
function severityStyles(severity: Severity | undefined = undefined): { badge: string; border: string } {
    switch (String(severity ?? "").toLowerCase()) {
        case "critical":
            return { badge: "badge-error", border: "border-l-error" };
        case "high":
            return { badge: "badge-warning", border: "border-l-warning" };
        case "medium":
            return { badge: "badge-info", border: "border-l-info" };
        case "low":
            return { badge: "badge-success", border: "border-l-success" };
        default:
            return { badge: "badge-ghost", border: "border-l-base-300" };
    }
}

/** Badge visual para un booleano formateado con `formatBoolean`. */
function BooleanBadge({ value, negate = false }: { value: boolean | null; negate?: boolean }) {
    const label = formatBoolean(value, negate);
    if (label === "Si") return <span className="badge badge-success badge-sm">{label}</span>;
    if (label === "No") return <span className="badge badge-error badge-sm">{label}</span>;
    return <span className="text-base-content/50">{label}</span>;
}

export function CveReport({ scannedCves }: { scannedCves: Record<string, VulnInfo> }) {
    const cves = sortVulnsBySeverity(scannedCves);
    const hasCves = cves.uncategorized.length + cves.categorized.length;


    return (
        <section aria-label="CVEs encontrados">
            <div className="card bg-base-100 border border-base-300 shadow-sm print:shadow-none">
                <div className="card-body gap-4">
                    <h2 className="card-title text-lg">CVEs Encontrados</h2>

                    <CvesSummary cves={cves} />

                    {!hasCves && (
                        <p className="text-sm italic text-base-content/60">
                            No se encontraron CVEs en este equipo
                        </p>
                    )}

                    {hasCves && (
                        <div className="space-y-4">
                            {cves.categorized.map((c) => {
                                const sev = severityStyles(c.severity);
                                return (
                                    <article
                                        key={c.id}
                                        className={`border border-base-300 border-l-4 ${sev.border} rounded-box p-4 space-y-3 bg-base-100`}
                                    >
                                        <header className="flex items-start justify-between gap-3 flex-wrap">
                                            <h3 className="font-mono font-semibold text-base break-all">
                                                {c.id}
                                            </h3>
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <span className={`badge ${sev.badge} badge-sm uppercase`}>
                                                    {c.severity}
                                                </span>
                                                <span className="badge badge-outline badge-sm tabular-nums">
                                                    Score: {c.score}
                                                </span>
                                            </div>
                                        </header>

                                        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-sm">
                                            <div className="flex justify-between gap-2 border-b border-base-200 py-1">
                                                <dt className="text-base-content/60">Fuente</dt>
                                                <dd className="font-medium">{c.source}</dd>
                                            </div>
                                            <div className="flex justify-between gap-2 border-b border-base-200 py-1">
                                                <dt className="text-base-content/60">Versión CVSS</dt>
                                                <dd className="font-medium">{c.cvssVersion}</dd>
                                            </div>
                                        </dl>

                                        {c.vuln.affectedPackages !== null && (
                                            <div className="space-y-2">
                                                <h4 className="text-xs font-semibold uppercase tracking-wider text-base-content/60">
                                                    Paquetes afectados
                                                </h4>
                                                <div className="overflow-x-auto rounded-box border border-base-200">
                                                    <table className="table table-sm table-zebra">
                                                        <caption className="sr-only">
                                                            Paquetes afectados por {c.id}
                                                        </caption>
                                                        <thead>
                                                            <tr>
                                                                <th scope="col" className="w-12 text-right">#</th>
                                                                <th scope="col">Nombre</th>
                                                                <th scope="col">Parcheado</th>
                                                                <th scope="col">Estado del parche</th>
                                                                <th scope="col">Arreglado en</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {c.vuln.affectedPackages.map((pkg, idx) => (
                                                                <tr key={idx}>
                                                                    <td className="text-right text-base-content/50 tabular-nums">
                                                                        {idx + 1}
                                                                    </td>
                                                                    <td className="font-mono">{formatString(pkg.name)}</td>
                                                                    <td>
                                                                        <BooleanBadge value={pkg.notFixedYet} negate />
                                                                    </td>
                                                                    <td>{formatString(pkg.fixState)}</td>
                                                                    <td className="font-mono">{formatString(pkg.fixedIn)}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        )}
                                    </article>
                                );
                            })}
                            {cves.uncategorized.map((c) => {
                                const sev = severityStyles();
                                return (
                                    <article
                                        key={c.id}
                                        className={`border border-base-300 border-l-4 rounded-box p-4 space-y-3 bg-base-100`}
                                    >
                                        <header className="flex items-start justify-between gap-3 flex-wrap">
                                            <h3 className="font-mono font-semibold text-base break-all">
                                                {c.id}
                                            </h3>
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <span className={`badge ${sev.badge} badge-sm uppercase`}>
                                                    Sin categorizar
                                                </span>
                                            </div>
                                        </header>

                                        {c.vuln.affectedPackages !== null && (
                                            <div className="space-y-2">
                                                <h4 className="text-xs font-semibold uppercase tracking-wider text-base-content/60">
                                                    Paquetes afectados
                                                </h4>
                                                <div className="overflow-x-auto rounded-box border border-base-200">
                                                    <table className="table table-sm table-zebra">
                                                        <caption className="sr-only">
                                                            Paquetes afectados por {c.id}
                                                        </caption>
                                                        <thead>
                                                            <tr>
                                                                <th scope="col" className="w-12 text-right">#</th>
                                                                <th scope="col">Nombre</th>
                                                                <th scope="col">Parcheado</th>
                                                                <th scope="col">Estado del parche</th>
                                                                <th scope="col">Arreglado en</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {c.vuln.affectedPackages.map((pkg, idx) => (
                                                                <tr key={idx}>
                                                                    <td className="text-right text-base-content/50 tabular-nums">
                                                                        {idx + 1}
                                                                    </td>
                                                                    <td className="font-mono">{formatString(pkg.name)}</td>
                                                                    <td>
                                                                        <BooleanBadge value={pkg.notFixedYet} negate />
                                                                    </td>
                                                                    <td>{formatString(pkg.fixState)}</td>
                                                                    <td className="font-mono">{formatString(pkg.fixedIn)}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        )}
                                    </article>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
