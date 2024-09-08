/** @format */

import express from "express";
import { vendorAuth } from "../../vendorMiddleware.js";
import {
  getAllVehicle,
  vehicleDelete,
  vehicleRegisterController,
  vendorLoginController,
} from "../controller/vendorController.js";
const vendorRoute = express.Router();

// login
vendorRoute.post("/login", vendorLoginController);
//register vehicle
vendorRoute.post("/registerVehicle", vendorAuth, vehicleRegisterController);
// get all vehicle
vendorRoute.post("/getAllVehicle", vendorAuth, getAllVehicle);
//Delete vehicle
vendorRoute.post("/deleteVehicle", vendorAuth, vehicleDelete);
export default vendorRoute;