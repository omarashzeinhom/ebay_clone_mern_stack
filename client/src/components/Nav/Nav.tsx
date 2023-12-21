import "./Nav.scss";
import { FaRegBell } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { navItems, myEbayItems } from "../../utilities/constants";
import ShoppingCart from "../Cart/ShoppingCart/ShoppingCart";
type NavProps = {
  total: number;
};

const Nav: React.FC<NavProps> = ({ total }) => {
  const { token, user, logout, business,fetchUserInformation } = useAuth();
  //const [business, setBusiness] = useState<Business>();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // const { userId, businessId } = useParams();
  //console.log(userId, businessId);
  const navigate = useNavigate();

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


  useEffect(()=>{
    fetchUserInformation(`${token}`);
    console.log(user);
  },[])

  const userIdInfo = `${user?.firstName?.slice(0, 5)}${user?.userId?.slice(
    1,
    7
  )}`;
  const businessIdInfo = `${business?.businessName?.slice(
    0,
    5
  )}  ${business?.businessId?.slice(1, 10)}`;
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
              <option value="">
                Hi,{" "}
                {user?.firstName ||
                  user?.email ||
                  business?.businessName ||
                  business?.businessEmail ||
                  "User"}
                !
              </option>
              <option onClick={handleRoute}>
                {userIdInfo || businessIdInfo || "User"}!
              </option>
              <option value="logout">Sign out</option>
            </select>
          ) : (
            <li>
              Hi! <a href="/signin">Sign in</a> or{" "}
              <a href="/register">register</a>
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
            <a href="/sell">Sell</a>
          </li>
          <li>
            <select
              defaultValue={"My Ebay"}
              className="app__nav-right-dropDown"
              id="MyEbay"
            >
              <option hidden>My Ebay</option>
              {myEbayItems.map((ebayItem, index) => (
                <option key={index} id={ebayItem?.title}>
                  {ebayItem?.title}
                </option>
              ))}
            </select>
          </li>
          <li className="app__nav-rightItem">
            <a href="#notifications">
              <FaRegBell className="app__nav-rightIcon" />
            </a>
          </li>
          <li className="app__nav-rightItem">
            <ShoppingCart total={total} />
          </li>
        </div>
      </ul>
    </nav>
  );
};

export default Nav;
