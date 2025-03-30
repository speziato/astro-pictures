import * as Minio from "minio";
import StorageFactory from "../types/Storage/StorageFactory.js";
import { Logger } from "../utils/logger.js";

const checkIfBucketIsEmpty = (dest: string, minioClient: Minio.Client) => {
  return new Promise((resolve, reject) => {
    let isEmpty = true;
    const stream = minioClient.listObjectsV2(dest);
    stream.on("data", () => {
      isEmpty = false;
      stream.destroy();
    });
    stream.on("close", () => {
      resolve(isEmpty);
    });
    stream.on("error", err => {
      reject(err);
    });
  });
};

const readMinioFile = (
  params: { dest: string; filename: string },
  minioClient: Minio.Client,
) => {
  return new Promise<Buffer>((resolve, reject) => {
    minioClient
      .getObject(params.dest, params.filename)
      .then(stream => {
        const chunks: any[] = [];
        let size = 0;
        stream.on("data", data => {
          size += data.length;
          chunks.push(data);
        });
        stream.on("end", () => {
          const result = Buffer.concat(chunks, size);
          resolve(result);
        });
        stream.on("error", err => {
          reject(err);
        });
      })
      .catch(err => {
        reject(err);
      });
  });
};

const minioFactory: StorageFactory = (
  endPoint,
  port,
  useSSL,
  accessKey,
  secretKey,
) => {
  const logger = new Logger(`minio-${endPoint}`);
  logger.debug("minioFactory start", {
    endPoint,
    port,
    useSSL,
    accessKey,
    secretKey,
  });
  const minioClient = new Minio.Client({
    endPoint,
    port,
    useSSL,
    accessKey,
    secretKey,
  });
  return {
    createDestination: async dest => {
      logger.debug("createDestination start", { bucketName: dest });
      try {
        await minioClient.makeBucket(dest, "us-east-1");
        logger.debug("createDestination end", { bucketName: dest });
        return true;
      } catch (error) {
        logger.error("createDestination - bucket creation failed", {
          bucketName: dest,
          error,
        });
        return false;
      }
    },
    deleteDestination: async (dest, force?) => {
      logger.debug("deleteDestination start", {
        bucketName: dest,
        force: force || false,
      });
      try {
        if (!force) {
          const isEmpty = await checkIfBucketIsEmpty(dest, minioClient);
          if (!isEmpty)
            throw new Error(
              `Bucket ${dest} is not empty, pass "force: true" to delete it`,
            );
        }
        await minioClient.removeBucket(dest);
        logger.debug("deleteDestination end", {
          bucketName: dest,
          force: force || false,
        });
        return true;
      } catch (error) {
        logger.error("Error deleting bucket", { bucketName: dest, error });
        throw error;
      }
    },
    deleteFile: async params => {
      logger.debug("deleteFile start", { params });
      try {
        await minioClient.removeObject(params.dest, params.filename, {
          forceDelete: params.force,
        });
        return true;
      } catch (error) {
        logger.error("Error deleting file", { params, error });
        throw error;
      }
    },
    destinationExists: async dest => {
      logger.debug("destinationExists start", { dest });
      const result = await minioClient.bucketExists(dest);
      logger.debug("destinationExists end", { result });
      return result;
    },
    fileOrDirExists: async (dest, fileOrDirName) => {
      logger.debug("fileExists start", { dest, fileOrDirName });
      return new Promise((resolve, reject) => {
        let result = false;
        try {
          const list = minioClient.listObjectsV2(dest, fileOrDirName);
          list.on("data", () => {
            result = true;
            list.emit("close");
          });
          list.on("close", () => {
            resolve(result);
          });
        } catch (error) {
          reject(error);
        }
      });
    },
    readFile: async params => {
      logger.debug("readFile start", { params });
      try {
        const result = await readMinioFile(params, minioClient);
        logger.debug("readFile end", { params });
        return result;
      } catch (error) {
        logger.error("Error reading object", { params, error });
        throw error;
      }
    },
    renameFile: async params => {
      logger.debug("renameFile start", { params });
      try {
        await minioClient.copyObject(
          params.dest,
          params.newFilename,
          `${params.dest}/${params.filename}`,
        );
        logger.debug("renameFile end", { params });
        return true;
      } catch (error) {
        logger.error("Error renaming file", { params, error });
        throw error;
      }
    },
    writeFile: async params => {
      logger.debug("writeFile start", {
        params: { ...params, content: "redacted" },
      });
      try {
        await minioClient.putObject(
          params.dest,
          params.filename,
          params.content,
          params.content.length,
          params.metadata,
        );
        logger.debug("writeFile end", {
          params: { ...params, content: "redacted" },
        });
        return true;
      } catch (error) {
        logger.error("Error writing file", {
          params: { ...params, content: "redacted" },
          error,
        });
        throw error;
      }
    },
  };
};

export default minioFactory;
