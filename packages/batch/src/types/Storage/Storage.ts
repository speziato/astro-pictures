interface Storage {
  createDestination: (dest: string) => Promise<boolean>;
  deleteDestination: (dest: string, force?: boolean) => Promise<boolean>;
  deleteFile: (params: {
    dest: string;
    filename: string;
    force?: boolean;
  }) => Promise<boolean>;
  destinationExists: (dest: string) => Promise<boolean>;
  fileOrDirExists: (dest: string, fileOrDirName: string) => Promise<boolean>;
  readFile: (params: { dest: string; filename: string }) => Promise<Buffer>;
  renameFile: (params: {
    dest: string;
    filename: string;
    newFilename: string;
  }) => Promise<boolean>;
  writeFile: (params: {
    dest: string;
    filename: string;
    content: Buffer;
    overwrite?: boolean;
    metadata?: Record<any, any>;
  }) => Promise<boolean>;
}

export default Storage;
