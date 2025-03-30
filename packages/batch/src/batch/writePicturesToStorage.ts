import { Logger } from "../utils/logger.js";
import Storage from "../types/Storage/Storage.js";
import PictureFileFormat from "../types/Picture/PictureFileFormat.js";
import getContentType from "../utils/getContentType.js";

const logger = new Logger("writePicturesToStorage");

const writePicturesToStorage = async (
  pics: { image: Buffer; filename: string; fileFormat: PictureFileFormat }[],
  dest: string,
  storage: Storage,
) => {
  logger.log("writePicturesToStorage start", {
    filenames: pics.map(p => p.filename),
    dest,
  });
  for (const pic of pics) {
    const exists = await storage.destinationExists(dest);
    if (!exists) {
      await storage.createDestination(dest);
    }
    await storage.writeFile({
      dest,
      filename: pic.filename,
      content: pic.image,
      metadata: { "Content-Type": getContentType(pic.fileFormat) },
    });
  }
  logger.log("writePicturesToStorage end");
};

export default writePicturesToStorage;
