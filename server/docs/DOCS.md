API Documentation authored by OmarAshrafZeinhom

This markdown page provides a comprehensive overview of the API routes, functionalities, and authentication requirements.

Here are the emojis used throughout the documentation:

🔒 Denotes routes requiring authorization (token verification) for access.
🔍 Indicates routes for navigation and exploring data.
➕ Represents routes for creating new data.
❌ Signifies routes for deleting data.
🔎 Represents routes for searching data.
ℹ️ Provides additional information or notes.
Business Routes

These routes handle business user functionalities.

    Login 🔒: Allows businesses to log in to the system using a valid email and password. (POST: /loginb)

    Register ➕: Enables businesses to register for an account. (POST: /registerb)

    Get Business ℹ️: Retrieves business information. Requires token verification for access. (GET: /business)

    Get Business by ID 🔒: Fetches a specific business's details using their ID. Requires token verification for access. (GET: /business/:id)

    Update Business 🔒: Updates a business's information. Requires token verification for access. (PUT: /business/:id)

Category Routes

These routes manage product categories within the system.

    Get All Categories: Retrieves a list of all available product categories. (GET: /)

Product Routes

These routes handle product functionalities within the system.

    Get All Products: Retrieves a list of all available products. (GET: /)

    Get Product by ID: Fetches a specific product's details using its ID. (GET: //:productId)

    Delete Product ❌: Deletes a product using its ID. Requires token verification for access. (DELETE: /delete/:productId)

    Search Products 🔎: Enables searching for products based on specific criteria. Rate-limited to prevent abuse. (GET/POST: /search-results/:query)

    Create Product ➕: Creates a new product. (POST: /create)

    Get Products by Business ID: Retrieves products associated with a specific business using their ID. (GET/POST: /by-business/:businessId)

ℹ️ Note: The route for creating a product with an image is not included in this documentation and might require further adjustments.
User Routes

These routes manage user functionalities within the system.

    Login 🔒: Allows users to log in to the system using a valid email and password. (POST: /login)

    Register ➕: Enables users to register for an account. (POST: /register)

    Get User ℹ️: Retrieves user information. Requires token verification for access. (GET: /user)

    Update User 🔒: Updates a user's information. Requires token verification for access. (PUT: /user/:id)

    Get User by ID 🔒: Fetches a specific user's details using their ID. Requires token verification for access. (GET: /user/:id)

ℹ️ Note: Additional routes for user registration and login functionalities might be implemented but are not included here.
Try it out!

    Local development server: http://localhost:5000

    Production server: https://server-ebay-clone.onrender.com

I hope this markdown page with emoji explanations clarifies the functionalities of each API route!