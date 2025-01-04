import React, { useState, useEffect } from "react";
import "./Home.css";

import image1 from "../assets/image1.png";
import image2 from "../assets/image2.png";
import image3 from "../assets/image3.png";
import image4 from "../assets/image4.png";
import image5 from "../assets/image5.jpg";

function Home() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch feedbacks when component is mounted
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch("http://localhost:8086/feedback-fetch");
        if (!response.ok) {
          throw new Error("Failed to fetch feedback");
        }
        const data = await response.json();

        console.log("Fetched feedback:", data); // Add this line to inspect the data
        setFeedbacks(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching feedback:", error);
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  return (
    <div className="home-container">
      {/* Header Section */}
      <header className="header">
        <div className="Head">Lost and Found Portal</div>
        <img src={image1} alt="Report a Lost Item" className="center-image" />
        <p className="header-text">
          Lost something? Don’t worry, we’ve got you covered!
        </p>
      </header>

      {/* Report Lost Item Section */}
      <section className="section alternate">
        <div className="section-content left-align">
          <img
            src={image2}
            alt="Report a Lost Item"
            className="section-image"
          />
          <div className="text-content">
            <h2>Report a Lost Item</h2>
            <p>
              If you forget or lose an item of yours, you can post your case and
              other descriptions on this platform. It helps connect people to
              recover their lost items effectively.
            </p>
          </div>
        </div>
      </section>

      {/* List of Recent Lost Items Section */}
      <section className="section alternate">
        <div className="section-content right-align">
          <div className="text-content">
            <h2>List of Recent Lost Items</h2>
            <p>
              Browse the latest reports of recently lost items! You may be able
              to find your own belongings by checking this section.
            </p>
          </div>
          <img src={image3} alt="Recent Lost Items" className="section-image" />
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="section alternate">
        <div className="section-content left-align">
          <img
            src={image4}
            alt="Contact Information"
            className="section-image"
          />
          <div className="text-content">
            <h2>Contact Information for Lost and Found Services</h2>
            <p>
              We’ve included the phone numbers for our lost and found service
              and the inquiry desk, ensuring assistance is only a call away.
            </p>
          </div>
        </div>
      </section>

      {/* Recent Publications Section */}
      <section className="section alternate">
        <div className="section-content right-align">
          <div className="text-content">
            <h2>Feedback Form</h2>
            <p>
              If you have feedback or suggestions, you can share them through
              our feedback form. It helps us improve our services and ensures a
              better experience for everyone.
            </p>
          </div>
          <img src={image5} alt="Feedback Form" className="section-image" />
        </div>
      </section>

      {/* Feedback Section */}
      <div className="feedback-section">
        <h2>User Feedback</h2>
        {loading ? (
          <p>Loading feedback...</p>
        ) : (
          <div>
            {feedbacks.length > 0 ? (
              <ul className="feedback-list">
                {feedbacks.map((feedback, index) => (
                  <li key={index} className="feedback-card">
                    <p className="user-name">
                      <strong>User:</strong> {feedback.user_name}
                    </p>
                    <p className="feedback-text">
                      <strong>Feedback:</strong> {feedback.feedback_text}
                    </p>
                    <p
                      className="submitted-time"
                      style={{ fontSize: "0.9em", color: "#555" }}
                    >
                      Submitted on:{" "}
                      {new Date(feedback.submitted_at).toLocaleString()}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No feedback available at the moment.</p>
            )}
          </div>
        )}
      </div>

      {/* Footer Section */}
      <footer className="footer">
        <p>© 2025 Lost and Found Portal. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;