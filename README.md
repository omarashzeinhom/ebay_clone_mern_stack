# Ebay clone in MERN Stack

The eBay clone in MERN Stack is a web application that replicates the core functionalities of the eBay platform using the MERN (MongoDB, Express.js, React, Node.js) technology stack. This clone allows users to buy and sell products in an online marketplace environment. It incorporates features such as user authentication, product listings, bidding or purchasing capabilities, and seller profiles. Utilizing the power of MERN, the application provides a responsive and dynamic user interface, real-time updates, and seamless interactions for a user-friendly online shopping experience reminiscent of eBay.

- [Demo](https://ebayclonemern.netlify.app/)

- Built With
- [React Documentation](https://reactjs.org/)
- [Node.js Documentation](https://nodejs.org/)
- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [axios Documentation](https://axios-http.com/)
- [bcrypt Documentation](https://www.npmjs.com/package/bcrypt)
- [jsonwebtoken Documentation](https://www.npmjs.com/package/jsonwebtoken)

- **React Router - `useNavigate`:**
  - [React Router `useNavigate` documentation](https://reactrouter.com/web/api/useNavigate)
- **React Swiper:**
  - [Swiper documentation](https://swiperjs.com/react)
  - [Swiper Options](https://swiperjs.com/swiper-api#parameters)
  - [Swiper Modules](https://swiperjs.com/swiper-api/modules)
- **React Context API:**
  - [React Context documentation](https://reactjs.org/docs/context.html)
- **Sass:**
  - [Sass documentation](https://sass-lang.com/documentation)

## Start By

- Frontend
  `yarn start`

- Backend
  `node index.js`

- Make sure to change the username and password for your MongoDB ATLAS_URI

```bash
ATLAS_URI=mongodb+srv://<username>:<password>@cluster0.vr0db7g.mongodb.net/?retryWrites=true&w=majority

```

- Add jwt secret using crypto

```bash
JWT_SECRET=
```

### Deploy

1. Front End

```bash
yarn build
```

- Then Deploy Static File to [netlify](https://app.netlify.com/)

Replace links

```bash
// Production
// https://ebayclonemern.netlify.app/
- const productLink = `https://ebayclonemern.netlify.app/item/${product?._id}`;
- const productLink = `https://ebayclonemern.netlify.app/item/${product?._id}`;
- "http://localhost:3000/" // For Development
// Backend API
- "https://uptight-hen-fez.cyclic.app/" // For Production
- "http://localhost:3001/" // For Development
```

2. Back End

Deploy to [cyclic](https://www.cyclic.sh/)

#### References

- [MERN Stack Tutorial - MongoDB](https://www.mongodb.com/languages/mern-stack-tutorial)
- [react-icons Documentation](https://react-icons.github.io/)
- [MERN Stack Project Structure: Best Practices - Kingsley Amankwah](https://dev.to/kingsley/mern-stack-project-structure-best-practices-2adk)
- [React Router DOM Documentation](https://reactrouter.com/web/guides/quick-start)
- [Swiper API Documentation](https://swiperjs.com/swiper-api)
- [React Documentation - React.FC](https://reactjs.org/docs/hooks-faq.html#should-i-use-function-component-or-class-component)
- [React Router DOM - useNavigate](https://reactrouter.com/web/api/Navigate)
- [Swiper Documentation - Swiper and Modules](https://swiperjs.com/react)
- [React Router Documentation](https://reactrouter.com/)
- [useParams Hook](https://reactrouter.com/web/api/Hooks/useparams)
- [React Context Documentation](https://reactjs.org/docs/context.html)
- [State Management in React](https://reactjs.org/docs/state-and-lifecycle.html)
- [Understanding Infinite Loops in React](https://reactjs.org/docs/hooks-effect.html#tip-optimizing-performance-by-skipping-effects)
- [Unsplash](https://unsplash.com/)
- [Pexels](https://www.pexels.com/)
- [React Icons Library](https://react-icons.github.io/react-icons/)
- [React](https://reactjs.org/)
- [React.useState()](https://reactjs.org/docs/hooks-state.html)
- [React Functional Components](https://reactjs.org/docs/components-and-props.html#function-and-class-components)
- [React Forms](https://reactjs.org/docs/forms.html)
- [React Conditional Rendering](https://reactjs.org/docs/conditional-rendering.html)
- [React Events](https://reactjs.org/docs/handling-events.html)
- [CSS Flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout)
- [CSS Transitions](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transitions)
- [DOM Warning: Password field is not contained in a form](https://goo.gl/9p2vKq)
- [React Documentation](https://reactjs.org/)
- [Node.js Documentation](https://nodejs.org/)
- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [axios Documentation](https://axios-http.com/)
- [bcrypt Documentation](https://www.npmjs.com/package/bcrypt)
- [jsonwebtoken Documentation](https://www.npmjs.com/package/jsonwebtoken)
- [React Router `useNavigate` documentation](https://reactrouter.com/web/api/useNavigate)
- [Swiper documentation](https://swiperjs.com/react)
- [Swiper Options](https://swiperjs.com/swiper-api#parameters)
- [Swiper Modules](https://swiperjs.com/swiper-api/modules)
- [React Context documentation](https://reactjs.org/docs/context.html)
- [Sass documentation](https://sass-lang.com/documentation)
