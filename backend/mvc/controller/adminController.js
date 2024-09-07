/** @format */

import { hashPassword } from "../../helper/hidePassword.js";
import { vendorModel } from "../model/adminModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { vehicleModel } from "../model/vendorModel.js";
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
export const adminLoginController = async (req, res) => {
  try {
    const { adminName, adminPass } = req.body;
    if (
      adminName === process.env.ADMIN_NAME &&
      adminPass === process.env.ADMIN_PASS
    ) {
      const token = jwt.sign({ id: adminName, role: "admin" }, JWT_SECRET, {
        expiresIn: "1h",
      });
      return res.status(200).json(token);
    } else {
      return res.status(401).json("Invalid admin name or password");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const vendorRegisterController = async (req, res) => {
  try {
    const { name, email, phone, location, password } = req.body;
    const hashedPassword = await hashPassword(password);
    const exists=await vendorModel.findOne({name})
    if(exists){
      return res.status(400).json({
        success: false,
        error: "vendor already exists",
      });
    }
    const newVendor = new vendorModel({
      name,
      email,
      phone,
      location,
      password: hashedPassword,
    });

    await newVendor.save();
    return res.status(200).json({
      success: true,
      newVendor,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      success: false,
      error: "Vendor registration failed",
    });
  }
};

export const getAllVendor = async (req, res) => {
  try {
    const allVendors = await vendorModel.find({});
    return res.status(200).json(allVendors);
  } catch (error) {
    console.error(`Error getting vendors: ${error}`);
    return res.status(500).send("Internal Server Error");
  }
};

export const getVendorByID = async (req, res) => {
  try {
    const { name } = req.body;
    const vendor = await vehicleModel.find({ name });
    if (vendor) return res.status(200).json(vendor);
    else return res.status(404).send("Vendor not found");
  } catch (error) {
    console.error(`Error getting vendor by ID: ${error}`);
    return res.status(500).send("Internal Server Error");
  }
};

// update
export const vendorUpdateController = async (req, res) => {
  try {
    const { name } = req.body;
    let vendor = await vendorModel.findOne({ name });
    if (vendor) {
      vendor.name = req.body.updateName || vendor.name;
      vendor.email = req.body.email || vendor.email;
      vendor.phone = req.body.phone || vendor.phone;
      vendor.location = req.body.location || vendor.location;
      if (req.body.password) {
        vendor.password = await hashPassword(req.body.password);
      }

      const updatedVendor = await vendor.save();
      return res.status(200).json({
        status: "success",
        message: "Vendor updated successfully",
        updatedVendor,
      });
    } else {
      return res.status(404).json({
        status: "error",
        message: "Vendor not found",
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
// delete
export const vendorDelete = async (req, res) => {
  try {
    const { name } = req.body;
    const vendor = await vendorModel.findOne({ name });
    if (vendor) {
      await vendor.deleteOne();
      return res.status(200).json({
        success: true,
        message: "Vendor deleted successfully",
      });
    } else {
      return res.status(404).json({
        status: "error",
        message: "Vendor not found",
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
