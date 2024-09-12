/** @format */

import mongoose from "mongoose";

const feedbackSchema = mongoose.Schema(
  {
    user: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    date: {
      type: Date,
      require: true,
    },
    message: {
      type: String,
      require: true,
    },
  },
  { timeStamp: true }
);
export const feedbackModel = mongoose.model("feedback", feedbackSchema);
