const express = require("express");
const authRouter = require("./authRouter");
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const corsOptions = {
  origin: "https://velvety-mooncake-379655.netlify.app/",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use("/auth", authRouter);

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    app.listen(port, () =>
      console.log(`Server has been started on port ${port}...`)
    );
  } catch (e) {
    console.log("Server error", e.message);
  }
};

start();
