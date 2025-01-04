import React, { useState } from "react";
import axios from "axios";
import "./SignUp.css";

function SignUp() {
  const [formData, setFormData] = useState({
    firstname: "",
    middlename: "",
    lastname: "",
    username: "",
    password: "",
    type: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8086/signUp", formData);
      alert("Sign Up Successful: " + response.data.message);
    } catch (error) {
      console.error("Sign Up failed:", error.response?.data || error);
      alert("Error during sign-up: " + (error.response?.data?.error || "Unknown error"));
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name</label>
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Middle Name (Optional)</label>
          <input
            type="text"
            name="middlename"
            value={formData.middlename}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>User Type</label>
          <select name="type" value={formData.type} onChange={handleChange} required>
            <option value={0}>User</option>
            <option value={1}>Admin</option>
          </select>
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
