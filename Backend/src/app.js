import express, { response } from "express";
import { createServer } from "node:http";

import { Server } from "socket.io";
import mongoose from "mongoose";
import cors from "cors";
import ConnectToSocket from "./controllers/socketManager.js";

const app = express();



// connect two servers
const server = createServer(app);
const io = ConnectToSocket(server);



// setting up port 
app.set("port", process.env.PORT || 8000);
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));


//start server
const startserver = async () => {
  const connectionDb = await mongoose.connect(
    "mongodb+srv://pravinbhaijoshi1960:HRZX@cluster0.k5y0u7a.mongodb.net/"
  );
  console.log(`MONGO CONNECTED to DB Host:${connectionDb.connection.host}`);

  server.listen(app.get("port"), () => {
    console.log("listing on 8000");
  });
};

startserver();
