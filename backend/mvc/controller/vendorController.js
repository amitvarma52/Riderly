/** @format */

import { comparePassword, hashPassword } from "../../helper/hidePassword.js";
import { vendorModel } from "../model/adminModel.js";
import dotenv from "dotenv";
import { vehicleModel } from "../model/vendorModel.js";
import jwt from "jsonwebtoken"
dotenv.config();
const VENDOR_SECRET = process.env.VENDOR_SECRET;

export const vendorLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // check if vendor exists
    const vendor = await vendorModel.findOne({ email });
    if (!vendor) {
      return res.status(404).send("vendor not found");
    }
    // check if password is correct
    const isMatch = await comparePassword(password, vendor.password);
    if (!isMatch) {
      return res.status(400).send("passsword is wrong");
    }
    const token = jwt.sign(
      { id: vendor.name, role: "to add products" },
      VENDOR_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.status(200).send({
      status: "succes",
      message: "vendor loged in successfully",
      vendor,
      token,
    });
  } catch (error) {
    res.status(500).send("Internal server error");
    console.log(error)
  }
};

export const vehicleRegisterController = async (req, res) => {
  try {
    const { fromVendor, vehicleName, image, Date, price, location } = req.body;
    const sameVehicle = await vehicleModel.findOne({ fromVendor, vehicleName });
    if(sameVehicle){
      return res.status(400).json("same vehicle already exists")
    }
    const newVehicle = new vehicleModel({
      fromVendor,
      vehicleName,
      image,
      Date,
      price,
      location,
    });

    await newVehicle.save();
    return res.status(200).json({
      success: true,
      newVehicle,
    });
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      success: false,
      error: "Vehicle registration failed",
    });
  }
};

export const getAllVehicle = async (req, res) => {
  try {
    const { fromVendor } = req.body;
    const allVehicles = await vehicleModel.find({ fromVendor });
    return res.status(200).json(allVehicles);
  } catch (error) {
    console.error(`Error getting vendors: ${error}`);
    return res.status(500).send("Internal Server Error");
  }
};

// delete
export const vehicleDelete = async (req, res) => {
  try {
    const { fromVendor, vehicleName } = req.body;
    const vehicle = await vehicleModel.findOne({ fromVendor, vehicleName });
    if (vehicle) {
      await vehicle.deleteOne();
      return res.status(200).json({
        success: true,
        message: "vehicle deleted successfully",
      });
    } else {
      return res.status(404).json({
        status: "error",
        message: "vehicle not found",
      });
    }
  } catch (error) {
    console.error(`Error in API: ${error}`);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};
