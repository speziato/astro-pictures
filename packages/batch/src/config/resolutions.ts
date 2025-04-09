import { Resolution } from "@astro-pictures/utils";

type GetResolutionFn = (
  name: string,
  width: number,
  height: number
) => Resolution;

const getResolution: GetResolutionFn = (name, width, height) => ({
  name,
  dimensions: { width, height }
});

const _16by9Resolutions: Resolution[] = [
  getResolution("HD", 1280, 720),
  getResolution("FWXGA", 1366, 768),
  getResolution("WSXGA", 1600, 900),
  getResolution("FullHD", 1920, 1080),
  getResolution("WQHD", 2560, 1440),
  getResolution("4KUHD", 3840, 2160)
];

const _16by10Resolutions: Resolution[] = [
  getResolution("WXGA", 1280, 800),
  getResolution("WXGA+", 1440, 900),
  getResolution("WSXGA+", 1680, 1050),
  getResolution("WUXGA", 1920, 1200),
  getResolution("WQXGA", 2560, 1600),
  getResolution("WQUXGA", 3840, 2400)
];

const _ultrawideResolutions: Resolution[] = [
  getResolution("UWFHD", 2560, 1080),
  getResolution("UWQHD", 3440, 1440)
];

const resolutions = [
  ..._16by9Resolutions,
  ..._16by10Resolutions,
  ..._ultrawideResolutions
] as const;

export default resolutions;
