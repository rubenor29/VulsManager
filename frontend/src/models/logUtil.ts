export interface LogOpts {
  debug: boolean | null;
  debugSQL: boolean | null;
  logToFile: boolean | null;
  logDir: string | null;
  logJSON: boolean;
  quiet: boolean | null;
}
