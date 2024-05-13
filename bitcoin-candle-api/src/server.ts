import { config } from "dotenv";
import { app } from "./app";
import { connectToMongoDb } from "./config/db";
import { Connection, connection } from "mongoose";
config();

const createServer = async () => {
  await connectToMongoDb();

  const port = process.env.PORT;
  const server = app.listen(port, () => {
    console.log(`App running on port => ${port}`);
  });

  process.on("SIGINT", async () => {
    await connection.close();
    console.log("App and serve from Mongo closed");
  });
};

createServer();
