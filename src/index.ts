import express from "express";
import mongoose from "mongoose";
import router from "./routes/index";
import { VercelRequest, VercelResponse } from "@vercel/node";
import cors from "cors";

const app = express();
const port = process.env.port || 4000;

app.use(
  cors({
    origin: "http://localhost:5173", // Permitir solo este origen
    methods: ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
  }),
);

app.use(express.json());

const MONGO_URL =
  "mongodb+srv://rodifer1196:fer123456@clustertfm.tfo2g.mongodb.net/rodifer1196";

mongoose
  .connect(MONGO_URL, {
    dbName: "products",
  })
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch((error) => {
    console.log(error);
  });
//mongoose.connection.on("error", (error: Error) => console.log(error));
app.use("/", router);
app.listen(port, () => {
  console.log(`SERVER IN RUNNING ON PORT ${port}`);
});

module.exports = app;
