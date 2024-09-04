/** @format */

import mongoose from "mongoose";

const vendorSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      unique: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    phone: {
      type: Number,
      require: true,
    },
    location: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  { timeStamp: true }
);
export const vendorModel= mongoose.model("vendor", vendorSchema);