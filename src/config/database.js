const mongoose = require("mongoose");
require("dotenv").config();

const connectDb = async () => {
  await mongoose.connect(
    `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@namastedev.vqli0dy.mongodb.net/`
  );
};

module.exports = connectDb;
