import readEnvConfig from "../config/envConfig.js";
import { LogLevel, parseLogLevel } from "@astro-pictures/utils";

enum LOG_LEVEL_STRING {
  INFO = "INFO",
  DEBUG = "DEBU",
  WARN = "WARN",
  ERROR = "ERRO"
}
const getTimestamp = () => new Date().toISOString();
const { APP } = readEnvConfig();
const APP_LOG_LEVEL = parseLogLevel(APP.LOG_LEVEL);

export default class Logger {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  private getLogMessage = (
    loglevel: LOG_LEVEL_STRING,
    message: string,
    ...optionalParams: any[]
  ) => ({
    time: getTimestamp(),
    loglevel,
    message,
    loggerName: this.name,
    ...(optionalParams.length > 0 && {
      ...optionalParams.map(e => JSON.stringify(e))
    })
  });
  log(message: string, ...optionalParams: any[]) {
    if ([LogLevel.INFO, LogLevel.DEBUG].indexOf(APP_LOG_LEVEL) !== -1) {
      console.log(
        this.getLogMessage(LOG_LEVEL_STRING.INFO, message, ...optionalParams)
      );
    }
  }
  debug(message: string, ...optionalParams: any[]) {
    if (APP_LOG_LEVEL === LogLevel.DEBUG) {
      console.debug(
        this.getLogMessage(LOG_LEVEL_STRING.DEBUG, message, ...optionalParams)
      );
    }
  }
  warn(message: string, ...optionalParams: any[]) {
    if (APP_LOG_LEVEL !== LogLevel.ERROR) {
      console.warn(
        this.getLogMessage(LOG_LEVEL_STRING.WARN, message, ...optionalParams)
      );
    }
  }
  error(message: string, ...optionalParams: any[]) {
    console.error(
      this.getLogMessage(LOG_LEVEL_STRING.ERROR, message, ...optionalParams)
    );
  }
}
