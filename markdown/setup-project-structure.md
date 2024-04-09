# 1. Setup Project MVC REACT MERN ECOMMERCE
Certainly! Here's the complete markdown file with the organized project structure for both the client and server:


## Client (React.js & TypeScript)

### Requirements
- [node.js](https://nodejs.org/)
- [VsCode](https://code.visualstudio.com/) or any Text Editor of your Choice.
- [yarn](https://yarnpkg.com/)
- Browser
1. []()


- Chrome extensions 
-[React Developer Tools](https://chromewebstore.google.com/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)

- FireFox addons
- [React Developer Tools](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/)

### Setup Instructions
1. Create a new project directory called `mern` or `fullstackapp`
   ```bash
   mkdir mern
   cd mern
   ```
2. Inside `/mern`, create a new React app with TypeScript template
   ```bash
   yarn create react-app client --template typescript
   ```
3. Initialize a new project

### Project Structure

```
|-- client/
|   |-- node_modules/
|   |-- public/
|   |-- src/
|   |   |-- app/
|   |   |-- components/
|   |   |-- context/
|   |   |-- features/
|   |   |-- hook/
|   |   |-- models/
|   |   |-- pages/
|   |   |-- services/
|   |   |-- utilities/
|   |-- .env
|   |-- .env.development
|   |-- package.json
|   |-- README.md
|   |-- tsconfig.json
|   |-- yarn.lock
```
### Client Dependencies
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

```


### Client Setup Instructions:
1. Navigate to the `client` directory: `cd client`
2. Install dependencies: `yarn install`
3. Start the development server: `yarn start`

### Step-by-Step Instructions:
1. [Create Pages Directory Structure](#step-5-create-the-pages-directory-structure)
2. [Create Components Directory Structure](#step-7-create-the-components-directory-structure)
3. [Create Context Directory Structure](#create-the-context-directory-structure)
4. [Create Services Directory Structure](#create-the-services-directory-structure)
5. [Create Utilities Directory Structure](#create-the-utilities-directory-structure)
6. [Create Models Directory Structure](#create-the-models-directory-structure)

## Server (Node.js & Express.js)

### Project Structure

```
|-- server/
|   |-- backup/
|   |-- controllers/
|   |-- middleware/
|   |-- models/
|   |-- routes/
|   |-- utils/
|   |-- views/
|   |-- .gitignore
|   |-- config.env
|   |-- package.json
|   |-- README.md
|-- package.json
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
    "bcrypt": "^5.1.1",
    "body-parser": "^1.20.2",
    "cloudinary": "^1.41.1",
    "cors": "^2.8.5",
    "crypto": "^1.0.1",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "helmet": "^7.1.0",
    "jsonwebtoken": "^9.0.2",
    "mongodb": "^6.3.0",
    "mongoose": "^8.0.3",
    "multer": "^1.4.5-lts.1",
    "node-fetch": "^3.3.2"
  }
}

```

### Client Step-by-Step Instructions:
1. [Create Controllers Directory Structure](#create-the-controllers-directory-structure)
2. [Create Middleware Directory Structure](#create-the-middleware-directory-structure)
3. [Create Models Directory Structure](#create-the-models-directory-structure-1)
4. [Create Routes Directory Structure](#create-the-routes-directory-structure)
5. [Create Utils Directory Structure](#create-the-utils-directory-structure)
6. [Create Views Directory Structure](#create-the-views-directory-structure)


You can copy and paste this markdown content into your desired markdown file.
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

- Initate a new project

### Project Structure

Start a new react typescript project

```bash
yarn create react-app my-app --template typescript
```

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
```

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





### Step 4: Explore the Project Structure

Take a moment to explore the project structure. You'll notice that Next.js has set up several directories and files for you. Of particular interest is the `pages` directory, where you'll define your Next.js routes.

### Step 5: Create the Pages Directory Structure

Next, let's create the directory structure for your pages. We'll use the following structure for this example:

```
// Inside the ./src directory 

|-- pages/
|   |-- CustomerService/
|   |   |-- CustomerService.scss
|   |   |-- CustomerService.tsx
|   |-- Home/
|   |   |-- Home.scss
|   |   |-- Home.tsx
|   |-- NotFound/
|   |   |-- NotFound.scss
|   |   |-- NotFound.tsx
|   |-- Product/
|   |   |-- Product.scss
|   |   |-- Product.tsx
|   |-- Register/
|   |   |-- Register.scss
|   |   |-- Register.tsx
|   |-- Sell/
|   |   |-- Sell.scss
|   |   |-- Sell.tsx
|   |-- SignIn/
|   |   |-- SignIn.scss
|   |   |-- SignIn.tsx
```

You can execute the following commands to create the required directory structure:

```bash
#  Go into src folder
cd .\src\

# Create pages directory
mkdir -p pages/CustomerService
mkdir -p pages/Home
mkdir -p pages/NotFound
mkdir -p pages/Product
mkdir -p pages/Register
mkdir -p pages/Sell
mkdir -p pages/SignIn

# Navigate into the pages directory
cd pages
```

### Step 6: Create Pages TypeScript and SCSS Files on Windows/Mac/Linux

Now, let's create the TypeScript (`.tsx`) and SCSS (`.scss`) files for each page. We'll use the `echo` command to create empty files:

```bash
# Make sure your still inside the src folder 
`PS E:\Coding\typescript\next\mern\client\src> `

# Create the TypeScript files
echo "" > pages/CustomerService/CustomerService.tsx
echo "" > pages/Home/Home.tsx
echo "" > pages/NotFound/NotFound.tsx
echo "" > pages/Product/Product.tsx
echo "" > pages/Register/Register.tsx
echo "" > pages/Sell/Sell.tsx
echo "" > pages/SignIn/SignIn.tsx


# Create the SCSS files
echo "" > pages/CustomerService/CustomerService.scss
echo "" > pages/Home/Home.scss
echo "" > pages/NotFound/NotFound.scss
echo "" > pages/Product/Product.scss
echo "" > pages/Register/Register.scss
echo "" > pages/Sell/Sell.scss
echo "" > pages/SignIn/SignIn.scss
```



### Step 7 Create the Components Directory Structure Windows/Mac/Linux



```
// inside /src/components 

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
```


To create the directory structure for your components, execute the following command:

```bash
# Go into the src folder
cd ./src/



# Create components directory and its subdirectories
mkdir -p components/Ads/AdsCarousel
mkdir -p components/auth/RegisterForm
mkdir -p components/auth/SignInForm
mkdir -p components/Cart/CartItem
mkdir -p components/Cart/CheckOut
mkdir -p components/Cart/ShoppingCart
mkdir -p components/Categories/CategoriesCarousel
mkdir -p components/Categories/CategoryList
mkdir -p components/ErrorBoundary
mkdir -p components/Footer
mkdir -p components/Header
mkdir -p components/Loading
mkdir -p components/Nav
mkdir -p components/NotificationCard
mkdir -p components/Product/ProductDetail
mkdir -p components/Product/ProductList
mkdir -p components/Product/TrendingProducts
mkdir -p components/Profile/Business
mkdir -p components/Profile/User
mkdir -p components/SearchBar
mkdir -p components/Sell
mkdir -p components/SurveyForm
```

### Create TypeScript and SCSS Files for Components on Windows/Mac/Linux
#### Windows

To create the TypeScript (`.tsx`) and SCSS (`.scss`) files for each component, execute the following commands:

```bash
# Make sure you're still inside the src folder
cd ./src/

# Create TypeScript files for each component
echo "" > components/Ads/Ads.tsx
echo "" > components/auth/RegisterForm/RegisterForm.tsx
echo "" > components/auth/SignInForm/SignInForm.tsx
echo "" > components/Cart/CartItem/CartItem.tsx
echo "" > components/Cart/CheckOut/CheckOut.tsx
echo "" > components/Cart/ShoppingCart/ShoppingCart.tsx
echo "" > components/Categories/CategoriesCarousel/CategoriesCarousel.tsx
echo "" > components/Categories/CategoryList/CategoryList.tsx
echo "" > components/ErrorBoundary/ErrorBoundary.tsx
echo "" > components/Footer/Footer.tsx
echo "" > components/Header/Header.tsx
echo "" > components/Loading/Loading.tsx
echo "" > components/Nav/Nav.tsx
echo "" > components/NotificationCard/NotificationCard.tsx
echo "" > components/Product/ProductDetail/ProductDetail.tsx
echo "" > components/Product/ProductList/ProductList.tsx
echo "" > components/Product/TrendingProducts/TrendingProducts.tsx
echo "" > components/Profile/Business/BusinessProfile.tsx
echo "" > components/Profile/User/UserProfile.tsx
echo "" > components/SearchBar/SearchBar.tsx
echo "" > components/Sell/Sell.tsx
echo "" > components/SurveyForm/SurveyForm.tsx

# Create SCSS files for each component
echo "" > components/Ads/Ads.scss
echo "" > components/auth/RegisterForm/RegisterForm.scss
echo "" > components/auth/SignInForm/SignInForm.scss
echo "" > components/Cart/CartItem/CartItem.scss
echo "" > components/Cart/CheckOut/CheckOut.scss
echo "" > components/Cart/ShoppingCart/ShoppingCart.scss
echo "" > components/Categories/CategoriesCarousel/CategoriesCarousel.scss
echo "" > components/Categories/CategoryList/CategoryList.scss
echo "" > components/ErrorBoundary/ErrorBoundary.scss
echo "" > components/Footer/Footer.scss
echo "" > components/Header/Header.scss
echo "" > components/Loading/Loading.scss
echo "" > components/Nav/Nav.scss
echo "" > components/NotificationCard/NotificationCard.scss
echo "" > components/Product/ProductDetail/ProductDetail.scss
echo "" > components/Product/ProductList/ProductList.scss
echo "" > components/Product/TrendingProducts/TrendingProducts.scss
echo "" > components/Profile/Business/BusinessProfile.scss
echo "" > components/Profile/User/UserProfile.scss
echo "" > components/SearchBar/SearchBar.scss
echo "" > components/Sell/Sell.scss
echo "" > components/SurveyForm/SurveyForm.scss
```

This will create the necessary directory structure and empty TypeScript and SCSS files for your components in the React project.


#### Mac & linux.
### Make sure you're still inside the src folder
cd ./src/

### Create TypeScript files for each component in  Mac & Linux 

```bash
touch components/Ads/Ads.tsx
touch components/auth/RegisterForm/RegisterForm.tsx
touch components/auth/SignInForm/SignInForm.tsx
touch components/Cart/CartItem/CartItem.tsx
touch components/Cart/CheckOut/CheckOut.tsx
touch components/Cart/ShoppingCart/ShoppingCart.tsx
touch components/Categories/CategoriesCarousel/CategoriesCarousel.tsx
touch components/Categories/CategoryList/CategoryList.tsx
touch components/ErrorBoundary/ErrorBoundary.tsx
touch components/Footer/Footer.tsx
touch components/Header/Header.tsx
touch components/Loading/Loading.tsx
touch components/Nav/Nav.tsx
touch components/NotificationCard/NotificationCard.tsx
touch components/Product/ProductDetail/ProductDetail.tsx
touch components/Product/ProductList/ProductList.tsx
touch components/Product/TrendingProducts/TrendingProducts.tsx
touch components/Profile/Business/BusinessProfile.tsx
touch components/Profile/User/UserProfile.tsx
touch components/SearchBar/SearchBar.tsx
touch components/Sell/Sell.tsx
touch components/SurveyForm/SurveyForm.tsx
```

### Create SCSS files for each component in Mac and Linux 

```bash

touch components/Ads/Ads.scss
touch components/auth/RegisterForm/RegisterForm.scss
touch components/auth/SignInForm/SignInForm.scss
touch components/Cart/CartItem/CartItem.scss
touch components/Cart/CheckOut/CheckOut.scss
touch components/Cart/ShoppingCart/ShoppingCart.scss
touch components/Categories/CategoriesCarousel/CategoriesCarousel.scss
touch components/Categories/CategoryList/CategoryList.scss
touch components/ErrorBoundary/ErrorBoundary.scss
touch components/Footer/Footer.scss
touch components/Header/Header.scss
touch components/Loading/Loading.scss
touch components/Nav/Nav.scss
touch components/NotificationCard/NotificationCard.scss
touch components/Product/ProductDetail/ProductDetail.scss
touch components/Product/ProductList/ProductList.scss
touch components/Product/TrendingProducts/TrendingProducts.scss
touch components/Profile/Business/BusinessProfile.scss
touch components/Profile/User/UserProfile.scss
touch components/SearchBar/SearchBar.scss
touch components/Sell/Sell.scss
touch components/SurveyForm/SurveyForm.scss
```


### Create the Context Directory Structure

To create the directory structure for your context files, execute the following command:

```bash
# Go into the src folder
cd ./src/

# Create context directory
mkdir -p context
```

### Create TypeScript Files for Context on Windows

To create the TypeScript (`.tsx`) files for your context, execute the following commands:

```bash
# Make sure you're still inside the src folder
cd ./src/

# Create TypeScript files for each context
echo "" > context/AuthContext.tsx
echo "" > context/CategoryContext.tsx
echo "" > context/ProductContext.tsx
echo "" > context/ShoppingCartContext.tsx
```

### Create TypeScript Files for Context on Mac & Linux

To create the TypeScript (`.tsx`) files for your context, execute the following commands:

```bash
# Make sure you're still inside the src folder
cd ./src/

# Create TypeScript files for each context
touch context/AuthContext.tsx
touch context/CategoryContext.tsx
touch context/ProductContext.tsx
touch context/ShoppingCartContext.tsx
```

### Create the Services Directory Structure

To create the directory structure for your services files, execute the following command:

```bash
# Go into the src folder
cd ./src/

# Create services directory
mkdir -p services
```

### Create TypeScript Files for Services on Windows

To create the TypeScript (`.tsx`) files for your services, execute the following commands:

```bash
# Make sure you're still inside the src folder
cd ./src/

# Create TypeScript files for each service
echo "" > services/authService.tsx
echo "" > services/categoryService.tsx
echo "" > services/productService.tsx
```

### Create TypeScript Files for Services on Mac & Linux

To create the TypeScript (`.tsx`) files for your services, execute the following commands:

```bash
# Make sure you're still inside the src folder
cd ./src/

# Create TypeScript files for each service
touch services/authService.tsx
touch services/categoryService.tsx
touch services/productService.tsx
```

### Create the Utilities Directory Structure

To create the directory structure for your utility files, execute the following command:

```bash
# Go into the src folder
cd ./src/

# Create utilities directory
mkdir -p utilities
```

### Create TypeScript Files for Utilities on Windows

To create the TypeScript (`.tsx`) files for your utilities, execute the following commands:

```bash
# Make sure you're still inside the src folder
cd ./src/

# Create TypeScript files for each utility
echo "" > utilities/constants.tsx
echo "" > utilities/currencyFormatter.tsx
```

### Create TypeScript Files for Utilities on Mac & Linux

To create the TypeScript (`.tsx`) files for your utilities, execute the following commands:

```bash
# Make sure you're still inside the src folder
cd ./src/

# Create TypeScript files for each utility
touch utilities/constants.tsx
touch utilities/currencyFormatter.tsx
```

### Create the Models Directory Structure

To create the directory structure for your model files, execute the following command:

```bash
# Go into the src folder
cd ./src/

# Create models directory
mkdir -p models
```

### Create TypeScript Files for Models on Windows

To create the TypeScript (`.ts`) files for your models, execute the following commands:

```bash
# Make sure you're still inside the src folder
cd ./src/

# Create TypeScript files for each model
echo "" > models/business.ts
echo "" > models/cartitem.ts
echo "" > models/category.ts
echo "" > models/product.ts
echo "" > models/updateduser.ts
echo "" > models/user.ts
```

### Create TypeScript Files for Models on Mac & Linux

To create the TypeScript (`.ts`) files for your models, execute the following commands:

```bash
# Make sure you're still inside the src folder
cd ./src/

# Create TypeScript files for each model
touch models/business.ts
touch models/cartitem.ts
touch models/category.ts
touch models/product.ts
touch models/updateduser.ts
touch models/user.ts
```

This will create the necessary directory structure and empty TypeScript files for your context, services, utilities, and models in the React project.
---







## Server (Node.js & Express.js)

### Project Structure

```

├── server
│   ├── backup // this is not usually included in a mvc project this is just a backup of the MongoDB Json.
│   │   ├── categoryData.json // can be imported into mongodb directlty as mockdata
│   │   ├── productData.json // can be imported into mongodb directlty as mockdata
│   ├── controllers
│   │   ├── authController.js
│   │   ├── categoryController.js
│   │   ├── productController.js
│   ├── middleware
│   │   ├── corsMiddleware.js
│   │   ├── verifyToken.js // JWT Auth Token verification.
│   ├── models
│   │   ├── businessModel.js 
│   │   ├── User.js
│   │   ├── User.js
│   │   ├── User.js
│   ├── routes
│   │   ├── authRoutes.js
│   │   ├── categoryRoutes.js
│   │   ├── productRoutes.js
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


### Dependencies

```json
{
  "name": "server",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "start": "node index.js",
  "dependencies": {
    "bcrypt": "^5.1.1",
    "body-parser": "^1.20.2",
    "cloudinary": "^1.41.1",
    "cors": "^2.8.5",
    "crypto": "^1.0.1",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "express-rate-limit": "^7.2.0",
    "helmet": "^7.1.0",
    "jsonwebtoken": "^9.0.2",
    "mongodb": "^6.3.0",
    "mongoose": "^8.0.3",
    "multer": "^1.4.5-lts.1",
    "node-fetch": "^3.3.2"
  }
}

```

