export interface LibraryScanner {
  Type: string;
  Libs: Library[];
  path: string | null;
}

export interface Library {
  Name: string;
  Version: string;
  PURL: string;
  FilePath: string;
  Digest: string;
  Dev: boolean;
  ID: string | null;
  Relationship: string | null;
  DependsOn: string[] | null;
}
