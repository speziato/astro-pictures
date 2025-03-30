import PictureFileFormat from "../types/Picture/PictureFileFormat.js";

const getContentType = (fileFormat: PictureFileFormat) => {
  switch (fileFormat) {
    case "jpg":
      return "image/jpeg";
    case "png":
      return "image/png";
  }
};

export default getContentType;
