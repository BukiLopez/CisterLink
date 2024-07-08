// src/App.js
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './Components/Footer';
import Header from './Components/Header';
import Main from './Components/Main';
import Tinaco from './Components/Tinaco';
import Ph from './Components/Ph';
import Turbidez from './Components/Turbidez';

function App() {
  return (
    <Router>
      <div className='body'>
        <Header />

        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/tinaco" element={<Tinaco />} />
          <Route path="/ph" element={<Ph />} />
          <Route path="/turbidez" element={<Turbidez />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
