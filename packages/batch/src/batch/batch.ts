import readEnvConfig from "../config/envConfig.js";
import minioFactory from "../factories/minioFactory.js";
import SourceTypes from "../types/Source/SourceTypes.js";
import getESAHubblePOTWId from "../utils/getESAHubblePOTWId.js";
import { Logger } from "../utils/logger.js";
import getPictureAndCreateResolutionVersions from "./getPictureAndCreateResolutionVersions.js";
import writePicturesToStorage from "./writePicturesToStorage.js";

const logger = new Logger("batch");
const config = readEnvConfig();

const s3 = config.S3;

export default async () => {
  logger.log("batch start");
  const minio = minioFactory(
    s3.ENDPOINT,
    parseInt(s3.PORT),
    s3.SSL === "true",
    s3.ACCESS_KEY,
    s3.SECRET_KEY,
  );
  const esaPicId = getESAHubblePOTWId();
  logger.debug("checking if picture already exists", { esaPicId });
  const check = await minio.fileOrDirExists(
    s3.BUCKET_NAME,
    `${SourceTypes.ESA_HUBBLE}/${esaPicId}`,
  );
  if (!check) {
    logger.debug("picture does not exist", { esaPicId });
    const pictures = await getPictureAndCreateResolutionVersions(
      esaPicId,
      SourceTypes.ESA_HUBBLE,
    );
    await writePicturesToStorage(pictures, s3.BUCKET_NAME, minio);
  } else {
    logger.log("picture already exists", { esaPicId });
  }
  logger.log("batch end");
};
