import SourceTypes from "../types/Source/SourceTypes.js";
import ESAConfig from "./ESAConfig.js";

export default {
  [SourceTypes.ESA_HUBBLE]: ESAConfig,
} as const;
