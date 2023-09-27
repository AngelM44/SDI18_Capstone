import React from "react";
import "./Footer.css";
import logo from "./logo.png";
import CodeToad from "./code_toad_logo.png";

const Footer = () => {
  return (
    <div className="footer">
      <div className="left-section">
        <img src={logo} alt="MyFitConnect Logo" className="footer-logo" />
        <span className="logo-text">MyFitConnect</span>
      </div>

      <div className="center-column">
        <a
          href="https://www.21fss.com/about/fitness-center/"
          target="_blank"
          rel="noopener noreferrer"
          className="center-column-link"
        >
          Peterson Space Force Base Fitness
        </a>
      </div>

      <div className="right-section">
        <span className="copyright">© 2023 Code Toad Development</span>
        <img src={CodeToad} alt="Code Toad" className="code-toad" />
      </div>
    </div>
  );
};

export default Footer;
