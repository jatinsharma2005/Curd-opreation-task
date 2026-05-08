const User = require("../models/User");

const bcrypt = require("bcryptjs");

const generateToken = require("../utils/generateToken");

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check email

    const existingEmail = await User.findOne({
      email,
    });

    if (existingEmail) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    // check username

    const existingName = await User.findOne({
      name,
    });

    if (existingName) {
      return res.status(400).json({
        message: "Username already exists",
      });
    }

    // hash password

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    // create user

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // response

    res.status(201).json({
      token: generateToken(user._id, user.role),

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    res.status(200).json({
      token: generateToken(user._id, user.role),

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
