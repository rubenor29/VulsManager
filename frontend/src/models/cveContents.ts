export interface CveContent {
  type: string;
  cveID: string;
  title: string;
  summary: string;
  cvss2Score: number;
  cvss2Vector: string;
  cvss2Severity: string;
  cvss3Score: number;
  cvss3Vector: string;
  cvss3Severity: string;
  cvss40Score: number;
  cvss40Vector: string;
  cvss40Severity: string;
  ssvc: Ssvc | null;
  sourceLink: string;
  cpes: Cpe[] | null;
  references: Reference[] | null;
  cweIDs: string[] | null;
  published: string;
  lastModified: string;
  optional: Record<string, string> | null;
}

export interface Ssvc {
  exploitation: string | null;
  automatable: string | null;
  technical_impact: string | null;
}

export interface Cpe {
  uri: string;
  formattedString: string;
}

export interface Reference {
  link: string | null;
  source: string | null;
  refID: string | null;
  tags: string[] | null;
}
