const express = require("express");
require("./config/database");
const connectDb = require("./config/database");
const cookieParser = require("cookie-parser");
const profileRouter = require("./routes/profile");
const authRouter = require("./routes/auth");
const requestRouter = require("./routes/request")

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

connectDb()
  .then(() => {
    console.log("data base succesful");
    app.listen(3000, () => {
      console.log("server successful");
    });
  })
  .catch((err) => {
    console.error("database not connected");
  });
