import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import JobOffers from './pages/JobOffers/JobOffers';
import Forms from './pages/Forms';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<JobOffers />} />
        <Route path="/forms" element={<Forms />} />
      </Routes>
    </Router>
  );
}

export default App;

