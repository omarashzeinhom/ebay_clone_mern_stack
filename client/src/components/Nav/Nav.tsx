import "./Nav.scss";
import { FaRegBell } from "react-icons/fa";
import { TbShoppingCart } from "react-icons/tb";
import { navItems, myEbayItems  } from "../../utils/constants";

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
          <li > Sell</li>
          <li > MyEbay</li>
          <li>
          <select name="MyeBay" id="myebay" className="app__nav-rightItem">
            {myEbayItems.map((ebayItem, index) => {
              return (
                <option key={index} id={ebayItem?.title} >
                {ebayItem?.title}
                </option>
              );
            })}
          </select>
          </li>
          
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

