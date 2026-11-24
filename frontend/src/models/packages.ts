export interface Package {
  name: string;
  version: string;
  release: string;
  newVersion: string;
  newRelease: string;
  arch: string;
  repository: string;
  vendor: string | null;
  modularitylabel: string;
  changelog: Changelog | null;
  AffectedProcs: AffectedProcess[] | null;
  NeedRestartProcs: NeedRestartProcess[] | null;
  repositoryClass: string | null;
}

export interface Changelog {
  contents: string;
  method: string;
}

export interface AffectedProcess {
  pid: string | null;
  name: string | null;
  listenPorts: string[] | null;
  listenPortStats: PortStat[] | null;
}

export interface PortStat {
  bindAddress: string;
  port: string;
  portReachableTo: string[];
}

export interface NeedRestartProcess {
  pid: string;
  path: string;
  serviceName: string;
  initSystem: string;
}

export interface SrcPackage {
  name: string;
  version: string;
  arch: string;
  binaryNames: string[];
}
