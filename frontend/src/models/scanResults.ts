import type { Cwe } from "./cwe";
import type { DependencyGraphManifest } from "./github";
import type { LibraryScanner } from "./library";
import type { Package, SrcPackage } from "./packages";
import type { Config } from "./config";
import type { VulnInfo } from "./vulnInfos";
import type { WpPackage } from "./wordPress";

export interface ScanResult {
  jsonVersion: number;
  lang: string;
  serverUUID: string;
  serverName: string;
  family: string;
  release: string;
  container: Container;
  platform: Platform;
  ipv4Addrs: string[] | null;
  ipv6Addrs: string[] | null;
  ipsIdentifiers: Record<string, string> | null;
  scannedAt: string;
  scanMode: string;
  scannedVersion: string;
  scannedRevision: string;
  scannedBy: string;
  scannedVia: string;
  scannedIpv4Addrs: string[] | null;
  scannedIpv6Addrs: string[] | null;
  reportedAt: string;
  reportedVersion: string;
  reportedRevision: string;
  reportedBy: string;
  errors: string[];
  warnings: string[];
  scannedCves: Record<string, VulnInfo>;
  runningKernel: Kernel;
  packages: Record<string, Package>;
  SrcPackages: Record<string, SrcPackage>;
  enabledDnfModules: string[] | null;
  WordPressPackages: WpPackage[];
  gitHubManifests: Record<string, DependencyGraphManifest>;
  libraries: LibraryScanner[];
  windowsKB: WindowsKB | null;
  cweDict: Record<string, CweDictEntry>;
  capecDict: Record<string, CapecDictEntry>;
  attackDict: Record<string, AttackDictEntry>;
  Optional: Record<string, unknown | null> | null;
  config: ScanResultConfig;
}

export interface ScanResultConfig {
  scan: Config;
  report: Config;
}

export interface Container {
  containerID: string;
  name: string;
  image: string;
  type: string;
  uuid: string;
}

export interface Platform {
  name: string;
  instanceID: string;
}

export interface Kernel {
  release: string;
  version: string;
  rebootRequired: boolean;
}

export interface WindowsKB {
  applied: string[] | null;
  unapplied: string[] | null;
}

export interface CweDictEntry {
  en: Cwe | null;
  ja: Cwe | null;
  owaspTopTens: Record<string, string>;
  cweTopTwentyfives: Record<string, string>;
  sansTopTwentyfives: Record<string, string>;
}

export interface CapecDictEntry {
  capecID: string;
  name: string | null;
}

export interface AttackDictEntry {
  attackID: string;
  name: string | null;
  platforms: string[] | null;
}
