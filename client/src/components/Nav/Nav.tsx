import "./Nav.scss";
import { FaRegBell } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NotificationModal } from "./NotificationModal/NotificationModal";
import { useAuth } from "../../context/AuthContext";
import { navItems, myEbayItems } from "../../utilities/constants";
import ShoppingCart from "../Cart/ShoppingCart/ShoppingCart";

type NavProps = {
  total: number;
};

const Nav: React.FC<NavProps> = ({ total }) => {
  const navigate = useNavigate();
  const { token, user, logout, business, fetchUserInformation } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isNotificationModalVisible, setIsNotificationModalVisible] = useState(false);
  // Debug
  // console.log(`user ====> ${JSON.stringify(user)} | business ====> ${JSON.stringify(business )}`);

  const [notificationCount, setNotificationCount] = useState(0);  // Assuming you have a way to update the notification count
  
  
  const handleNotificationIconClick = () => {
    // Show/hide the notification modal
    setIsNotificationModalVisible(!isNotificationModalVisible);
  };




  const handleLogOut = () => {
    logout();
    localStorage.removeItem("business");
    localStorage.removeItem("user");
    if (user) {
      alert(" User has Logout successfully");
    } else {
      if (business) {
        alert(" Business has Logout successfully");
      }
    }
    navigate(`/`);
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleRoute = () => {
    if (user?.userId !== undefined) {
      navigate(`/user/${user?.userId}`);
    } else if (business?.businessId !== undefined) {
      navigate(`/business/${business?.businessId}`);
    } else {
      console.error("User and business have no ID");
    }
  };

  useEffect(() => {
    // DEBUG
    // console.log(`token in Nav.tsx ====> ${token}`);
    // console.log(`user in Nav.tsx ====> ${user}`);
    if (token) {
      fetchUserInformation(token);
    }
    // Causes Infinte loop error if the dependency is added
    // eslint-disable-next-line
  }, []);

  return (
    <nav className={`app__nav ${mobileMenuOpen ? "mobile-menu-open" : ""}`}>
      <div className="app__nav-mobile-icon" onClick={handleMobileMenuToggle}>
        ☰
      </div>
      <ul
        className={`app__nav-items ${mobileMenuOpen ? "mobile-menu-open" : ""}`}
      >
        <div className="app__nav-left">
          {token ? (
            <select
              id="categoriesDropDown"
              className="app__nav-dropdown"
              onChange={(e) => {
                if (e.target.value === "logout") {
                  handleLogOut();
                } else if (user?.userId) {
                  navigate(`/user/${user?.userId}`);
                } else if (business?.businessId) {
                  navigate(`/business/${business?.businessId}`);
                } else {
                  navigate(`/signin`);
                }
              }}
            >
              <option value="" className="app__nav-itemLeft">
                Hi,{" "}
                {user?.firstName ||
                  user?.email ||
                  business?.businessName ||
                  business?.businessEmail ||
                  "User"}
                !
              </option>
              <option onClick={handleRoute} className="app__nav-itemLeft">
                User Profile:{" "}
                {user?.firstName ||
                  user?.email ||
                  business?.businessName ||
                  business?.businessEmail ||
                  "User Profile"}
                !
              </option>
              <option value="logout" className="app__nav-itemLeft">
                Sign out
              </option>
            </select>
          ) : (
            <li>
              Hi!{" "}
              <a href="/signin" className="app__nav-item">
                Sign in
              </a>{" "}
              or <a href="/register">register</a>
            </li>
          )}
        </div>
        {navItems.map((item, index) => (
          <li key={index}>
            <a href={item?.link} className="app__nav-item">
              {item?.title}
            </a>
          </li>
        ))}
        <button
          className={`app__nav-close ${
            mobileMenuOpen ? "mobile-menu-open" : ""
          }`}
          onClick={handleMobileMenuToggle}
        >
          &times;
        </button>
        <div className="app__nav-right">
          <li className="app__nav-rightItem">
            <a className="app__nav-rightItem" href="/sell">
              Sell
            </a>
          </li>
          <li>
            <select
              defaultValue={"My Ebay"}
              className="app__nav-right-dropDown"
              id="MyEbay"
            >
              <option hidden className="app__nav-rightItem">
                My Ebay
              </option>
              {myEbayItems.map((ebayItem, index) => (
                <option
                  key={index}
                  id={ebayItem?.title}
                  className="app__nav-rightItem"
                >
                  {ebayItem?.title}
                </option>
              ))}
            </select>
          </li>
          <li className="app__nav-rightItem">
            <a href="#notifications" onClick={handleNotificationIconClick}>
              <FaRegBell className="app__nav-rightIcon" />
              {notificationCount > 0 && (
                <span className="notification-count">{notificationCount}</span>
              )}
            </a>
          </li>
          <li className="app__nav-rightItem">
            <ShoppingCart total={total} />
          </li>
        </div>
        {isNotificationModalVisible && <NotificationModal onClose={() => setIsNotificationModalVisible(false)} />}
      </ul>
    </nav>
  );
};

export default Nav;
