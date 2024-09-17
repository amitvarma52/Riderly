/** @format */

import mongoose from "mongoose";
const vehicleShema = mongoose.Schema(
  {
    fromVendor: {
      type: String,
      require: [true, "vendor name is required"],
    },
    vehicleName: {
      type: String,
      require: [true, "vehicle is required"],
    },
    image: {
      type: String,
      require: [true, "image link is required"],
    },
    image2: {
      type: String,
    },
    image3: {
      type: String,
    },
    Date: {
      type: Number,
      require: [true, "date is required"],
    },
    price: {
      type: Number,
      require: [true, "price is required"],
    },
    milegde: {
      type: Number,
      require: [true, "milegde is required"],
    },
    location: {
      type: String,
      require: [true, "location is required"],
    },
    type: {
      type: String,
      require: [true, "type is required"],
    },
  },
  { timestamp: true }
);
export const vehicleModel = mongoose.model("vehicle", vehicleShema);
