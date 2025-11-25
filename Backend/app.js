
const express = require("express");
const cors = require("cors");
const app = express();

const authRoute = require("./routes/auth");


app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true
}));
app.use(express.json());

app.use("/api/auth", authRoute);


app.get("/", (req, res) => {
  res.send("Blood Bridge Backend is running perfectly!");
});

module.exports = app;