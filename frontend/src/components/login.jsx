import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./login.css";

function Login({ setIsLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:8086/login", {
        username,
        password,
      });

      if (response.data.message === "Login successful") {
        alert(response.data.message);
        setIsLoggedIn(true); // Set login state
        navigate("/about"); // Redirect to about page
      } else {
        alert(response.data.error || "Invalid login credentials.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert(error.response?.data?.error || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Enter your username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      <div className="register-link">
        <p>
          Not registered? <Link to="/signUp">Register here</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
