import { parse } from "node-html-parser";
import SourceConfigs from "../config/sourceConfigs.js";
import Picture from "../types/Picture/Picture.js";
import PictureFactory from "../types/Picture/PictureFactory.js";

const pictureFactoryImpl: PictureFactory = async (picId, sourceType) => {
  const sourceConfig = SourceConfigs[sourceType];
  const [largeImg, rawHtml] = await Promise.all([
    (await fetch(sourceConfig.getPicUrl(picId))).arrayBuffer(),
    (await fetch(sourceConfig.getDescriptionUrl(picId))).text(),
  ]);

  const html = parse(rawHtml);
  const objectName = sourceConfig.getObjectName(html);
  const creditText = sourceConfig.getCreditText(html);
  const description = sourceConfig.getDescription(html);

  return new Picture(picId, largeImg, objectName, creditText, description);
};

export default pictureFactoryImpl;
