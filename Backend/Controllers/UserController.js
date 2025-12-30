const User = require("../Models/UserModel");
const bcrypt=require('bcrypt')

const updateProfile = async (req, res) => {
  const { fullName, email } = req.body;

  if (!fullName || !email) {
    return res.status(400).json({
      success: false,
      message: "Full name and email are required",
    });
  }

  try {
    const emailExists = await User.findOne({
      email,
      _id: { $ne: req.user.id },
    });

    if (emailExists) {
      return res.status(409).json({
        success: false,
        message: "Email already in use",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { fullName, email },
      { new: true }
    ).select("-password");

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "internal server error" });
  }
};

const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return res.status(400).json({
      success: false,
      message: "Old and new password are required",
    });
  }

  const user = await User.findById(req.user.id);

  const isMatch = await bcrypt.compare(oldPassword, user.password);

  if (!isMatch) {
    return res.status(401).json({
      success: false,
      message: "Old password is incorrect",
    });
  }

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  // Logout after password change
  res.clearCookie("token");

  res.status(200).json({
    success: true,
    message: "Password changed successfully. Please login again.",
  });
};

module.exports = { updateProfile ,changePassword};
