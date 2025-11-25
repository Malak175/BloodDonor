const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },

    
    name: { type: String },
    address: { type: String },
    tel: { type: String },
    bloodgroup: { type: String },
    weight: { type: Number },
    lastDonationDate: { type: Date },
    diseases: { type: String },
    age: { type: Number, min: 18 },
    bloodpressure: { type: Number },
    gender: { type: String, enum: ["male", "female"] },

    
    role: { type: String, enum: ["user", "admin"], default: "user" },
    isPending: { type: Boolean, default: true },
    isApproved: { type: Boolean, default: false },

   
    notifications: [{
      message: { type: String, required: true },
      read: { type: Boolean, default: false },
      createdAt: { type: Date, default: Date.now }
    }],


    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);