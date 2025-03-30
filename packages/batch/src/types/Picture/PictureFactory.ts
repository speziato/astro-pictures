import SourceTypes from "../Source/SourceTypes.js";
import Picture from "./Picture.js";

type PictureFactory = (picId: string, type: SourceTypes) => Promise<Picture>;
export default PictureFactory;
