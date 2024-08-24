import { User } from "../models/users.models.js";
import httpStatus from "http-status"; // Correct import for http-status package
import bcrypt from "bcrypt";
import crypto from "crypto"; // Import crypto module to generate token

const login = async (req, res) => {
  const { username, password } = req.body;

  // Fix the logic check here
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Please provide both username and password" });
  }

  try {
    const user = await User.findOne({ username }); // Use findOne to get a single user

    if (!user) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password); // Await bcrypt.compare

    if (isPasswordValid) {
      const token = crypto.randomBytes(20).toString("hex");

      user.token = token;
      await user.save();
      return res.status(httpStatus.OK).json({ token: token });
    } else {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ message: "Invalid password" });
    }
  } catch (e) {
    return res
      .status(500)
      .json({ message: `Something went wrong: ${e.message}` });
  }
};

const register = async (req, res) => {
  const { name, username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res
        .status(httpStatus.FOUND)
        .json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name: name,
      username: username,
      password: hashedPassword, // Save the hashed password
    });

    await newUser.save();

    res
      .status(httpStatus.CREATED)
      .json({ message: "User registered successfully" });
  } catch (e) {
    res.status(500).json({ message: `Something went wrong: ${e.message}` });
  }
};

export { login, register };
