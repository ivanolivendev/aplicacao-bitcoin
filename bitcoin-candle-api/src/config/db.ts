import { connect } from "mongoose";
import { config } from "dotenv";

export const connectToMongoDb = async () => {
  await connect("mongodb://localhost/candles");
};
