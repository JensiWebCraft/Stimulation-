import React, { useState } from "react";
import "./SupplyDemand.css";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend);

function SupplyDemand() {

  const [demand, setDemand] = useState(50);
  const [supply, setSupply] = useState(50);

  const equilibriumPrice = ((demand / supply) * 100).toFixed(0);

  const data = {
    labels: ["Low", "Medium", "High"],
    datasets: [
      {
        label: "Demand Curve",
        data: [demand + 20, demand, demand - 20]
      },
      {
        label: "Supply Curve",
        data: [supply - 20, supply, supply + 20]
      }
    ]
  };

  return (

    <div className="container">

      <h1 className="title">Supply & Demand Market Simulator</h1>

      <h2 className="section-title">Consumer Interest (Demand)</h2>

      <input
        className="slider"
        type="range"
        min="10"
        max="100"
        value={demand}
        onChange={(e) => setDemand(Number(e.target.value))}
      />

      <p className="value-text">Demand Level: {demand}</p>

      <h2 className="section-title">Factory Production (Supply)</h2>

      <input
        className="slider"
        type="range"
        min="10"
        max="100"
        value={supply}
        onChange={(e) => setSupply(Number(e.target.value))}
      />

      <p className="value-text">Supply Level: {supply}</p>

      <div className="chart-container">
        <Line data={data} />
      </div>

      <h2 className="price">
        Product Price: ₹{equilibriumPrice}
      </h2>

      <div className="icon">
        🎮
      </div>

      <p className="info-text">
        If demand increases and supply decreases, price rises.
      </p>

    </div>

  );

}

export default SupplyDemand;