import axios from "axios";
import { config } from "dotenv";
import { Period } from "./enums/Period";
import { Candle } from "./models/Candles";
import { createChannelMessage } from "./messages/MessageChannel";
config();

const readMarket = async (): Promise<number> => {
  const result = await axios.get(process.env.PRICES_API);
  const data = result.data;
  const price = data.bitcoin.usd;
  //console.log(price);

  return price;
};

const generatedCanles = async () => {
  const messageChannel = await createChannelMessage();
  if (messageChannel) {
    while (true) {
      const loop = Period.ONE_MINUTE / Period.TEN_SECONDS;
      const candle = new Candle(new Date(), "BTC");

      console.log("---------------------------------------");
      console.log("Generating new candle");

      for (let i = 0; i < loop; i++) {
        const price = await readMarket();
        candle.adicionarValor(price);
        console.log(`Market price #${i + 1} of ${loop}`);
        await new Promise((r) => setTimeout(r, 30000));
      }

      candle.closeCandle();
      console.log("Candle close");
      const candleObj = candle.toSimpleObj();
      console.log(candleObj);
      const candleJson = JSON.stringify(candleObj);
      messageChannel.sendToQueue(
        process.env.QUEUE_NAME,
        Buffer.from(candleJson)
      );
      console.log("Candle Enqueue");
    }
  }
};

generatedCanles();
