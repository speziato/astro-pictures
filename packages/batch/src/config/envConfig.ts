const CONFIGURATION = {
  APP: ["LOG_LEVEL", "SCHEDULE", "TZ"],
  S3: ["BUCKET_NAME", "ENDPOINT", "PORT", "ACCESS_KEY", "SECRET_KEY", "SSL"]
} as const;

type CONF_SECTIONS = keyof typeof CONFIGURATION;

type ObjectFromList<T extends ReadonlyArray<string>, V = string> = {
  [K in T extends ReadonlyArray<infer U> ? U : never]: V;
};

type APP_CONFIG = {
  [k in CONF_SECTIONS]: ObjectFromList<(typeof CONFIGURATION)[k]>;
};

const typedObjectKeys = <T extends object>(a: T) =>
  Object.keys(a) as Array<keyof T>;

const readEnvConfig = () => {
  if (typeof env === "undefined") {
    env = typedObjectKeys(CONFIGURATION).reduce(
      (acc, curr) => ({
        ...acc,
        [curr]: CONFIGURATION[curr].reduce(
          (sectionConf, current) => {
            sectionConf[current] = process.env[`${curr}__${current}`] || "";
            return sectionConf;
          },
          {} as ObjectFromList<(typeof CONFIGURATION)[CONF_SECTIONS]>
        )
      }),
      {} as APP_CONFIG
    );
  }
  return env;
};
let env: APP_CONFIG | undefined = undefined;

export const getConfigKey: <T extends CONF_SECTIONS>(
  scope: T,
  key: keyof ObjectFromList<(typeof CONFIGURATION)[T]>
) => string = (scope, key) => {
  if (!env) readEnvConfig();
  return env![scope][key];
};

export default readEnvConfig;
