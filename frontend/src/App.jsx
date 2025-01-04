import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/login';
import About from './components/About';
import SignUp from './components/signUp';
import Dashboard from './components/DashBoard';
import Terms from './components/TermsAndConditions';
import Postitem from './components/PostItem';
import LostItem from './components/LostItems';
import FoundItem from './components/FoundItem';
import FeedBack from './components/FeedBack';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/terms" element={<Terms />} />
        {isLoggedIn && (
          <>
            <Route path="/about" element={<About />} />
            <Route path="/about" element={<About />} />
            <Route path="/Postitem" element={<Postitem />} />
            <Route path="/lostitem" element={<LostItem />} />
            <Route path="/founditem" element={<FoundItem />} />
            <Route path="/FeedBack" element={<FeedBack />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
