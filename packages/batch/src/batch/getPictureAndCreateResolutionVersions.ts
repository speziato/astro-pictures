import {
  SourceTypes,
  PictureFileFormat,
  DoubleDigit
} from "@astro-pictures/utils";
import createImagesByIdAndType from "../utils/createImagesByIdAndType.js";
import Logger from "../utils/logger.js";

const logger = new Logger("getAndResizePicture");

const FILE_FORMAT: PictureFileFormat = "jpg";
const FILE_QUALITY: DoubleDigit = "80";

const getPictureAndCreateResolutionVersions = async (
  picId: string,
  sourceType: SourceTypes
) => {
  const start = new Date();
  logger.log(`about to get picture with id: ${picId}`);

  const allImagesPromises = await createImagesByIdAndType(
    picId,
    sourceType,
    FILE_FORMAT,
    FILE_QUALITY
  );
  const results = await Promise.allSettled(allImagesPromises);
  const finish = new Date();
  const elapsed = Math.abs((finish.getTime() - start.getTime()) / 1000);
  const successful = results
    .filter(r => r.status === "fulfilled")
    .map(r => ({
      image: r.value.image,
      filename: `${sourceType}/${picId}/${r.value.resolution}.${FILE_FORMAT}`,
      fileFormat: FILE_FORMAT
    }));
  if (successful.length !== results.length) {
    logger.warn(
      `There was an error with ${
        results.length - successful.length
      } images. Continuing with the successful ones`,
      { rejectedImages: results.filter(r => r.status === "rejected") }
    );
  }
  logger.log(
    `Done processing ${allImagesPromises.length} images in ${elapsed} seconds`
  );
  return successful;
};

export default getPictureAndCreateResolutionVersions;
