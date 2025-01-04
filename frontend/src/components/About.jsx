import React from "react";
import "./About.css";

// Import images
import studentImage from "../assets/student1.jpg";
import staffImage from "../assets/staff1.jpg";
import communityImage from "../assets/campus1.jpg";

function About() {
  return (
    <div className="about-container">
      <div className="welcome-box">
        <h1>Welcome to the Lost and Found Portal</h1>
        <p>
          At KLE Technological University, we believe in fostering a supportive
          and connected campus community. Our Lost and Found Portal is a
          thoughtfully designed platform that helps students, faculty, and staff
          reunite with their misplaced belongings. Whether you’ve lost something
          or found an item that needs to be returned, we’re here to make the
          process simple, efficient, and hassle-free.
        </p>
      </div>
      <h2>Who Will Be Benefited?</h2>
      <div className="benefit-cards">
        <div className="card">
          <img src={studentImage} alt="Students" className="card-image" />
          <h3>Students</h3>
          <p>
            Students will easily find and return lost items like books,
            electronics, and personal belongings.
          </p>
        </div>
        <div className="card">
          <img src={staffImage} alt="Staff" className="card-image" />
          <h3>Staff</h3>
          <p>
            Staff members will have a quick way to report and search for lost
            items on campus.
          </p>
        </div>
        <div className="card">
          <img
            src={communityImage}
            alt="Campus Community"
            className="card-image"
          />
          <h3>Campus Community</h3>
          <p>
            The entire campus community will benefit by encouraging cooperation
            in returning lost items.
          </p>
        </div>
      </div>

      <h2>What Can You Do Here?</h2>
      <ul className="lists">
        <li>
          <strong>Report Lost Items:</strong> Share details about items you’ve
          lost, including descriptions, photos, and the location where they went
          missing.
        </li>
        <li>
          <strong>Post Found Items:</strong> If you’ve discovered an item on
          campus, you can post it here to help its owner locate it.
        </li>
        <li>
          <strong>Search by Category:</strong> Browse items by type—electronics,
          books, clothing, and more—making it easier to find what you’re looking
          for.
        </li>
        <li>
          <strong>Connect Directly:</strong> Contact the person who posted a
          found item or reach out to someone who might have found your lost
          possession.
        </li>
        <li>
          <strong>Get Admin Assistance:</strong> For feedback, inquiries, or
          help with verifying ownership, our admin team is just a message away.
        </li>
      </ul>
      <div className="commitment-box">
        <h2>Our Commitment</h2>
        <p>
          This portal is more than just a tool—it’s a way to build connections
          and strengthen our sense of community. By using the Lost and Found
          Portal, you contribute to a campus culture where helping each other is
          second nature.
        </p>
      </div>
    </div>
  );
}

export default About;