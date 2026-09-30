import { getRabbitChannel } from "./rabbitmq";
import type { TaskCreatedEvent } from "./task.events";

const EXCHANGE = "devboard.events";

export async function publishTaskCreated(
  event: TaskCreatedEvent
): Promise<void> {
  const channel = await getRabbitChannel();

  await channel.assertExchange(EXCHANGE, "topic", {
    durable: true,
  });

  channel.publish(
    EXCHANGE,
    "task.created",
    Buffer.from(JSON.stringify(event)),
    {
      persistent: true,
      contentType: "application/json",
      messageId: event.eventId,
      timestamp: Date.now(),
    }
  );
}