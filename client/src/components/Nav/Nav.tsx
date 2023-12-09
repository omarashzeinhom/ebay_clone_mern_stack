import "./Nav.scss";
import { FaRegBell } from "react-icons/fa";
import { TbShoppingCart } from "react-icons/tb";

export default function Nav() {
  return (
    <nav className="app__nav">
      <ul className="app__nav-items">
        <div className="app__nav-left">
          <li>
            Hi! <a href="/signin ">Sign in</a> or{" "}
            <a href="/register">register</a> Notification
          </li>
        </div>
        {navItems.map((item, index) => {
          return (
            <li key={index}>
              <a href={item?.link} className="app__nav-item">
                {item?.title}
              </a>
            </li>
          );
        })}
        <div className="app__nav-right">
          <li className="app__nav-rightItem"> Sell</li>
          <li> MyEbay</li>
          <select name="MyeBay" id="myebay" className="app__nav-rightItem">
            {myEbayItems.map((ebayItem, index) => {
              return (
                <option key={index} id={ebayItem?.title} >
                {ebayItem?.title}
                </option>
              );
            })}
          </select>
          <li className="app__nav-rightItem">
            <a href="#notifcations">
              <FaRegBell className="app__nav-rightIcon" />
            </a>
          </li>
          <li className="app__nav-rightItem">
            <a href="#shoppingcart">
              <TbShoppingCart className="app__nav-rightIcon" />
            </a>
          </li>
        </div>
      </ul>
    </nav>
  );
}

const navItems = [
  {
    title: "Daily Deals",
    link: "/dailydeals",
  },
  {
    title: "Gift Cards",
    link: "/giftcards",
  },
  {
    title: "Help & Contact",
    link: "/help&contact",
  },
];

const myEbayItems = [
  {
    title: "Summary",
    link: "#",
  },
  {
    title: "Recently Viewed",
    link: "#",
  },
  {
    title: "Bids/Offers",
    link: "#",
  },
  {
    title: " Watchlist",
    link: "#",
  },
  {
    title: "Purchase History",
    link: "#",
  },
  {
    title: "Buy Again",
    link: "#",
  },
  {
    title: "Selling",
    link: "#",
  },

  {
    title: "Saved Searches",
    link: "#",
  },
  {
    title: "My Garage",
    link: "#",
  },

  {
    title: "Messages",
    link: "#",
  },

  {
    title: "Collection beta",
    link: "#",
  },

  {
    title: "The eBay vault",
    link: "#",
  },
];
