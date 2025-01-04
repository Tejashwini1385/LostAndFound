import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { FaSearch, FaRegListAlt, FaUserAlt, FaPlusCircle, FaInfoCircle } from 'react-icons/fa';
import './DashBoard.css';

function Dashboard() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch feedbacks when component is mounted
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch('http://localhost:8086/feedback-fetch');
        if (!response.ok) {
          throw new Error('Failed to fetch feedback');
        }
        const data = await response.json();
        console.log('Fetched feedback:', data);  // Add this line to inspect the data
        setFeedbacks(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching feedback:', error);
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);  // Empty dependency array ensures this runs once when the component mounts

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-heading">Welcome to the Lost and Found Portal</h1>

      {/* Dashboard Cards */}
      <Row className="dashboard-cards">
        <Col md={6}>
          <Card className="dashboard-card custom-card">
            <Card.Body>
              <FaSearch size={40} className="card-icon" />
              <Card.Title>Search Lost Items</Card.Title>
              <Card.Text>Search through the portal for items that are reported as lost.</Card.Text>
              <Button variant="primary" href="/search">Search</Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="dashboard-card custom-card">
            <Card.Body>
              <FaRegListAlt size={40} className="card-icon" />
              <Card.Title>Your Reported Items</Card.Title>
              <Card.Text>View all the items you have reported as lost or found.</Card.Text>
              <Button variant="secondary" href="/your-reports">View Reports</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="dashboard-cards">
        <Col md={6}>
          <Card className="dashboard-card custom-card">
            <Card.Body>
              <FaUserAlt size={40} className="card-icon" />
              <Card.Title>Your Profile</Card.Title>
              <Card.Text>Manage your personal information and settings.</Card.Text>
              <Button variant="info" href="/profile">Go to Profile</Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="dashboard-card custom-card">
            <Card.Body>
              <FaPlusCircle size={40} className="card-icon" />
              <Card.Title>Report a Lost Item</Card.Title>
              <Card.Text>Quickly report an item that you've lost and its details.</Card.Text>
              <Button variant="success" href="/report-lost-item">Report Lost</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="dashboard-cards">
        <Col md={6}>
          <Card className="dashboard-card custom-card">
            <Card.Body>
              <FaInfoCircle size={40} className="card-icon" />
              <Card.Title>Help and FAQs</Card.Title>
              <Card.Text>Get answers to common questions and learn how the portal works.</Card.Text>
              <Button variant="warning" href="/help">Learn More</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

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
                    <p className="user-name"><strong>User:</strong> {feedback.user_name}</p>
                    <p className="feedback-text"><strong>Feedback:</strong> {feedback.feedback_text}</p>
                    <p className="submitted-time" style={{ fontSize: '0.9em', color: '#555' }}>
                      Submitted on: {new Date(feedback.submitted_at).toLocaleString()}
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
    </div>
  );
}

export default Dashboard;
