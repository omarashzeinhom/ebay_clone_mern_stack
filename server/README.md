# Express Node.js and Mongoose Server for E-commerce

## Start by

```bash
node index.js
```

```lua
Project Structure


├── server
│   ├── controllers
│   │   ├── authController.js
│   ├── db
│   │   ├── connection.js
│   ├── middleware
│   │   ├── isAuth.js
│   ├── models
│   │   ├── User.js
│   ├── routes
│   │   ├── authRoutes.js
│   ├── utils
│   │   ├── index.js
│   ├── views
│   │   ├── index.js
│   ├── .gitignore
│   ├── config.env
│   ├── package.json
│   └── README.md
└── package.json
```

- Project Overview
  The server is designed for an e-commerce application, providing backend functionalities using Node.js, Express, and MongoDB through Mongoose.

### Getting Started

Clone the repository.
Install dependencies with yarn install.
Start the server with `node index.js`

- Features

1. Authentication: Includes user authentication handled by the authController.

2. Database Connectivity: Utilizes MongoDB with Mongoose for seamless database integration.

3. Middleware: Implements middleware for various server-side tasks like authentication (isAuth).

##### Built With

[Node.js](https://nodejs.org/en/)
[Express](https://expressjs.com/)
[MongoDB](https://www.mongodb.com/)
[Mongoose](https://mongoosejs.com/)

###### References

[Express Documentation](https://expressjs.com/en/5x/api.html)
[MongoDB Documentation](https://www.mongodb.com/docs/drivers/node/current/)
[Mongoose Documentation](https://mongoosejs.com/docs/)

- Various References 
1. [Import and Export Data - MongoDB Compass ](https://www.mongodb.com/docs/compass/current/import-export/)
2. [Create, View, Drop, and Hide Indexes](https://www.mongodb.com/docs/atlas/atlas-ui/indexes/#create-an-index)
3. [Authenticate Users - Node.js SDK - MongoDB](https://www.mongodb.com/docs/realm/sdk/node/users/authenticate-users/#std-label-node-login-google)
4. [express-rate-limit](https://www.npmjs.com/package/express-rate-limit)
5. [MySQL - Express (tedious)](https://expressjs.com/en/guide/database-integration.html#sql-server)