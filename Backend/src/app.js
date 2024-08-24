// import express, { response } from "express";
// import { createServer } from "node:http";

// import { Server } from "socket.io";
// import mongoose from "mongoose";
// import cors from "cors";
// import ConnectToSocket from "./controllers/socketManager.js";
// import userRoutes from "./routes/users.routes.js"




// const app = express();



// // connect two servers
// const server = createServer(app);
// const io = ConnectToSocket(server);

// // routes
// app.use("/api/v1/users", userRoutes);
// // app.use("/api/v2/users",newUserRoutes)

// // setting up port 
// app.use(cors());
// app.set("port", process.env.PORT || 8000);
// app.use(express.json({ limit: "40kb" }));
// app.use(express.urlencoded({ limit: "40kb", extended: true }));


// //start server
// const startserver = async () => {
//   const connectionDb = await mongoose.connect(
//     "mongodb+srv://pravinbhaijoshi1960:HRZX@cluster0.k5y0u7a.mongodb.net/"
//   );
//   console.log(`MONGO CONNECTED to DB Host:${connectionDb.connection.host}`);

//   server.listen(app.get("port"), () => {
//     console.log("listing on 8000");
//   });
// };

// startserver();
import express from "express"; // Remove unused { response }
import { createServer } from "http"; // Change from "node:http" to just "http" for simplicity

import { Server } from "socket.io";
import mongoose from "mongoose";
import cors from "cors";
import ConnectToSocket from "./controllers/socketManager.js";
import userRoutes from "./routes/users.routes.js";

const app = express();

// Middleware - CORS and Body Parsing
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

// Routes
app.use("/api/v1/users", userRoutes);

// Create HTTP server and initialize Socket.io
const server = createServer(app);
const io = ConnectToSocket(server);

// Set port for the server
app.set("port", process.env.PORT || 8000);

// Start the server with DB connection
const startServer = async () => {
  try {
    // Database connection
    const connectionDb = await mongoose.connect(
      "mongodb+srv://pravinbhaijoshi1960:HRZX@cluster0.k5y0u7a.mongodb.net/",
      { useNewUrlParser: true, useUnifiedTopology: true } // Add options for better connection handling
    );
    console.log(`MONGO CONNECTED to DB Host: ${connectionDb.connection.host}`);

    // Start listening for requests
    server.listen(app.get("port"), () => {
      console.log(`Server is listening on port ${app.get("port")}`);
    });
  } catch (error) {
    console.error("Error connecting to the database", error);
    process.exit(1); // Exit the process with a failure code
  }
};

startServer();

