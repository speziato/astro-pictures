export enum LOG_LEVEL {
  INFO = "info",
  DEBUG = "debug",
  WARN = "warning",
  ERROR = "error"
}

export const parseLogLevel = (envVar: string) => {
  Object.keys(LOG_LEVEL)
  switch (envVar) {
    case LOG_LEVEL.ERROR:
      return LOG_LEVEL.ERROR
    case LOG_LEVEL.WARN:
      return LOG_LEVEL.WARN
    case LOG_LEVEL.DEBUG:
      return LOG_LEVEL.DEBUG
    default:
      return LOG_LEVEL.INFO
  }
}
