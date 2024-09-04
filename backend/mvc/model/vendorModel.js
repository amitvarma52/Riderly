/** @format */

import mongoose from "mongoose";
const vehicleShema = mongoose.Schema(
  {
    fromVendor: {
      type: String,
      require: [true, "name is required"],
    },
    vehicleName: {
      type: String,
      require: [true, "email is required"],
    },
    image: {
      type: String,
      require: [true, "image link is required"],
    },
    Date: {
      type: String,
      require: [true, "date is required"],
    },
    price: {
      type: Number,
      require: [true, "price is required"],
    },
    location: {
      type: String,
      require: [true, "location is required"],
    },
  },
  { timestamp: true }
);
export const vehicleModel = mongoose.model("vehicle", vehicleShema);
