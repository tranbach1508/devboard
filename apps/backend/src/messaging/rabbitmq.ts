import amqp, {
  type Channel,
  type ChannelModel,
} from "amqplib";
import { env } from "../config/env";

let connection: ChannelModel | undefined;
let channel: Channel | undefined;
let connecting: Promise<Channel> | undefined;

export async function getRabbitChannel(): Promise<Channel> {
  if (channel) {
    return channel;
  }

  if (connecting) {
    return connecting;
  }

  connecting = createChannel();

  try {
    return await connecting;
  } finally {
    connecting = undefined;
  }
}

async function createChannel(): Promise<Channel> {
  const url = env.rabbitmqUrl;
  if (!url) {
    throw new Error("RABBITMQ_URL environment variable is not set");
  }

  connection = await amqp.connect(url);

  connection.on("error", () => {
    channel = undefined;
    connection = undefined;
  });

  channel = await connection.createChannel();

  channel.on("error", () => {
    channel = undefined;
  });

  return channel;
}

export async function closeRabbitConnection(): Promise<void> {
  try {
    if (channel) {
      await channel.close();
    }
  } catch {
    // already closed
  }

  channel = undefined;
  connection = undefined;
  connecting = undefined;
}