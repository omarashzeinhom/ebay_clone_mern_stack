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
console.log(cloudinary.config());

const secretKey = process.env.JWT_SECRET;

/* <---------- User Async Functions Start ----------> */

exports.register = async (req, res) => {
  const { firstName, lastName, email, password, avatar } = req.body;

  //Debug
  console.log(`Received User register request: ---> ${req?.body}`);

  try {
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
      avatar: avatar || " ",
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.getUser = async (req, res) => {
  try {
    // Verify that the user is authenticated and has a valid userId
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Fetch the user from the database
    const user = await User.findById(req.user.userId).populate({ path: "avatar", select: "_id name" });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    res.status(200).json({
      userId: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      avatar: user.avatar ? user.avatar._id : null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.login = async (req, res) => {
  const { email, password } = req.body;
  // console.log(`logged in with ${email} ${password}`);

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

    //Debug
    console.log(`User login successful: ---> ${req?.body}`);

    res.status(200).json({ token, expiresIn: 3600 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
/* <---------- User Async Functions End ----------> */

/* <---------- Business Async Functions Start ----------> */

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

    //Debug
    console.log(`Received Business register request: ---> ${req?.body}`);

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

    //Debug
    console.log(`Business login successful: ---> ${req?.body}`);

    res.status(200).json({ token, expiresIn: 3600 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getBusiness = async (req, res) => {
  try {
    const business = req?.business;

    //Debug
    // console.log(`getBusiness request : ---> ${req?.body}`);

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

/* <---------- Business Async Functions End ----------> */

exports.updateUser = async (req, res) => {
  const { email, avatar, userId } = req.body;
  const { updatedFirstName, updatedLastName, updatedEmail } = req.body;

  try {
    let avatarLink = avatar; // Default to the existing avatar
    if (avatar) {
      // Upload the avatar to Cloudinary only if it's provided
      const result = await cloudinary.v2.uploader.upload(avatar);
      avatarLink = result?.secure_url;
    }
    const allowedUpdates = ['firstName', 'lastName', 'email', 'avatar', 'password'];
    const updates = {};
    
    // Validate and sanitize user-controlled inputs
    if (updatedFirstName && typeof updatedFirstName === 'string') {
      updates.firstName = updatedFirstName;
    }
    if (updatedLastName && typeof updatedLastName === 'string') {
      updates.lastName = updatedLastName;
    }
    if (updatedEmail && typeof updatedEmail === 'string') {
      updates.email = updatedEmail;
    }
    if (avatarLink && typeof avatarLink === 'string') {
      updates.avatar = avatarLink;
    }
    if (password && typeof password === 'string') {
      updates.password = password;
    }
    
    // Update only the allowed fields
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updates,
      { new: true } // Return the updated document
    ).lean();
    
    res.status(200).json({
      // Response data
    });
    
  } catch (error) {
    console.error(`Error in updateUser: ${error}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
