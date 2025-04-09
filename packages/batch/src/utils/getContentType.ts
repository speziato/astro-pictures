import { PictureFileFormat } from "@astro-pictures/utils";

const getContentType = (fileFormat: PictureFileFormat | "txt") => {
  let type = "";
  switch (fileFormat) {
    case "jpg":
      type = "image/jpeg";
      break;
    case "png":
      type = "image/png";
      break;
    case "txt":
      type = "text/plain";
      break;
    default:
      type = "binary/octet-stream";
  }
  return { "Content-Type": type };
};

export default getContentType;
