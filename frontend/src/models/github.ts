export interface DependencyGraphManifest {
  blobPath: string;
  filename: string;
  repository: string;
  dependencies: Dependency[];
}

export interface Dependency {
  packageName: string;
  requirements: string;
  purl: string;
}
