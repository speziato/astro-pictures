import { HEXRGBColor, HEX } from "../types/index.js";

const rgbaColor: (color: HEXRGBColor) => HEX = color => {
  const colorString = `${color.red}${color.green}${color.blue}${color.alpha || ""}`;
  return `#${colorString}`;
};

export default rgbaColor;
