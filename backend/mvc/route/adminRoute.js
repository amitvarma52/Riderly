/** @format */

import express from "express";
import {
  adminLoginController,
  getAllVendor,
  getVendorByID,
  vendorDelete,
  vendorRegisterController,
  vendorUpdateController,
} from "../controller/adminController.js";
import { authMiddle } from "../../authMiddleware.js";
const adminRouter = express.Router();

// login
adminRouter.post("/admin/login", adminLoginController);
// register
adminRouter.post("/admin/register", authMiddle, vendorRegisterController);
//upate
adminRouter.put("/admin/update", authMiddle, vendorUpdateController);
// delete
adminRouter.post("/admin/delete", authMiddle, vendorDelete);
// get by id
adminRouter.post("/admin/getOne", authMiddle, getVendorByID);
// get all vendor
adminRouter.get("/admin/allVendor", authMiddle, getAllVendor);
export default adminRouter;
