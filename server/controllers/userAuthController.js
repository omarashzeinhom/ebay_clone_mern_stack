// controllers/authController.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;
const User = require("../models/userModel");
//const Business = require("../models/businessModel");
// TODO MAKE SURE EXISITNG EMAIL IS NOT IN USER OBJECTS OR VICE VERSA

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

const userSecretKey = process.env.USER_JWT_SECRET;

class UserAuthController {
  /* <---------- User Async Functions Start ----------> */
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
      const userToken = jwt.sign(
        { userId: user._id, email: user.email },
        userSecretKey,
        {
          expiresIn: "1h",
        }
      );

      // Log successful login attempt
      console.log(`User login successful: ${email}`);

      // Respond with the token and expiration time
      res.status(200).json({ userToken, expiresIn: 3600 });
    } catch (error) {
      // Handle any errors that occurred during the login process
      console.error("Error in login:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async updateUser(req, res) {
    // _id we have to update the object with  the same prop _id value to avoid creation of duplicate users
    const _id = req.updatedUser._id; // Assuming userId is extracted from authentication middleware
    //const objectId = req.params.id; // This is the main focus
    console.log("_id===>" + _id);

    const { firstName, lastName, email, avatar, password } = req.body;

    try {
      const filter = { _id: _id };
      // Upload new avatar to Cloudinary if provided
      if (avatar) {
        const result = await cloudinary.uploader.upload(avatar);
        avatar = result.secure_url;
      }

      // Construct updates object with sanitized data
      const updates = {};
      if (firstName && typeof firstName === "string") {
        updates.firstName = firstName;
      }
      if (lastName && typeof lastName === "string") {
        updates.lastName = lastName;
      }
      if (email && typeof email === "string") {
        updates.email = email;
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
      const updatedUser = await User.updateOne(filter, updates);

      // Return updated user data in the response
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error("Error in updateUser:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  /* <---------- User Async Functions End ----------> */
  async facebookLogin(req, res) {
    const { accessToken } = req.body;

    try {
      // Validate access token with Facebook
      const fbResponse = await axios.get(`https://graph.facebook.com/me?access_token=${accessToken}&fields=id,email,first_name,last_name,picture`);

      const { id, email, first_name, last_name, picture } = fbResponse.data;

      // Check if the user already exists
      let user = await User.findOne({ email });
      
      if (!user) {
        // Register the user if they do not exist
        const hashedPassword = await bcrypt.hash(id, 10); // Use Facebook ID as temporary password
        
        user = new User({
          firstName: first_name,
          lastName: last_name,
          email: email,
          password: hashedPassword,
          avatar: picture.data.url,
        });
        
        await user.save();
      }

      // Generate a JWT token
      const userToken = jwt.sign(
        { userId: user._id, email: user.email },
        userSecretKey,
        { expiresIn: "1h" }
      );

      res.status(200).json({ userToken, expiresIn: 3600 });
    } catch (error) {
      console.error("Error in facebookLogin:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

}

module.exports = new UserAuthController();