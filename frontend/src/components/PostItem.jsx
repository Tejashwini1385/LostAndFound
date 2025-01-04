import React, { useState } from "react";
import axios from "axios";
import "./PostItem.css";

function PostItem() {
  const [formData, setFormData] = useState({
    fullname: "",
    title: "",
    description: "",
    contact: "",
    status: "",
    countryCode: "+91", // State to store selected country code
  });
  const [image, setImage] = useState(null); // State to hold the uploaded image file
  const [contactError, setContactError] = useState(""); // To track contact number validation error

  const validatePhoneNumber = (phone) => {
    const cleanedPhone = phone.replace(/[^\d]/g, ''); // Remove non-numeric characters

    if (cleanedPhone.length !== 10) {
      return false;
    }

    const startsWithValidDigit = /^[6-9]/.test(cleanedPhone);
    if (!startsWithValidDigit) {
      return false;
    }

    const commonPattern = /^(1234567890|1111111111|2222222222|3333333333|4444444444|5555555555)$/;
    if (commonPattern.test(cleanedPhone)) {
      return false;
    }

    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]); // Update the image state when a file is selected
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { contact, countryCode } = formData;
    // Validate phone number
    if (!validatePhoneNumber(contact)) {
      setContactError("Dear user, please provide a valid 10-digit phone number.");
      return;
    }
    setContactError(""); // Reset error if valid

    const formDataToSend = new FormData();
    formDataToSend.append("fullname", formData.fullname);
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("contact", `${countryCode}${contact}`); // Combine country code with the entered contact number
    formDataToSend.append("status", formData.status);

    if (image) {
      formDataToSend.append("image", image); // Include the image file
    }

    // Log formDataToSend before sending
    for (let pair of formDataToSend.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    try {
      const response = await axios.post("http://localhost:8086/post-an-item", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data", // Set the proper content type
        },
      });
      alert("Item posted successfully: " + response.data.message);
    } catch (error) {
      console.error("Error during posting:", error.response?.data || error);
      alert("Error during posting: " + (error.response?.data?.error || "Unknown error"));
    }
  };

  return (
    <div className="post-item-form">
      <h2>Post an Item</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name</label>
          <input
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />
        </div>
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter the title of the item"
            required
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the item"
            required
          />
        </div>
        <div>
          <label>Contact</label>
          <div className="contact-input">
            <select
              name="countryCode"
              value={formData.countryCode}
              onChange={handleChange}
              required
            >
              <option value="+91">+91 (India)</option>
              <option value="+1">+1 (USA)</option>
              <option value="+44">+44 (UK)</option>
              <option value="+61">+61 (Australia)</option>
              <option value="+49">+49 (Germany)</option>
              {/* Add more country codes as needed */}
            </select>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="Enter your 10-digit contact number"
              required
            />
          </div>
          {contactError && <p className="error-message">{contactError}</p>} {/* Display error message */}
        </div>
        <div>
          <label>Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="">Select Status</option>
            <option value="Lost">Lost</option>
            <option value="Found">Found</option>
          </select>
        </div>
        <div>
          <label>Image</label>
          <input
            type="file"
            name="image"
            onChange={handleFileChange} // Handle file input
            accept="image/*" // Restrict to image files
          />
        </div>
        <button type="submit">Post Item</button>
      </form>
    </div>
  );
}

export default PostItem;
