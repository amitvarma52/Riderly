/** @format */

import { feedbackModel } from "../model/feedbackModel";

export const sendFeedback= async (req, res) => {
  try {
    const { user, email, message } = req.body;

    // Check if the message already exists
    const exists = await feedbackModel.findOne({ user, email, message });
    if (exists) {
      return res.status(409).send("feedback already sent");
    }

    // Create a new user with the current date
    const newMessage = new feedbackModel({
      ...req.body,
      date: Date.now(), // Correctly assigning the current date
    });

    await newMessage.save(); // Save the new user to the database

    return res.status(200).send("Feedback sent successfully");
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).send("Internal server error");
  }
};

export const allFeedback = async (req, res) => {
  try {
    const messages = await feedbackModel.find({});
    if (!messages) {
      return res.status(400).json("no feedbacks yet");
    }
    return res.status(200).json(messages);
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};