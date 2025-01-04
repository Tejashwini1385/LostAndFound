import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './Navbar.css';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate(); // Hook for programmatic navigation

  return (
    <nav className="navbar">
      <div className="logo">
        <img
          src="https://i.pinimg.com/originals/7a/78/82/7a788239d3bdc5e301db078ad4eb1d55.png"
          alt="Lost & Found Logo"
          className="logo-image"
        />
        <span>Lost & Found</span>
      </div>
      <div className="button-container">
        {/* Only show these buttons if the user is not logged in */}
        {!isLoggedIn ? (
          <>
            <button className="home-button" onClick={() => navigate("/")}>
              Home
            </button>
            <button className="home-button" onClick={() => navigate("/login")}>
              Login
            </button>
            <button className="home-button" onClick={() => navigate("/signup")}>
              Register
            </button>
            <button className="home-button" onClick={() => navigate("/terms")}>
              Terms and Conditions
            </button>
          </>
        ) : (
          // If the user is logged in, show only relevant buttons
          <>
            <button className="home-button" onClick={() => navigate("/about")}>
              About
            </button>
            <button className="home-button" onClick={() => navigate("/Postitem")}>
              Post Item
            </button>
            <button className="home-button" onClick={() => navigate("/lostitem")}>
              Lost Item
            </button>
            <button className="home-button" onClick={() => navigate("/founditem")}>
              Found Item
            </button>
            <button className="home-button" onClick={() => navigate("/FeedBack")}>
              FeedBack
            </button>
            <button className="home-button" onClick={() => {
              setIsLoggedIn(false);  // Set the login state to false when logging out
              navigate("/"); // Navigate to the login page
            }}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
