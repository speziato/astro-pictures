import SVGOptions from "../types/SVGOptions.js";

export default (text: string, options?: Partial<SVGOptions>) => {
  const defaultOpts: SVGOptions = {
    fontSize: 32,
    fill: "#ffffff80",
    stroke: "black",
    strokeWidth: 0.5,
    width: 1920,
    height: 1080,
    xOffset: 1900,
    yOffset: 30,
  };
  const opts = {
    ...defaultOpts,
    ...options,
  };
  return Buffer.from(`<svg height="${opts.height}" width="${opts.width}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <g transform="translate(0 0)">
    <rect
      height="${opts.fontSize}"
      rx="0"
      transform="translate(0 0)"
    ></rect>
    <text
      text-anchor="end"
      transform="translate(${opts.xOffset} ${opts.yOffset})"
      stroke="${opts.stroke}"
      stroke-width="${opts.strokeWidth}"
      fill="${opts.fill}"
      font-size="${opts.fontSize}"
      font-family="DejaVu Sans,sans-serif,sans"
    ><tspan x="0" y="0">${text}</tspan>
    </text>
</g></svg>`);
};
