import { RouteObject } from "react-router-dom";
import { SearchResults, Profile } from "../components";
import { Home, SignIn, Register, CustomerService, Bids, Survey, SellPage, NotFound, CheckOutPage } from "../pages";

const mainRoutes = (total: number): RouteObject[] => [
    /* <--- Main Routes Start --->  */
    {
      path: "/",
      element: <Home total={total} />,
    },
    {
      path: "/signin",
      element: <SignIn />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/help&contact",
      element: <CustomerService total={total} />,
    },
    {
      path: "/survey",
      element: <Survey />,
    },
    {
      path: "/search-results/:name", // Define the route for search results
      element: <SearchResults />,
    },
    {
      path: "/sell",
      element: <SellPage total={total} />,
    },
    {
      path: "/bids",
      element: <Bids pageTitle="Bids"/>,
    },
    {
      path: "*",
      element: <NotFound />,
    },

 /* <--- Auth & Profile Start  ---> */
 {
    path: "/",
    element: <Profile total={total} />,
  },
  {
    path: "/user/:userId",
    element: <Profile total={total} />,
  },
  {
    path: "/business/:businessId",
    element: <Profile total={total} />,
  },
  /* <--- Auth & Profile End  ---> */
 
  {
    path: "/checkout",
    element: <CheckOutPage total={total} pageTitle="CheckOut" />,
  },

]

const Routes = (total: number): RouteObject[] => [
    // Combine mainRoutes and other routes here
    ...mainRoutes(total),
    // Add other routes as needed
];

export default Routes;