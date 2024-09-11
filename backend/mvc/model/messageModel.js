/** @format */

import mongoose from "mongoose";
const messageShema = mongoose.Schema(
  {
    vendor: {
      type: String,
      require: [true, "vendor name is required"],
    },
    user: {
      type: String,
      require: [true, "user name is required"],
    },
    date: {
      type: Date,
      require: [true, "date is required"],
    },
    vehicleName: {
      type: String,
      require: [true, "vehicle is required"],
    },
    email: {
      type: String,
      require: [true, "email is required"],
    },
    location: {
      type: String,
      require: [true, "location is required"],
    },
  },
  { timestamp: true }
);
export const messageModel = mongoose.model("messages", messageShema);
