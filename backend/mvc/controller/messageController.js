/** @format */

import { vendorModel } from "../model/adminModel.js";
import { messageModel } from "../model/messageModel.js";
import { userModel } from "../model/userModel.js";
import { vehicleModel } from "../model/vendorModel.js";

// send message
export const sendMessage = async (req, res) => {
  try {
    const { vendor, user, vehicleName, email, location } = req.body;

    // Check if the message already exists
    const exists = await messageModel.findOne({
      vendor,
      user,
      vehicleName,
      date: Date.now()
    });
    if (exists) {
      return res.status(409).send("Already booked");
    }

    // Create a new user with the current date
    const newMessage = new messageModel({
      ...req.body,
      date: Date.now(), // Correctly assigning the current date
    });

    await newMessage.save(); // Save the new user to the database

    return res.status(200).send("Vehicle vendor will contact you soon");
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).send("Internal server error");
  }
};

export const vendorMessage = async (req, res) => {
  try {
    const { vendor } = req.body;
    const existVendor = await vendorModel.findOne({ name: vendor });
    if (!existVendor) {
      return res.status(400).json("user not exists");
    }
    const messages = await messageModel.find({ vendor });
    if (!messages) {
      return res.status(400).json("no bookings yet");
    }

    return res.status(200).json(messages);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      error,
    });
  }
};
export const userMessage = async (req, res) => {
  try {
    const { user } = req.body;
    const existUser=await userModel.findOne({name:user})
    console.log(existUser)
    if(!existUser){
      return res.status(400).json("user not exists");  
    }
    const messages = await messageModel.find({ user });
    if (!messages) {
      return res.status(400).json("no bookings yet");
    }
    return res.status(200).json(messages);
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};
export const allMessage = async (req, res) => {
  try {
    const messages = await messageModel.find({});
    if (!messages) {
      return res.status(400).json("no bookings yet");
    }
    return res.status(200).json(messages);
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};