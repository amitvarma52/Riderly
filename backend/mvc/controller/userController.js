import { comparePassword, hashPassword } from "../../helper/hidePassword.js";
import { userModel } from "../model/userModel.js";
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
    res.status(200).send({
      status: "succes",
      message: "user loged in successfully",
      user,
    });
  } catch (error) {
    res.status(500).send("Internal server error");
  }
}
export const registerController = async (req, res) => {
  try {
    const { name, email, password, location } = req.body;
    const hashedPassword = await hashPassword(password);
    const newUser = new userModel({
      name,
      email,
      location,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(200).json({
      success: true,
      newUser,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};
