const express = require("express");
const authRouter = require("./authRouter");
const POST = process.env.POST || 5000;
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use("/auth", authRouter);

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    app.listen(POST, () =>
      console.log(`Server has been started on port ${POST}...`)
    );
  } catch (e) {
    console.log("Server error", e.message);
  }
};

start();
