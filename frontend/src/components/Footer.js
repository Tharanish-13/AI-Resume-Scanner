import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Footer Logo */}
        <div className="footer-logo">AI Resume Scanner</div>

        {/* Footer Links */}
        <ul className="footer-links">
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Terms of Service</a></li>
          <li><a href="#">Contact</a></li>
        </ul>

        {/* Social Media Icons */}
        <div className="footer-social">
          <a href="#" className="social-icon"><FaFacebook /></a>
          <a href="#" className="social-icon"><FaTwitter /></a>
          <a href="#" className="social-icon"><FaLinkedin /></a>
        </div>
      </div>

      {/* Copyright Text */}
      <p className="footer-text">© 2025 AI Resume Scanner. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
