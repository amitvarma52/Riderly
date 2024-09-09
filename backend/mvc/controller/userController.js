/** @format */

import { comparePassword, hashPassword } from "../../helper/hidePassword.js";
import { userModel } from "../model/userModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { vehicleModel } from "../model/vendorModel.js";
dotenv.config();
const VENDOR_SECRET = process.env.USER_SECRET;
// login
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // check if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send("user not found");
    }
    // check if password is correct
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).send("Invalid credentials");
    }
    const token = jwt.sign(
      { id: user.name, role: "to add products" },
      VENDOR_SECRET,
      {
        expiresIn: "10h",
      }
    );
    res.status(200).send({
      status: "succes",
      message: "user loged in successfully",
      user,
      token,
    });
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};
export const registerController = async (req, res) => {
  try {
    const { name, email, password, location } = req.body;
    const hashedPassword = await hashPassword(password);
    const exists = await userModel.findOne({ name });
    if (exists) {
      return res.status(400).json({
        success: false,
        message: "name already exists",
      });
    }
    const existsEmail = await userModel.findOne({ email });
    if (existsEmail) {
      return res.status(400).json({
        success: false,
        message: "email already exists",
      });
    }
    const newUser = new userModel({
      name,
      email,
      location,
      password: hashedPassword,
    });

    await newUser.save();
    return res.status(200).json({
      success: true,
      message: "user registered successfully",
      newUser,
    });
  } catch (error) {
    console.log(error)
    res.status(400).json({
      success: false,
      error,
    });
  }
};
export const userAllVehicle = async (req, res) => {
  try {
    const allVehicles = await vehicleModel.find({});
    return res.status(200).json(allVehicles);
  } catch (error) {
    console.error(`Error getting vendors: ${error}`);
    return res.status(500).send("Internal Server Error");
  }
};
