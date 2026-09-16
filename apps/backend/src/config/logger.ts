import pino from "pino";
import {env} from "./env";

const logger = pino({
  level: env.nodeEnv === "development"
    ? "debug"
    : "info",
});

export default logger;