import CustomError from "../middlewares/CustomError.js";
import { User } from "../models/User.js";
import bcrypt from "bcryptjs";
import session from "express-session";
class UserController {
  static registerUser = async (req, res, next) => {
    try {
      const { name, email, password, userName } = req.body;
      // if user already exists
      const userExists = await User.findOne({ email: email });
      if (userExists) {
        throw new CustomError(400, "User already exists");
      }
      // checking for the username availability
      const user = await User.findOne({ userName: userName });
      if (user) {
        throw new CustomError(400, "Username already exists");
      }
      await User.create({
        name,
        email,
        password,
        userName,
      });

      res.status(201).send({
        message: "User created successfully",
        data: {
          name,
          email,
          userName,
        },
        succuess: true,
      });
    } catch (error) {
      next(error);
    }
  };
  static loginUser = async (req, res, next) => {
    try {
      const { email, password, userName } = req.body;
      if (!email && !userName) {
        throw new CustomError(400, "Email or Username is required");
      }
      if (!password) {
        throw new CustomError(400, "Password is required");
      }
      const user = await User.findOne({
        $or: [{ email: email }, { userName: userName }],
      }).select("-password");
      if (!user) {
        throw new CustomError(404, "User not found");
      }
      const matchPassword = await bcrypt.compare(password, user.password);
      if (matchPassword) {
        req.select.user = user; // saving cookies
        res.status(200).json({
          message: `${user.name} logged in! 🚀`,
          data: user,
        });
      }
    } catch (error) {
      next(error);
    }
  };
}

export default UserController;
