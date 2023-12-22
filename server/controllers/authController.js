// controllers/authController.js

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Business = require("../models/businessModel");
const cloudinary = require("cloudinary").v2;

// Cloudinary configuration
// Return "https" URLs by setting secure: true
cloudinary.config({
  secure: true,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Log the configuration
// console.log(cloudinary.config());

const secretKey = process.env.JWT_SECRET;

exports.register = async (req, res) => {
  const { firstName, lastName, email, password, avatar } = req.body;
  // console.log(avatar);

  try {
    // Upload avatar to Cloudinary
    // console.log(cloudinaryResponse);
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      avatar,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.registerBusiness = async (req, res) => {
  try {
    const {
      businessName,
      businessEmail,
      businessPassword,
      businessLocation,
      businessActive,
      businessAvatar,
    } = req.body;

    console.log("Received business registration request:", req.body);

    // Check if the email is already associated with a user or a business
    const existingUser = await User.findOne({ businessEmail });
    const existingBusiness = await Business.findOne({ businessEmail });

    if (existingBusiness || existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists as a business or customer" });
    }

    // Hash the business password before saving it
    const hashedBusinessPassword = await bcrypt.hash(businessPassword, 10);

    // Create a new business instance and save it to the database
    const newBusiness = new Business({
      businessName,
      businessEmail,
      businessPassword: hashedBusinessPassword,
      businessLocation: businessLocation || "Egypt",
      businessActive: businessActive || true,
      businessAvatar: businessAvatar || "",
    });

    await newBusiness.save();
    console.log(`New business registered: -->>> ${newBusiness}`);

    // Respond with a success message or any relevant data
    res.status(201).json({
      message: "Business registration successful",
      business: newBusiness,
    });
  } catch (error) {
    // Handle any errors that occurred during the registration process
    console.error("Error in registerBusiness:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user._id, email: user.email }, secretKey, {
      expiresIn: "1h",
    });

    res.status(200).json({ token, expiresIn: 3600 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.loginBusiness = async (req, res) => {
  const { businessEmail, businessPassword } = req.body;

  try {
    const business = await Business.findOne({ businessEmail });
    if (!business) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(
      businessPassword,
      business.businessPassword
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      {
        businessName: business.businessName,
        businessEmail: business.businessEmail,
        businessId: business._id,
      },
      secretKey,
      {
        expiresIn: "1h",
      }
    );

    // Add a debug log
    // console.log("Business login successful");

    res.status(200).json({ token, expiresIn: 3600 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getUser = async (req, res) => {
  try {
    // You can access the user details from the request object
    const user = req?.user;

    console.log(`req?.user--- >${JSON.stringify(req?.user)}`);

    res.status(200).json({
      userId: user?.userId,
      email: user?.email,
      firstName: user?.firstName,
      lastName: user?.lastName,
      avatar: user?.avatar,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getBusiness = async (req, res) => {
  try {
    // You can access the user details from the request object
    const business = req?.business;
    //console.log(req?.business);
    //res.json(user);
    res.status(200).json({
      businessId: business?.businessId,
      businessEmail: business?.businessEmail,
      businessName: business?.businessName,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateAvatar = async (req, res) => {
  const { avatar, avatarLink } = req.body;

  try {
    // Assuming you have a user ID available in req.user.userId
    const userId = req.user.userId;

    // Update the user's avatar in the database
    await User.findByIdAndUpdate(userId, { avatar: avatarLink });

    res.status(200).json({ message: "User avatar updated successfully" });
  } catch (error) {
    console.error("Error updating user avatar:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
