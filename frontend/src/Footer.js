import React from "react";
import "./Footer.css";
import logo from "./logo.png";
import CodeToad from "./code_toad_logo.png";
import {
    FaGithubSquare,
    FaTwitter,
    FaLinkedin,
    FaInstagramSquare,
    FaYoutubeSquare,

} from "react-icons/fa";

import { EuiIcon } from "@elastic/eui";

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
                    <div className="link-with-icon">
                        <a href="https://www.google.com/maps/place/Peterson+Fitness+Center/@38.824485,-104.7064709,15z/data=!4m6!3m5!1s0x871347183e63e4e1:0xf973437828d7aa04!8m2!3d38.824485!4d-104.7064709!16s%2Fg%2F1260zqgn2?entry=ttu" target="_blank" rel="noopener noreferrer">
                            <EuiIcon className="icon-adjustment" color="secondary" type="mapMarker" size="xl" />
                        </a>
                        Peterson Space Force Base Fitness
                    </div>
                </a>
                <div className="social-icons">
                    <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
                        <FaGithubSquare className="icon" />
                    </a>
                    <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer">
                        <FaTwitter className="icon" />
                    </a>
                    <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">
                        <FaLinkedin className="icon" />
                    </a>
                    <a href="https://instagram.com/yourusername" target="_blank" rel="noopener noreferrer">
                        <FaInstagramSquare className="icon" />
                    </a>
                    <a href="https://youtube.com/channel/yourchannelID" target="_blank" rel="noopener noreferrer">
                        <FaYoutubeSquare className="icon" />
                    </a>
                </div>
            </div>

            <div className="right-section">
                <span className="copyright">© 2023 Code Toad Development</span>
                <img src={CodeToad} alt="Code Toad" className="code-toad" />
            </div>
        </div>
    );
};

export default Footer;
