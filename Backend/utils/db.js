// utils/db.js

const mongoose = require("mongoose");

const dbConnection = () => {
  mongoose
    .connect(
      "mongodb+srv://malak:malak@cluster0.xgtpf00.mongodb.net/donor?retryWrites=true&w=majority&appName=Cluster0",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => {
      console.log("Database connected successfully → donor.users");
    })
    .catch((err) => {
      console.log("DB Connection Error:", err);
    });
};

module.exports = dbConnection;