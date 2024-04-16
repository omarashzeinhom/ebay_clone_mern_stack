// controllers/businessAuthController.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;
const Business = require("../models/businessModel");

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

class BusinessAuthController {

  /* <---------- Business Async Functions Start ----------> */

  async registerBusiness(req, res) {
    try {
      const {
        businessName,
        businessEmail,
        businessPassword,
        businessLocation,
        businessActive,
        businessAvatar,
      } = req.body;

      // Validate input: Check if required fields are provided
      if (!businessName || !businessEmail || !businessPassword) {
        return res
          .status(400)
          .json({ message: "Business name, email, and password are required" });
      }

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
      console.log(`New business registered: ${newBusiness}`);

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
  }

  async loginBusiness(req, res) {
    const { businessEmail, businessPassword } = req.body;

    try {
      // Validate input: Check if email and password are provided
      if (!businessEmail || !businessPassword) {
        return res
          .status(400)
          .json({ message: "Email and password are required" });
      }

      // Find the business by email
      const business = await Business.findOne({ businessEmail });
      if (!business) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Validate password
      const isPasswordValid = await bcrypt.compare(
        businessPassword,
        business.businessPassword
      );
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Generate JWT token
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

      // Log successful login
      console.log(`Business login successful: ${businessEmail}`);

      // Return token and expiration time
      res.status(200).json({ token, expiresIn: 3600 });
    } catch (error) {
      // Handle any unexpected errors
      console.error("Error in loginBusiness:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async getBusiness(req, res) {
    try {
      // Ensure that the business data exists in the request
      if (!req.business) {
        return res.status(404).json({ message: "Business not found" });
      }

      // Extract relevant business information
      const { businessId, businessEmail, businessName } = req.business;

      // Return business data in the response
      res.status(200).json({
        businessId,
        businessEmail,
        businessName,
      });
    } catch (error) {
      console.error("Error in getBusiness:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async updateBusiness(req, res) {
    const {
      updatedBusinessName,
      updatedBusinessEmail,
      updatedBusinessAvatar,
      password,
    } = req.body;
    const businessId = req.business.businessId; // Assuming userId is extracted from authentication middleware

    try {
      // Upload new avatar to Cloudinary if provided
      if (updatedBusinessAvatar) {
        const result = await cloudinary.uploader.upload(updatedBusinessAvatar);
        updatedBusinessAvatar = result.secure_url;
      }

      // Construct updates object with sanitized data
      const updates = {};
      if (updatedBusinessName && typeof updatedBusinessName === "string") {
        updates.businessName = updatedBusinessName;
      }
      if (updatedBusinessEmail && typeof updatedBusinessEmail === "string") {
        updates.businessEmail = updatedBusinessEmail;
      }
      if (updatedBusinessAvatar && typeof updatedBusinessAvatar === "string") {
        updates.businessAvatar = updatedBusinessAvatar;
      }
      if (password && typeof password === "string") {
        // Hash the password before updating
        const hashedPassword = await bcrypt.hash(password, 10);
        updates.password = hashedPassword;
      }

      // Update Business document using Mongoose method
      const updatedBusiness = await Business.findByIdAndUpdate(
        businessId,
        updates,
        { new: true }
      );

      // Return updated user data in the response
      res.status(200).json(updatedBusiness);
    } catch (error) {
      console.error("Error in updateUser:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  /* <---------- Business Async Functions End ----------> */
}

module.exports = new BusinessAuthController();
