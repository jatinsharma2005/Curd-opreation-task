const User = require("../models/User");
const Task = require("../models/Task");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // prevent admin self delete

    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({
        message: "You cannot delete your own account",
      });
    }

    // delete user's tasks

    await Task.deleteMany({
      user: user._id,
    });

    // delete user

    await user.deleteOne();

    res.status(200).json({
      message: "User and tasks deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.updateUserRole = async (req, res) => {
  try {
    console.log(req.body);

    const { role } = req.body;

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({
        message: "Cannot change your own role",
      });
    }

    user.role = role;

    await user.save();

    res.status(200).json({
      message: "User role updated successfully",

      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
