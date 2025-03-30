import Storage from "./Storage.js";

type StorageFactory = (
  endPoint: string,
  port: number,
  useSSL: boolean,
  accessKey: string,
  secretKey: string,
) => Storage;

export default StorageFactory;
