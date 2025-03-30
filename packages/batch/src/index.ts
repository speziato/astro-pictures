import "dotenv/config";
import { scheduleJob, RecurrenceSpecDateRange } from "node-schedule";
import batch from "./batch/batch.js";
import { Logger } from "./utils/logger.js";
import readEnvConfig from "./config/envConfig.js";

const version = process.env.npm_package_version;
const config = readEnvConfig();

const SCHEDULE = config.APP.SCHEDULE || "0 6 * * 1"; // every Monday at 6 AM
const TZ = config.APP.TZ || "UTC";

const logger = new Logger("index");
const recurrenceRule: RecurrenceSpecDateRange = {
  rule: SCHEDULE,
  tz: TZ,
};

logger.log(`Astro-Picture Batch v.${version} started`, { SCHEDULE });
logger.debug("Environment", process.env);
const cron = scheduleJob(recurrenceRule, async () => {
  logger.log(`Executing job at ${new Date().toUTCString()}`);

  try {
    await batch();
  } catch (error) {
    logger.error("Error occurred during job execution", {
      error,
    });
  }

  if (cron.nextInvocation()) {
    logger.log(
      `Next invocation will occur at: ${cron
        .nextInvocation()
        // @ts-expect-error the function `nextInvocation` returns a custom CronDate object, not a Date
        .toDate()
        .toUTCString()}`,
    );
  }
});

if (process.env.NODE_ENV !== "production") {
  // testing
  cron.invoke();
}

process.on("SIGINT", function () {
  logger.log("Received SIGINT, closing");
  cron.cancel();
  process.exit();
});
