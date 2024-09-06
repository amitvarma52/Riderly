/** @format */

import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables once, at the top

export const authMiddle = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).send("Authorization header missing or malformed");
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        // console.log("JWT verification error:", err);
        return res.status(401).send("Unauthorized User");
      } else {
        console.log("Decoded JWT:", decoded);
        req.userId = decoded.id;
        req.userType = decoded.role; // Changed from `userType` to `role` for consistency
        console.log(`User ID: ${req.userId}, User Type: ${req.userType}`);

        next();
      }
    });
  } catch (error) {
    console.error("Error in authentication middleware:", error);
    return res.status(500).send({
      success: false,
      message: "ERROR in API",
      error,
    });
  }
};
