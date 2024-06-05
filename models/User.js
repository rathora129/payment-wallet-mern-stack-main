import mongoose from "mongoose";
import joi from "joi";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  userName: {
    type: String,
    required: [true, "Username is required"],
  },
});

const User = mongoose.model("User", userSchema);

// validatiing the user details
const validateUser = (user) => {
  const schema = joi.object({
    name: joi.string().min(3).max(24).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
    userName: joi
      .string()
      .regex(/^[a-zA-Z0-9]{3,10}$/)
      .required(),
  });
  return schema.validate(user);
};

// hashing the passwod before saving it to the database
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hashCode = await bcrypt.hash(this.password, salt);
    this.password = hashCode;
    next();
  } catch (error) {
    return next(error);
  }
});

export { User, validateUser };
