// src/Components/Login.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { firebaseConfig } from './Conexion'; // Importa la configuración desde Conexion.js
import { initializeApp } from 'firebase/app';
import './Login.css'; // Importa el archivo de estilos

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const Login = () => {
  const navigate = useNavigate();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result.user);
        navigate('/');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="login-container">
      <h1>Bienvenido a Cisterlink®</h1>
      <button className="login-button" onClick={signInWithGoogle}>Sign in with Google</button>
    </div>
  );
};

export default Login;



