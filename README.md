# Ebay clone in MERN Stack

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

2. Back End 

Deploy to [cyclic](https://www.cyclic.sh/)


#### References

1. [MERN Stack Tutorial - mongodb](https://www.mongodb.com/languages/mern-stack-tutorial)
2. [react-icons](https://react-icons.github.io/)
3. [MERN Stack Project Structure: Best Practices - Kingsley Amankwah](https://dev.to/kingsley/mern-stack-project-structure-best-practices-2adk)
