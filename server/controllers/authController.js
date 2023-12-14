// controllers/authController.js

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Business = require("../models/businessModel");

const secretKey = process.env.JWT_SECRET;

exports.register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

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
    });
    await newUser.save();

    // const newBusiness = new Business
    const existingBusiness = await Business.findOne({ email });
    if (existingBusiness || existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists as a business or customer" });
    }
    const hashedBusinessPassword = await bcrypt.hash(businessPassword, 10);

    const newBusiness = new Business({
      businessName,
      businessEmail,
      businessPassword: hashedBusinessPassword,
      businessLocation,
      businessActive,
    });
    await newBusiness.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.registerBusiness = async (req, res) => {
  const {
    businessName,
    businessEmail,
    businessPassword,
    businessLocation,
    businessActive,
  } = req.body;
  const existingUser = await User.findOne({ businessEmail });
  const existingBusiness = await Business.findOne({ businessEmail });
  if (existingBusiness || existingUser) {
    return res
      .status(400)
      .json({ message: "User already exists as a business or customer" });
  }
  const hashedBusinessPassword = await bcrypt.hash(businessPassword, 10);

  const newBusiness = new Business({
    businessName,
    businessEmail,
    businessPassword: hashedBusinessPassword,
    businessLocation: businessLocation || 'Egypt',
    businessActive: businessActive || true,
  });
  await newBusiness.save();
  console.log(newBusiness);
  
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
    console.log("Business login successful");

    res.status(200).json({ token, expiresIn: 3600 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


exports.getUser = async (req, res) => {
  try {
    // You can access the user details from the request object
    const user = req.user;
    //console.log(req.user);
    //res.json(user);
    res.status(200).json({
      userId: user.userId,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getBusiness = async (req, res) => {
  try {
    // You can access the user details from the request object
    const business = req.business;
    console.log(req.user);
    //res.json(user);
    res.status(200).json({
      businessId: business.businessId,
      businessEmail: business.businessEmail,
      businessName: business.businessName,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

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
    });
    await newUser.save();

    // Check for existing business using businessEmail
    const existingBusiness = await Business.findOne({ businessEmail: email });
    if (existingBusiness) {
      return res
        .status(400)
        .json({ message: "User already exists as a business" });
    }

    // Add the business registration logic here...

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};