const User = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/GenerateToken");

const SignUp = async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  try {
    const UserExists = await User.findOne({ email });
    if (UserExists) {
      return res.status(409).json({ message: "User already exists" });
    }

    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters long",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
    });

    const token = generateToken(user);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 2 * 60 * 60 * 1000, // 1 day
    });

    res.status(201).json({
      message: "User registered successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const Login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Email and password required" });

  try {
    const UserExist = await User.findOne({ email });
    if (!UserExist)
      return res.status(401).json({ message: "Please Signup first" });

    if (UserExist.status === "inactive")
      return res.status(403).json({ message: "Account is deactivated" });

    const isMatch = bcrypt.compare(password, UserExist.password);

    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    UserExist.lastLogin = new Date();

    await UserExist.save();

    const token = generateToken(UserExist);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 2 * 60 * 60 * 1000, // 2 hr
    });

    res.status(200).json({
      message: "Login successful",
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const Logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });

  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

module.exports = { SignUp, Login, getCurrentUser, Logout };
