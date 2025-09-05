require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { userRouter } = require("./routes/user");
const { blogRouter } = require("./routes/blog");
const { authRouter } = require("./routes/auth");
const { commentRouter } = require("./routes/comment");
const cookieParser = require("cookie-parser")

app.use(cookieParser())
const cors = require('cors');
app.use(cors({
  origin: ["http://localhost:5173","https://chai-chatter.vercel.app"],
  credentials: true
}));  // need to add this so frontend can send the cookie along the request

app.use("/api/v1/user", userRouter);
app.use("/api/v1/blog", blogRouter);
app.use("/api/v1/comment", commentRouter);
app.use("/", authRouter);

async function main() {
  // mongoose connection
  await mongoose.connect(process.env.MONGO_URL);
  console.log("db connected");
  app.listen(process.env.PORT || 5000, () => {
    console.log("server is up and running");
  });
}

main();
