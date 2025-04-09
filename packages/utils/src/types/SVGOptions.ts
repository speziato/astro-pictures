import Color from "./Color.js";
type SVGOptions = {
  fontSize: number;
  fill: Color;
  stroke: "none" | Color;
  strokeWidth: number;
  width: number;
  height: number;
  xOffset: number;
  yOffset: number;
};
export default SVGOptions;
