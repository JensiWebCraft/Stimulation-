import React, { useState } from "react";
import "./PulleySimulation.css";

function PulleySimulation() {

  const [pulleys, setPulleys] = useState(1);
  const [weight, setWeight] = useState(100);

  const effort = (weight / pulleys).toFixed(2);

  return (

    <div className="container">

      <h1 className="title">Pulley & Force Lab</h1>

      <h2 className="section-title">Select Pulley System</h2>

      <select
        className="select-box"
        value={pulleys}
        onChange={(e) => setPulleys(Number(e.target.value))}
      >
        <option value={1}>1 Pulley</option>
        <option value={2}>2 Pulleys</option>
        <option value={4}>4 Pulleys</option>
      </select>

      <h2 className="section-title">Weight of Object</h2>

      <input
        className="slider"
        type="range"
        min="50"
        max="500"
        value={weight}
        onChange={(e) => setWeight(Number(e.target.value))}
      />

      <p className="weight-text">Weight: {weight} N</p>

      <div className="results">

        <h2>Results</h2>

        <p>Number of Pulleys: {pulleys}</p>

        <p>Effort Force Required: {effort} N</p>

      </div>

      <div className="force-meter">

        <h3>Live Force Meter</h3>

        <p>Load: {weight} N</p>

        <p>Effort: {effort} N</p>

      </div>

    </div>

  );
}

export default PulleySimulation;