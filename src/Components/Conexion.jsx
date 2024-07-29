// src/Components/Conexion.js
import { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

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

const app = initializeApp(firebaseConfig);

function Conexion({ type }) {
  const [data, setData] = useState([]);
  const db = getFirestore(app);

  async function fetchData() {
    try {
      const querySnapshot = await getDocs(collection(db, "Tinaco"));
      const fetchedData = querySnapshot.docs.map((doc) => {
        const docData = doc.data();
        switch (type) {
          case 'Tinaco':
            return { Llenado: docData.Llenado };
          case 'Ph':
            return { Ph: docData.Ph };
          case 'Turbidez':
            return { Calidad: docData.Calidad };
          default:
            return docData;
        }
      });
      setData(fetchedData);
    } catch (e) {
      console.error("Error fetching data: ", e);
    }
  }

  useEffect(() => {
    fetchData();
  }, [type]);

  return (
    <div className="main">
      <div>
        <h2>{type.toUpperCase()}</h2>
        <ul>
          {data.map((item, index) => (
            <li key={index}>
              {Object.entries(item).map(([key, value]) => (
                <span key={key}>{key}: {value} </span>
              ))}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Conexion;
