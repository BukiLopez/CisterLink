// import './Enc.css';
import { useState, useEffect } from 'react';
import Header from './Header';
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection,getDocs } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDd9VdJxXER-u4YLFFfyWJ8EutvTDOWuJU",
    authDomain: "cisterlink.firebaseapp.com",
    databaseURL: "https://cisterlink-default-rtdb.firebaseio.com",
    projectId: "cisterlink",
    storageBucket: "cisterlink.appspot.com",
    messagingSenderId: "672465650769",
    appId: "1:672465650769:web:0ea1bcf1de59ddf41f2470",
    measurementId: "G-2ZK3JCZ4HZ"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);

function Main() {

  const [valor, setValor] = useState("");
  const [tinacos, setTinaco] = useState([]);
  const db = getFirestore(app);
  async function Leer(){
    try {
      const querySnapshot = await getDocs(collection(db, "Tinaco"));
      const data = querySnapshot.docs.map((doc) => doc.data());
      setTinaco(data);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  useEffect(() => {
    Leer();
  }, []);
  return (
    <div className="main">
        <div>
          <h2>TINACO</h2>
          <ul>
            {tinacos.map((tinaco, index) => (
              <li key={index}>Calidad: {tinaco.Calidad} Llenado {tinaco.Llenado}%  PH: {tinaco.Ph}</li>
            ))}
          </ul>
        </div>
    </div>
  );
}
