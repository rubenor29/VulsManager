import type { CveContent } from "./cveContents";

export interface VulnInfo {
  cveID: string | null;
  confidences: Confidence[] | null;
  affectedPackages: PackageFixStatus[] | null;
  distroAdvisories: DistroAdvisory[] | null;
  cveContents: Record<string, CveContent[]> | null;
  exploits: Exploit[] | null;
  metasploits: Metasploit[] | null;
  mitigations: Mitigation[] | null;
  kevs: Kev[] | null;
  ctis: string[] | null;
  alertDict: AlertDict | null;
  cpeURIs: string[] | null;
  gitHubSecurityAlerts: GitHubSecurityAlert[] | null;
  wpPackageFixStats: WpPackageFixStatus[] | null;
  libraryFixedIns: LibraryFixedIn[] | null;
  windowsKBFixedIns: string[] | null;
  vulnType: string | null;
  diffStatus: string | null;
}

export interface Confidence {
  score: number;
  detectionMethod: string;
}

export interface PackageFixStatus {
  name: string | null;
  notFixedYet: boolean | null;
  fixState: string | null;
  fixedIn: string | null;
}

export interface DistroAdvisory {
  advisoryID: string;
  severity: string;
  issued: string;
  updated: string;
  description: string;
}

export interface Exploit {
  exploitType: string;
  id: string;
  url: string;
  description: string;
  verified: boolean | null;
  documentURL: string | null;
  shellCodeURL: string | null;
  binaryURL: string | null;
  paperURL: string | null;
  ghdbURL: string | null;
}

export interface Metasploit {
  name: string;
  title: string;
  description: string | null;
  URLs: string[] | null;
}

export interface Mitigation {
  cveContentType: string | null;
  mitigation: string | null;
  url: string | null;
}

export interface Kev {
  type: string | null;
  vendor_project: string | null;
  product: string | null;
  vulnerability_name: string | null;
  short_description: string | null;
  required_action: string | null;
  known_ransomware_campaign_use: string | null;
  date_added: string | null;
  due_date: string | null;
  cisa: CisaKev | null;
  vulncheck: VulnCheckKev | null;
  enisa: EnisaKev | null;
}

export interface CisaKev {
  note: string | null;
}

export interface VulnCheckKev {
  xdb: VulnCheckXdb[] | null;
  reported_exploitation: VulnCheckReportedExploitation[] | null;
}

export interface VulnCheckXdb {
  xdb_id: string | null;
  xdb_url: string | null;
  date_added: string | null;
  exploit_type: string | null;
  clone_ssh_url: string | null;
}

export interface VulnCheckReportedExploitation {
  url: string | null;
  date_added: string | null;
}

export interface EnisaKev {
  date_reported: string | null;
  patched_since: string | null;
  origin_source: string | null;
  exploitation_type: string | null;
  threat_actors_exploiting: string | null;
}

export interface AlertDict {
  cisa: Alert[];
  jpcert: Alert[];
  uscert: Alert[];
}

export interface Alert {
  url: string | null;
  title: string | null;
  team: string | null;
}

export interface GitHubSecurityAlert {
  repository: string;
  package: GsaVulnerablePackage;
  fixedIn: string;
  affectedRange: string;
  dismissed: boolean;
  dismissedAt: string;
  dismissReason: string;
}

export interface GsaVulnerablePackage {
  name: string;
  ecosystem: string;
  manifestFilename: string;
  manifestPath: string;
  requirements: string;
}

export interface WpPackageFixStatus {
  name: string | null;
  fixedIn: string | null;
}

export interface LibraryFixedIn {
  key: string | null;
  name: string | null;
  version: string | null;
  fixedIn: string | null;
  path: string | null;
}
