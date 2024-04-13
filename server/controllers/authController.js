// controllers/authController.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;
const User = require("../models/userModel");
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

/* <---------- User Async Functions Start ----------> */
class AuthController {
  async register(req, res) {
    try {
      let avatar = req.body.avatar;
      if (avatar) {
        try {
          const result = await cloudinary.uploader.upload(avatar);
          avatar = result.secure_url;
        } catch (uploadError) {
          console.error("Error uploading image to Cloudinary:", uploadError);
          return res.status(500).json({ message: "Error uploading image" });
        }
      }
      //DEBUG
      //console.log("avatar===>" + avatar);

      const { firstName, lastName, email, password } = req.body;
      // Sanitize and validate user inputs

      if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }

      // Check if the email already exists in the database

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Hash the password before storing it in the database
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user instance
      const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        avatar: avatar,
      });

      // Save the new user to the database
      await newUser.save();

      // Return a success response
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      // Handle any errors that occurred during the registration process
      console.error("Error in register:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async getUser(req, res) {
    try {
      // Verify that the user is authenticated and has a valid userId
      if (!req.user || !req.user.userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      // Sanitize and validate the userId
      const userId = req.user.userId;
      if (!userId) {
        return res.status(400).json({ message: "Invalid userId" });
      }

      // Fetch the user from the database using a secure method
      const user = await User.findById(userId).populate({
        path: "avatar",
        select: "_id name",
      });

      // Check if the user exists
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Return the user data in the response
      res.status(200).json({
        userId: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar,
      });
    } catch (error) {
      // Handle any errors that occurred during the process
      console.error("Error in getUser:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async login(req, res) {
    const { email, password } = req.body;

    try {
      // Validate input: Check if email and password are provided
      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Email and password are required" });
      }

      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Compare the provided password with the hashed password stored in the database
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Generate a JWT token for authentication
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        secretKey,
        {
          expiresIn: "1h",
        }
      );

      // Log successful login attempt
      console.log(`User login successful: ${email}`);

      // Respond with the token and expiration time
      res.status(200).json({ token, expiresIn: 3600 });
    } catch (error) {
      // Handle any errors that occurred during the login process
      console.error("Error in login:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async updateUser(req, res) {
    // _id we have to update the object with  the same prop _id value to avoid creation of duplicate users
    const userId = req.user.userId; // Assuming userId is extracted from authentication middleware
    const objectId = req.params.id; // This is the main focus

    const {
      updatedFirstName,
      updatedLastName,
      updatedEmail,
      avatar,
      password,
    } = req.body;

    if (objectId === userId) {
      try {
        const filter = { _id: userId };
        console.log(userId);
        // Upload new avatar to Cloudinary if provided
        if (avatar) {
          const result = await cloudinary.uploader.upload(avatar);
          avatar = result.secure_url;
        }

        // Construct updates object with sanitized data
        const updates = {};
        if (updatedFirstName && typeof updatedFirstName === "string") {
          updates.firstName = updatedFirstName;
        }
        if (updatedLastName && typeof updatedLastName === "string") {
          updates.lastName = updatedLastName;
        }
        if (updatedEmail && typeof updatedEmail === "string") {
          updates.email = updatedEmail;
        }
        if (avatar && typeof avatar === "string") {
          updates.avatar = avatar;
        }
        if (password && typeof password === "string") {
          // Hash the password before updating
          const hashedPassword = await bcrypt.hash(password, 10);
          updates.password = hashedPassword;
        }

        // Update user document using Mongoose method
        const updatedUser = await User.findOneAndReplace(filter, updates, {
          new: true,
        });

        // Return updated user data in the response
        res.status(200).json(updatedUser);
      } catch (error) {
        console.error("Error in updateUser:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }

  /* <---------- User Async Functions End ----------> */

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

module.exports = new AuthController();
