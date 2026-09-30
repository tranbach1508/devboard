import { getRabbitChannel } from "../messaging/rabbitmq";
import type { TaskCreatedEvent } from "../messaging/task.events";

const EXCHANGE = "devboard.events";
const QUEUE = "task.created.queue";
const ROUTING_KEY = "task.created";

async function startWorker() {
  const channel = await getRabbitChannel();

  await channel.assertExchange(EXCHANGE, "topic", {
    durable: true,
  });

  await channel.assertQueue(QUEUE, {
    durable: true,
  });

  await channel.bindQueue(
    QUEUE,
    EXCHANGE,
    ROUTING_KEY
  );

  await channel.prefetch(1);

  await channel.consume(
    QUEUE,
    async (message) => {
      if (!message) return;

      try {
        const event = JSON.parse(
          message.content.toString()
        ) as TaskCreatedEvent;

        console.log("Received event:", event);

        // Giả lập công việc gửi notification.
        console.log(
          `Sending notification for task: ${event.payload.taskId}`
        );

        // ACK chỉ sau khi xử lý thành công.
        channel.ack(message);
      } catch (error) {
        console.error("Failed to process message:", error);

        // Bài cơ bản: không requeue để tránh vòng lặp vô hạn.
        channel.nack(message, false, false);
      }
    }
  );

  console.log("Notification Worker is running");
}

startWorker().catch((error) => {
  console.error("Worker startup failed:", error);
  process.exitCode = 1;
});