import React from 'react';
import './CustomerService.scss';
import {Nav} from "..";


const CustomerServiceNav = () => {
    return (
      <div className="app__customerservice-nav">
          <a href="/">
            <img src="/ebaylogo.png" alt="ebaylogo" width={140} height={57} />
          </a>
          <h2> Customer Service</h2>
        
      </div>
    );
 };
 const CustomerService: React.FC = () => {
    return (
      <>
        <Nav />
        <CustomerServiceNav />
        <div className="customer-service">
          <h2>How can we help you today?</h2>
          <div className="help-links">
            <a href="/">Get personalized help</a>
            <a href="/">See your recent orders</a>
          </div>
          <a href='/signin'>
          <button className='app__customerservice-Btn'>Sign in</button>
          </a>
          <p>
            Don't have an account? <a href="/register">Register now</a>
          </p>
          <div className="browse-help-articles">
            <h3>Browse Help Articles</h3>
            <ul>
              <li>
                <a href="/">Buying as a guest</a>
              </li>
              <li>
                <a href="/">Get help with an item that hasn't arrived</a>
              </li>
              <li>
                <a href="/">Get help with a hacked account</a>
              </li>
              <li>
                <a href="/">Get help if you bought as a guest</a>
              </li>
              <li>
                <a href="/">Creating an eBay account</a>
              </li>
            </ul>
          </div>
        </div>
      </>
    );
 };
  

export default CustomerService;