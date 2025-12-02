const mongoose = require("mongoose");

const ProspectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    tel: { type: String },
    address: { type: String },
    bloodgroup: { type: String },
    weight: { type: Number },
    age: { type: Number },
    diseases: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Prospect", ProspectSchema);
