import "./styles/RegisterNav.scss";
 
 const RegisterNav = () => {
    return (
      <div className="app__register-nav">
        <div className="app__register-nav-left">
          <a href="/">
            <img src="/ebaylogo.png" alt="ebaylogo" width={140} height={57} />
          </a>
        </div>
        <div className="app__register-nav-right">
          <a href="/survey">Tell us what you think</a>
        </div>
      </div>
    );
  };
  export default RegisterNav;