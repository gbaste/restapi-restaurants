import mongoose, { connection } from "mongoose";
import config from "./config";

const { MONGODB_URL } = process.env;

(async () => {
  try {
    const db = await mongoose.connect(config.mongodbURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database is connected to", db.connection.name);
  } catch (error) {
    console.error(error);
  }
})();
