import { useEffect, useState } from "react";
import { FaRegBell } from "react-icons/fa";
import { TbShoppingCart } from "react-icons/tb";
import { navItems, myEbayItems } from "../../utils/constants";
import "./Nav.scss";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { authService } from "../../services/authService";
import { Business } from "../../models/business";

const Nav = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { token, user, logout } = useAuth();
  //console.log(business?.businessEmail);
  const [business, setBusiness] = useState<Business>();

  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogOut = () => {
    logout();
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  const handleUserRoute = () => {
    // Redirect to /user/${user?.userId} route
    navigate(`/user/${user?.userId}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (token) {
          // Check if business data is in localStorage
          const storedBusiness = localStorage.getItem("business");
          if (storedBusiness) {
            // If available, set it to the state
            setBusiness(JSON.parse(storedBusiness));
          } else {
            // If not, fetch the business information from the server
            const businessData = await authService.getBusiness(token);
            setBusiness(businessData);
            // Save business data to localStorage
            localStorage.setItem("business", JSON.stringify(businessData));
          }
        }
      } catch (error) {
        console.error(`Error fetching business data: ${error}`);
      }
    };

    fetchData();
  }, [token]);
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
                } else {
                  navigate(`/user/${user?.userId}`);
                }
              }}
            >
              <option value="">
                Hi,{" "}
                {business?.businessName ||
                  user?.firstName ||
                  business?.businessEmail ||
                  user?.email ||
                  " "}
                !
              </option>
              <option onClick={handleUserRoute}>
                {user?.userId?.slice(1, 7) || " "}!
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
            <a href="#shoppingcart">
              <TbShoppingCart className="app__nav-rightIcon" />
            </a>
          </li>
        </div>
      </ul>
    </nav>
  );
};

export default Nav;
