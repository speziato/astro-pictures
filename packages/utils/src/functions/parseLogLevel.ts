import LogLevel from "../types/LogLevel.js";

const parseLogLevel = (envVar: string) => {
  Object.keys(LogLevel);
  switch (envVar) {
    case LogLevel.ERROR:
      return LogLevel.ERROR;
    case LogLevel.WARN:
      return LogLevel.WARN;
    case LogLevel.DEBUG:
      return LogLevel.DEBUG;
    default:
      return LogLevel.INFO;
  }
};

export default parseLogLevel;
