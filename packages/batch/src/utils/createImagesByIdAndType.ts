import {
  DoubleDigit,
  getPictureFileQuality,
  Resolution,
  rgbaColor,
  SourceTypes
} from "@astro-pictures/utils";
import sharp, { Sharp } from "sharp";
import resolutions from "../config/resolutions.js";
import pictureFactoryImpl from "../factories/pictureFactoryImpl.js";
import Logger from "./logger.js";
import svgTextBuffer from "./svgTextBuffer.js";
const logger = new Logger("createImagesByIdAndTypes");

const getTextSvgOverlay = (conf: {
  text: string;
  width: number;
  height: number;
  fontSizeMultiplier: number;
  xOffset: number;
  yOffset: number;
}) => {
  logger.debug(`getTxtSvgOverlay start`, { params: conf });
  return svgTextBuffer(conf.text, {
    fill: rgbaColor({
      red: "ff",
      green: "ff",
      blue: "ff",
      alpha: "80"
    }),
    fontSize: conf.height * conf.fontSizeMultiplier,
    stroke: "black",
    strokeWidth: 1,
    width: conf.width,
    height: conf.height,
    xOffset: conf.width - conf.xOffset,
    yOffset: conf.yOffset
  });
};

const getSharpTextBuffer = (
  text: string,
  width: number,
  height: number,
  fontSizeMultiplier: number,
  xOffset: number,
  yOffset: number
) =>
  sharp(
    getTextSvgOverlay({
      text,
      width,
      height,
      fontSizeMultiplier,
      xOffset,
      yOffset
    })
  )
    .png()
    .toBuffer();

const putDescriptionInImage = async (
  sharpImg: Sharp,
  objectName: string,
  creditText: string,
  resolution: Resolution,
  output: "jpg" | "png",
  quality: number
) => {
  logger.debug("putDescriptionInImage start", {
    params: { objectName, creditText, resolution }
  });
  const { width, height } = resolution.dimensions;
  try {
    const [svgObjectBuffer, svgCreditBuffer] = await Promise.all([
      getSharpTextBuffer(objectName, width, height, 0.05, 20, height * 0.05),
      getSharpTextBuffer(creditText, width, height, 0.03, 20, height * 0.1)
    ]);
    logger.debug("putDescriptionInImage end");
    let composite = sharpImg.composite([
      { input: svgObjectBuffer },
      { input: svgCreditBuffer }
    ]);
    if (output === "jpg") {
      composite = composite.jpeg({ quality });
    } else {
      composite = composite.png({ quality });
    }
    return composite.toBuffer();
  } catch (error) {
    throw new Error(
      `Error while putting overlays in image at resolution ${width}x${height}: ${error}`
    );
  }
};

const createImagesByIdAndType = async (
  picId: string,
  type: SourceTypes,
  output: "jpg" | "png",
  quality: DoubleDigit
) => {
  logger.debug("createImagesByIdAndType start", {
    params: { picId, type }
  });
  const picture = await pictureFactoryImpl(picId, type);
  try {
    const sharpImg = sharp(picture.largeImg);
    const { width, height } = await sharpImg.metadata();
    if (typeof width === "undefined" || typeof height === "undefined") {
      throw new Error("Error while reading metadata of original image");
    }

    const resolutionsWithOriginal = [
      ...resolutions,
      { name: "original", dimensions: { width, height } }
    ];
    return resolutionsWithOriginal.map(async resolution => {
      const image = await sharpImg
        .resize({
          height: resolution.dimensions.height,
          width: resolution.dimensions.width,
          fit: "cover"
        })
        .keepMetadata()
        .toBuffer();

      return {
        image: await putDescriptionInImage(
          sharp(image),
          picture.objectName,
          picture.creditText,
          resolution,
          output,
          getPictureFileQuality(quality)
        ),
        resolution: resolution.name
      };
    });
  } catch (error) {
    logger.error("Error while creating images", {
      error
    });
    throw new Error(`Error while creating images: ${error}`);
  }
};

export default createImagesByIdAndType;
