// src/App.js
import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Footer from './Components/Footer';
import Header from './Components/Header';
import Main from './Components/Main';
import Conexion from './Components/Conexion';
import Login from './Components/Login';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { firebaseConfig } from './Components/Conexion'; // Importa la configuración desde Conexion.js
import { initializeApp } from 'firebase/app';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div className='body'>
        <Header />
        <Routes>
          <Route path="/" element={user ? <Main /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/tinaco" element={user ? <Conexion type="Tinaco" /> : <Navigate to="/login" />} />
          <Route path="/ph" element={user ? <Conexion type="Ph" /> : <Navigate to="/login" />} />
          <Route path="/turbidez" element={user ? <Conexion type="Turbidez" /> : <Navigate to="/login" />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;



