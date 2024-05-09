import "./Nav.scss";
//import { FaRegBell } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NotificationModal } from "./NotificationModal/NotificationModal";
import { navItems, myEbayItems } from "../../../utilities/constants";
import {ShoppingCart} from "../../";
import { useBusinessAuth, useUserAuth } from "../../../context";

type NavProps = {
  total: number;
};

const Nav: React.FC<NavProps> = ({ total }) => {
  const navigate = useNavigate();
  const { businessToken, business, fetchBusinessInformation, logoutBusiness } =
    useBusinessAuth();
  const { userToken, user, logout, fetchUserInformation } = useUserAuth();

  console.log(businessToken, business);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isNotificationModalVisible, setIsNotificationModalVisible] =
    useState(false);
  // Debug
  //console.log(`user ====> ${JSON.stringify(user)} | business ====> ${JSON.stringify(business )}`);

  const [notificationCount, setNotificationCount] = useState(0); // Assuming you have a way to update the notification count

  if (notificationCount !== 0) {
    console.log(`setNotificationCount--->${setNotificationCount}`);
    console.log(`notificationCount--->${notificationCount}`);
  }

  const handleNotificationIconClick = () => {
    // Show/hide the notification modal
    setIsNotificationModalVisible(!isNotificationModalVisible);
  };

  const handleLogOut = () => {
    if (business) {
      localStorage.removeItem("business");
      localStorage.removeItem("business-token");
      logoutBusiness();
      alert(" Business has Logout successfully");

    } 
      if (user) {
        alert(" User has Logout successfully");

        localStorage.removeItem("user");
        localStorage.removeItem("user-token");
        logout();
      }
 

    else{
      logout();
      logoutBusiness();

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

    if (userToken) {
      // Check if user exists and is not a business
      fetchUserInformation(userToken);
    }

    if (businessToken) {
      fetchBusinessInformation(businessToken);
    }

    const logoutTimeout = setTimeout(() => {
      logout();
      alert("You have been logged out due to inactivity.");
      navigate(`/`);
    }, 3600 * 1000); // 1 hour in milliseconds
    return () => clearTimeout(logoutTimeout);
    // LEAVE IT EMPTY TO AVOID INFINITE LOOP
    // eslint-disable-next-line
  }, []);

  // Organizing Nav
  const AppNavRight = () => {
    return (
      <div className="app__nav-right">
        <ul>
          <li className="app__nav-rightItem">
            <a className="app__nav-rightItem" href="/sell" id="sellingButton">
              Sell
            </a>
          </li>
        </ul>
     
          {userToken || businessToken ? (
            <select
              defaultValue={"My Ebay"}
              className="app__nav-right-dropDown"
              id="MyEbay"
              title="NavigationMenuDropDown"
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
          ) : null}
   
          <a className="app__nav-rightItem" href="#notifications" onClick={handleNotificationIconClick} id="yourNotifications">
        🔔
            {notificationCount > 0 && (
              <span className="notification-count">{notificationCount}</span>
            )}
          </a>
        <div className="app__nav-rightItem">
          <ShoppingCart total={total} />
        </div>
      </div>
    );
  };

  const AppNavLeft = () => {
    return (
      <div className="app__nav-left">
        {userToken || businessToken ? (
          <select
            title="NavigationMenuCategories"
            id="categoriesDropDown"
            className="app__nav-dropdown"
            name="NavigationMenuCategories"
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
    );
  };

  return (
    <nav className={`app__nav ${mobileMenuOpen ? "mobile-menu-open" : ""}`}>
      <div className="app__nav-mobile-icon" onClick={handleMobileMenuToggle}>
        ☰
      </div>
      <ul
        className={`app__nav-items ${mobileMenuOpen ? "mobile-menu-open" : ""}`}
      >
        <AppNavLeft />

        {navItems.map((item, index) => (
          <li key={index}>
            <a href={item?.link} className="app__nav-item">
              {item?.title}
            </a>
          </li>
        ))}
        <button
          aria-label="OpenMobileMenu"
          className={`app__nav-close ${
            mobileMenuOpen ? "mobile-menu-open" : ""
          }`}
          onClick={handleMobileMenuToggle}
        >
          &times;
        </button>
        <AppNavRight />
        {isNotificationModalVisible && (
          <NotificationModal
            onClose={() => setIsNotificationModalVisible(false)}
          />
        )}
      </ul>
    </nav>
  );
};

export default Nav;
