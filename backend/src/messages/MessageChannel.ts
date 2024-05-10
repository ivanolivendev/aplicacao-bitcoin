import { config } from "dotenv";
import { Channel, connect } from "amqplib";
config();

export const createChannelMessage = async (): Promise<Channel> => {
  try {
    const conecction = await connect(process.env.AMQP_SERVE);
    const channel = await conecction.createChannel();
    await channel.assertQueue(process.env.QUEUE_NAME);
    console.log("Connect with RabbitAMQP");
    return channel;
  } catch (error) {
    console.log("Error ===> " + error);
    return null;
  }
};
