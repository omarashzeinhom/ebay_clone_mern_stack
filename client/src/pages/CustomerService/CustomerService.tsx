import React from "react";
import "./CustomerService.scss";
import { Nav } from "../../components";
import { useAuth } from "../../context/AuthContext";
import { commonIssues } from "../../utilities/constants";

type CustomerServiceProps = {
  total: number;
};

const CustomerServiceNav = () => {
  return (
    <div className="app__customerservice-nav">
      <a href="/">
        <img
          src="/ebaylogo.png"
          alt="ebaylogo"
          width={140}
          height={57}
          loading="lazy"
        />
      </a>
      <h2> Customer Service</h2>
    </div>
  );
};
const CustomerService: React.FC<CustomerServiceProps> = ({ total }) => {
  const { token, user, business } = useAuth();

  return (
    <>
      <Nav total={total} />
      <CustomerServiceNav />
      <div className="customer-service">
        <h2>How can we help you today?</h2>
        <div className="help-links">
          <a href="/survey">Get personalized help</a>
          <a href="/orders">See your recent orders</a>
        </div>

        {user || business || token ? (
          <></>
        ) : (
          <>
            <a href="/signin">
              <button className="app__customerservice-Btn">Sign in</button>
            </a>
            <p>
              Don't have an account? <a href="/register">Register now</a>
            </p>
          </>
        )}

        <div className="browse-help-articles">
          <h3>Browse Help Articles</h3>
          <ul>
            {commonIssues.map((issue, index) => {
              return (
                <li key={index}>
                  <a href="/survey">{issue?.name}</a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default CustomerService;
