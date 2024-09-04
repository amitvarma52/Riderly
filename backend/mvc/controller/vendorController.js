/** @format */

import { vendorModel } from "../model/adminModel.js";
import dotenv from "dotenv";
dotenv.config();
const VENDOR_SECRET = process.env.VENDOR_SECRET;

export const loginController = async (req, res) => {
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
    const token = jwt.sign({ id: vendor.name, role: "to add products" }, VENDOR_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).send({
      status: "succes",
      message: "vendor loged in successfully",
      vendor,
      token,
    });
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};
