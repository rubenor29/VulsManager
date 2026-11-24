import type { LogOpts } from "./logUtil";

export interface Config extends LogOpts {
  httpProxy: string | null;
  resultsDir: string | null;
  pipe: boolean | null;
  default: ServerInfo;
  servers: Record<string, ServerInfo> | null;
  vuls2: Vuls2Conf;
  logLevel: string | null;
  [key: string]: unknown;
}

export interface ServerInfo {
  serverName: string | null;
  user: string | null;
  host: string | null;
  ignoreIPAddresses: string[] | null;
  jumpServer: string[] | null;
  port: string | null;
  sshConfigPath: string | null;
  keyPath: string | null;
  cpeNames: string[] | null;
  scanMode: string[] | null;
  scanModules: string[] | null;
  owaspDCXMLPath: string | null;
  containersOnly: boolean | null;
  containersIncluded: string[] | null;
  containersExcluded: string[] | null;
  containerType: string | null;
  containers: Record<string, ContainerSetting> | null;
  ignoreCves: string[] | null;
  ignorePkgsRegexp: string[] | null;
  uuids: Record<string, string> | null;
  memo: string | null;
  enablerepo: string[] | null;
  disablerepo: string[] | null;
  optional: Record<string, unknown | null> | null;
  lockfiles: string[] | null;
  findLock: boolean | null;
  findLockDirs: string[] | null;
  type: string | null;
  ignoredJSONKeys: string[] | null;
  wordpress: WordPressConf | null;
  portscan: PortScanConf | null;
  windows: WindowsConf | null;
  ipv4Addrs: string[] | null;
  ipv6Addrs: string[] | null;
  ipsIdentifiers: Record<string, string> | null;
}

export interface Vuls2Conf {
  Repository: string;
  Digest: string | null;
  Path: string;
  SkipUpdate: boolean;
}

export interface ContainerSetting {
  cpes: string[] | null;
  owaspDCXMLPath: string | null;
  ignorePkgsRegexp: string[] | null;
  ignoreCves: string[] | null;
}

export interface WordPressConf {
  osUser: string | null;
  docRoot: string | null;
  cmdPath: string | null;
  noSudo: boolean | null;
}

export interface PortScanConf {
  scannerBinPath: string | null;
  hasPrivileged: boolean | null;
  scanTechniques: string[] | null;
  sourcePort: string | null;
}

export interface WindowsConf {
  serverSelection: number | null;
  cabPath: string | null;
}
