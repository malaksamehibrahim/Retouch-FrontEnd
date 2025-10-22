import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import JobOffers from './pages/JobOffers/JobOffers';
import Forms from './pages/Forms';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<JobOffers />} />
        <Route path="/forms" element={<Forms />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </Router>
  );
}

export default App;

