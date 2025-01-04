import React, { useState } from "react";
import "./FeedBack.css";

function Feedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [newFeedback, setNewFeedback] = useState("");

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    if (newFeedback.trim()) {
      const feedbackEntry = {
        user_id: 1, // Replace with actual user ID if available
        feedback_text: newFeedback,
      };

      try {
        const response = await fetch("http://localhost:8086/feedback", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(feedbackEntry),
        });

        if (response.ok) {
          const result = await response.json();
          console.log("Feedback submitted:", result);
          setFeedbacks([
            { id: result.feedbackId, text: newFeedback },
            ...feedbacks,
          ]);
          setNewFeedback("");
        } else {
          console.error("Failed to submit feedback");
        }
      } catch (error) {
        console.error("Error submitting feedback:", error);
      }
    }
  };

  return (
    <div className="feedback-container">
      <h1 className="feedback-heading">Feedback on Lost and Found Portal</h1>
      <p className="feedback-subheading">
        Share your experience with our platform. Your feedback is valuable!
      </p>

      <form onSubmit={handleFeedbackSubmit} className="feedback-form">
        <textarea
          value={newFeedback}
          onChange={(e) => setNewFeedback(e.target.value)}
          placeholder="Write your feedback here..."
          rows="4"
          className="feedback-textarea"
        ></textarea>
        <button type="submit" className="feedback-submit-button">
          Submit Feedback
        </button>
      </form>

      {/* <h2 className="feedback-list-heading">Feedback Received</h2> */}
      <ul className="feedback-list">
        {feedbacks.map((feedback) => (
          <li key={feedback.id} className="feedback-list-item">
            {feedback.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Feedback;