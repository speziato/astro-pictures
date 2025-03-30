import readEnvConfig from "../config/envConfig.js";

enum LOG_LEVEL {
  INFO = "INFO",
  DEBUG = "DEBU",
  WARN = "WARN",
  ERROR = "ERRO",
}
const getTimestamp = () => new Date().toISOString();
const { APP } = readEnvConfig();

export class Logger {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  private getLogMessage = (
    loglevel: LOG_LEVEL,
    message: string,
    ...optionalParams: any[]
  ) => ({
    time: getTimestamp(),
    loglevel,
    message,
    loggerName: this.name,
    ...(optionalParams.length > 0 && {
      ...optionalParams.map(e => JSON.stringify(e)),
    }),
  });
  log(message: string, ...optionalParams: any[]) {
    console.log(this.getLogMessage(LOG_LEVEL.INFO, message, ...optionalParams));
  }
  debug(message: string, ...optionalParams: any[]) {
    if (APP.LOG_LEVEL === "debug") {
      console.debug(
        this.getLogMessage(LOG_LEVEL.DEBUG, message, ...optionalParams),
      );
    }
  }
  warn(message: string, ...optionalParams: any[]) {
    console.warn(
      this.getLogMessage(LOG_LEVEL.WARN, message, ...optionalParams),
    );
  }
  error(message: string, ...optionalParams: any[]) {
    console.error(
      this.getLogMessage(LOG_LEVEL.ERROR, message, ...optionalParams),
    );
  }
}
