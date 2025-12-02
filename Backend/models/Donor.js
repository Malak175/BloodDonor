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
  },
  { timestamps: true }
);

const Donor = mongoose.model("Donor", ProspectSchema);

module.exports = Donor;