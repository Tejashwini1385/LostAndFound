import React from "react";
import "./TermsAndConditions.css";
import terms from '../assets/terms.jpg';

const TermsAndConditions = () => {
  return (
    <div id="terms-section" className="terms-section">
      <div className="terms-content-wrapper">
        {/* Image on the left */}
        <div className="terms-image">
          <img
            src={terms} // Use the imported image
            alt="Terms"
            className="terms-image-img"
          />
          <br></br>
        </div>

        {/* Terms and Conditions on the right */}
        <div className="terms-info">
          <div className="terms-content">
            <h3>Terms and Conditions</h3>
            <p>1. Users must ensure accurate details when reporting lost or found items.</p>
            <p>2. The portal is not responsible for fraudulent activities.</p>
            <p>3. Items reported as found must be handed over to authorities if not claimed within 30 days.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;