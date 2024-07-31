import { useState, useEffect, useCallback } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const firebaseConfig = {
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

  const fetchData = useCallback(async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Tinaco"));
      const fetchedData = querySnapshot.docs.map((doc) => doc.data());
      setData(fetchedData);
    } catch (e) {
      console.error("Error fetching data: ", e);
    }
  }, [db]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const getChartData = () => {
    const labels = data.map(doc => new Date(doc.timestamp?.toDate()).toLocaleDateString()); // Assuming timestamp is in your data
    const datasets = [];

    switch (type) {
      case 'Tinaco':
        datasets.push({
          label: 'Llenado',
          data: data.map(doc => doc.Llenado),
          backgroundColor: 'rgba(0, 0, 255, 0.5)', // Blue color
          borderColor: 'blue',
          borderWidth: 1,
        });
        break;
      case 'Ph':
        datasets.push({
          label: 'pH',
          data: data.map(doc => doc.Ph),
          backgroundColor: 'rgba(0, 255, 0, 0.5)', // Green color
          borderColor: 'green',
          borderWidth: 1,
        });
        break;
      case 'Turbidez':
        datasets.push({
          label: 'Calidad',
          data: data.map(doc => doc.Calidad),
          backgroundColor: 'rgba(255, 0, 0, 0.5)', // Red color
          borderColor: 'red',
          borderWidth: 1,
        });
        break;
      default:
        return {
          labels: [],
          datasets: []
        };
    }

    return {
      labels,
      datasets
    };
  };

  const getOptions = () => {
    let maxY = 0;
    switch (type) {
      case 'Tinaco':
        maxY = 120;
        break;
      case 'Ph':
        maxY = 14;
        break;
      case 'Turbidez':
        maxY = 6;
        break;
      default:
        maxY = 100; // Default max value
    }

    return {
      scales: {
        x: {
          beginAtZero: true,
          ticks: {
            autoSkip: true,
            maxRotation: 45,
            minRotation: 45
          }
        },
        y: {
          beginAtZero: true,
          max: maxY
        }
      },
      plugins: {
        legend: {
          display: true,
          position: 'top'
        },
        tooltip: {
          callbacks: {
            label: function(tooltipItem) {
              return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
            }
          }
        }
      },
      responsive: true,
      maintainAspectRatio: false
    };
  };

  return (
    <div className="main">
      <div style={{ position: 'relative', width: '80%', height: '400px' }}>
        <h2>{type.toUpperCase()}</h2>
        <Bar data={getChartData()} options={getOptions()} />
      </div>
    </div>
  );
}

export default Conexion;
