# 1. Setup Project

## Client (React.js & TypeScript)

- Requirements

1. [node.js]
2. [VsCode]() or any Text Editor of your Choice.
3. [yarn]()

- Make a new project directory call it mern or fullstackapp

```bash
mkdir mern
cd mern
```

- Inside `/mern`
- We will create a new react app with typescript
  This is going to be the frontend for the project.

```bash
yarn create react-app client --template typescript
```

```bash

```

- Initate a new project

### Project Structure

Start a new react typescript project

```bash
yarn create react-app my-app --template typescript
```

|-- client/
| |-- node_modules/
| |-- public/
| |-- src/
| | |-- app/
| | | |-- App.tsx
| | | |-- App.scss
| | |-- components/
| | | |-- Ads/
| | | | |-- AdsCarousel/
| | | | | |-- AdsCarousel/
| | | | | | |-- AdsCarousel.scss
| | | | | | |-- AdsCarousel.tsx
| | | | |-- Ads.scss
| | | | |-- Ads.tsx
| | | |-- auth/
| | | | |-- RegisterForm/
| | | | | |-- RegisterForm.scss
| | | | | |-- RegisterForm.tsx
| | | | |-- SignInForm/
| | | | | |-- SignInForm.scss
| | | | | |-- SignInForm.tsx
| | | |-- Cart/
| | | | |-- CartItem/
| | | | | |-- CartItem.tsx
| | | | | |-- CartItem.scss
| | | | |-- CheckOut/
| | | | | |-- CheckOut.tsx
| | | | | |-- CheckOut.scss
| | | | |-- ShoppingCart/
| | | | | |-- ShoppingCart.tsx
| | | | | |-- ShoppingCart.scss
| | | |-- Categories/
| | | | |-- CategoriesCarousel
| | | | | |-- CategoriesCarousel.scss
| | | | | |-- CategoriesCarousel.tsx
| | | | |-- CategoryList
| | | | | |-- CategoryList.scss
| | | | | |-- CategoryList.tsx
| | | | |-- ShoppingCartContext.tsx
| | | |-- ErrorBoundary/
| | | | |-- ErrorBoundary.tsx
| | | |-- Footer/
| | | | |-- Footer.tsx
| | | | |-- Footer.scss
| | | |-- Header/
| | | | |-- Header.tsx
| | | | |-- Header.scss
| | | |-- Loading/
| | | | |-- Header.tsx
| | | | |-- Header.scss
| | | |-- Nav/
| | | | |-- Nav.tsx
| | | | |-- Nav.scss
| | | |-- NotificationCard/
| | | | |-- NotificationCard.tsx
| | | | |-- NotificationCard.scss
| | | |-- Product/
| | | | |-- ProductDetail/
| | | | | |-- ProductDetail.tsx
| | | | | |-- ProductDetail.scss
| | | | |-- ProductList/
| | | | | |-- ProductList.scss
| | | | | |-- ProductList.tsx
| | | | |-- TrendingProducts/
| | | | | |-- TrendingProducts.scss
| | | | | |-- TrendingProducts.tsx
| | | | | |-- TrendingProductsAlpha.scss
| | | | | |-- TrendingProductsAlpha.tsx
| | | |-- Profile/
| | | | |-- Business/
| | | | | |-- BusinessProfile.tsx
| | | | | |-- EditBusinessProfile.tsx
| | | | |-- User/
| | | | | |-- UserProfile.tsx
| | | | | |-- EditUserProfile.tsx
| | | | |-- Profile.tsx
| | | | |-- Profile.scss
| | | |-- SearchBar/
| | | | |-- SearchBar.tsx
| | | | |-- SearchBar.scss
| | | | |-- SearchBarResults.tsx
| | | |-- Sell/
| | | | |-- Sell.tsx
| | | | |-- Sell.scss
| | | |-- SurveyForm
| | | | |-- SurveyForm.tsx
| | | | |-- SurveyForm.scss
| | |-- index.tsx
| | |-- context/
| | | |-- AuthContext.tsx
| | | |-- CategoryContext.tsx
| | | |-- ProductContext.tsx
| | | |-- ShoppingCartContext.tsx
| | |-- features/
| | | |-- stripe.ts
| | |-- hook/
| | | |-- useLocalStorage.tsx
| | |-- models/
| | | |-- business.ts
| | | |-- cartitem.ts
| | | |-- category.ts
| | | |-- product.ts
| | | |-- updateduser.ts
| | | |-- user.ts
| | |-- pages/
| | | |-- CustomerService/
| | | | |-- CustomerService.scss
| | | | |-- CustomerService.tsx
| | | |-- Home/
| | | | |-- Home.scss
| | | | |-- Home.tsx
| | | |-- NotFound/
| | | | |-- NotFound.scss
| | | | |-- NotFound.tsx
| | | |-- Product/
| | | | |-- Product.scss
| | | | |-- Product.tsx
| | | |-- Register/
| | | | |-- Register.scss
| | | | |-- Register.tsx
| | | |-- Sell/
| | | | |-- Sell.scss
| | | | |-- Sell.tsx
| | | |-- SignIn/
| | | | |-- SignIn.scss
| | | | |-- SignIn.tsx
| | |-- index.tsx
| | |-- services/
| | | |-- authService.tsx
| | | |-- categoryService.tsx
| | | |-- productService.tsx
| | |-- utilities/
| | | |-- constants.tsx
| | | |-- currencyFormatter.tsx
| |-- App.test.tsx
| |-- index.tsx
| |-- s react-app-env.d.ts
| |-- reportWebVitals.ts
| |-- setupTests.ts
| |-- .env
| |-- .env.development
| |-- package.json
| |-- README.md
| |-- TODOS.md
| |-- tsconfig.json
| |-- vercel.json
| |-- yarn.lock

````

### Dependencies

```json

{
  "name": "client",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@cloudinary/react": "^1.11.2",
    "@cloudinary/url-gen": "^1.14.0",
    "@emailjs/browser": "^3.12.1",
    "@stripe/react-stripe-js": "^2.4.0",
    "@stripe/stripe-js": "^2.2.1",
    "@testing-library/jest-dom": "^5.14.1",
    "@testing-library/react": "^13.0.0",
    "@testing-library/user-event": "^13.2.1",
    "@types/connect": "^3.4.38",
    "@types/jest": "^27.0.1",
    "@types/node": "^16.7.13",
    "@types/react": "^18.2.43",
    "@types/react-dom": "^18.2.17",
    "@types/react-router-dom": "^5.3.3",
    "axios": "^1.6.2",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-helmet": "^6.1.0",
    "react-icons": "^4.12.0",
    "react-router-dom": "^6.20.1",
    "react-scripts": "5.0.1",
    "sass": "^1.69.5",
    "swiper": "^11.0.5",
    "typescript": "^5.3.3",
    "web-vitals": "^2.1.0"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "devDependencies": {
    "@babel/plugin-proposal-private-property-in-object": "^7.21.11",
    "@types/react-helmet": "^6.1.11"
  },
  "license": "MIT",
  "homepage": "https://ebay-clone-mern-stack.vercel.app/"
}
````

- Install By

```bash
yarn add bcrypt body-parser cloudinary cors crypto dotenv express helmet jsonwebtoken mongodb mongoose multer node-fetch

```

### Client Setup Instructions:

1. Navigate to the `client` directory: `cd client`
2. Install dependencies: `yarn install`
3. Start the development server: `yarn start`

---

## Server (Node.js & Express.js)

### Project Structure

```
|-- server/
|   |-- OUTLINE/
|   |-- TIMELINE/
|   |-- backup/
|   |-- controllers/
|   |-- middleware/
|   |-- models/
|   |-- node_modules/
|   |-- routes/
|   |-- .gitignore
|   |-- config.env
|   |-- config.env.example
|   |-- index.js
|   |-- package.json
|   |-- README.md
```

### Dependencies

```json
{
  "name": "server",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "start": "node index.js",
  "dependencies": {
    "bcrypt": "^5.1.1"
    // ... other dependencies ...
  }
}
```

### Server Setup Instructions:

1. Navigate to the `server` directory: `cd server`
2. Install dependencies: `npm install`
3. Start the server: `npm start`

---

### Explore and Build:

- Visit [http://localhost:3000/](http://localhost:3000/) to explore your React app.
- Your server is running on [http://localhost:5000/](http://localhost:5000/).

Happy coding! 🚀

Feel free to use and modify this markdown file as needed for your project setup instructions.

- References

1. [Create React App - Adding TypeScript](https://create-react-app.dev/docs/adding-typescript/)
2. [Elements of MVC in React - The Startup Daniel Dughila](https://medium.com/swlh/elements-of-mvc-in-react-9382de427c09)
3. [ A Model View Controller pattern for React ](https://blog.testdouble.com/posts/2019-11-04-react-mvc/)
