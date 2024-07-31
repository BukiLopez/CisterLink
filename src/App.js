import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './Components/Footer';
import Header from './Components/Header';
import Main from './Components/Main';
import Conexion from './Components/Conexion';

function App() {
  return (
    <Router>
      <div className='body'>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/tinaco" element={<Conexion type="Tinaco" />} />
            <Route path="/ph" element={<Conexion type="Ph" />} />
            <Route path="/turbidez" element={<Conexion type="Turbidez" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
