import app from "./app";
import { env } from "./config/env";
import logger from "./config/logger";
import prisma from "./config/database";
import { redisClient } from "./config/redis";

const startServer = async () => {
  await redisClient.connect();
  const server = app.listen(env.port, () => {
    logger.info(`Server running on port ${env.port} [${env.nodeEnv}]`);
  });
  let isShuttingDown = false;
  const shutdown = async (signal: string) => {
    if (isShuttingDown) {
      return;
    }
    isShuttingDown = true;
    logger.info(`${signal} received. Starting graceful shutdown...`);
  
    server.close(async () => {
      try {
        await redisClient.quit();
        await prisma.$disconnect();
  
        logger.info("Database connection closed");
  
        process.exit(0);
      } catch (error) {
        logger.error(error);
  
        process.exit(1);
      }
    });
  };
  
  process.on("SIGTERM", () => {
    shutdown("SIGTERM");
  });
  
  process.on("SIGINT", () => {
    shutdown("SIGINT");
  });
}
startServer();