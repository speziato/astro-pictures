import { SourceTypes } from "@astro-pictures/utils";
import ESAConfig from "./ESAConfig.js";

export default {
  [SourceTypes.ESA_HUBBLE]: ESAConfig
} as const;
