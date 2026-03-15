import React, { useState } from "react";
import "./LogicGateSandbox.css";

function LogicGateSandbox() {

  const [A, setA] = useState(0);
  const [B, setB] = useState(0);
  const [gate, setGate] = useState("AND");

  const computeOutput = () => {

    if (gate === "AND") return A & B;
    if (gate === "OR") return A | B;
    if (gate === "NOT") return A ? 0 : 1;

    return 0;
  };

  const output = computeOutput();

  return (

    <div className="container">

      <h1 className="title">Binary Logic Gate Sandbox</h1>

      <h2>Inputs</h2>

      <div className="input-section">

        <button className="btn" onClick={() => setA(A ? 0 : 1)}>
          Switch A: {A}
        </button>

        <button className="btn" onClick={() => setB(B ? 0 : 1)}>
          Switch B: {B}
        </button>

      </div>

      <h2>Select Gate</h2>

      <select
        className="select-box"
        value={gate}
        onChange={(e) => setGate(e.target.value)}
      >
        <option value="AND">AND</option>
        <option value="OR">OR</option>
        <option value="NOT">NOT (A only)</option>
      </select>

      <h2 style={{ marginTop: "30px" }}>Circuit</h2>

      <div className="circuit-area">

        <div>
          <p>A</p>
          <div
            className="input-box"
            style={{ background: A ? "yellow" : "gray" }}
          />
        </div>

        <div
          className="wire"
          style={{ background: A ? "yellow" : "black" }}
        />

        <div className="gate-box">
          {gate}
        </div>

        <div
          className="wire"
          style={{ background: output ? "yellow" : "black" }}
        />

        <div
          className="bulb"
          style={{ color: output ? "yellow" : "gray" }}
        >
          💡
        </div>

      </div>

      <h2 className="output-text">
        Output: {output}
      </h2>

      <h3>Truth Table Example (AND)</h3>

      <table className="truth-table">

        <thead>
          <tr>
            <th>A</th>
            <th>B</th>
            <th>Output</th>
          </tr>
        </thead>

        <tbody>
          <tr><td>0</td><td>0</td><td>0</td></tr>
          <tr><td>0</td><td>1</td><td>0</td></tr>
          <tr><td>1</td><td>0</td><td>0</td></tr>
          <tr><td>1</td><td>1</td><td>1</td></tr>
        </tbody>

      </table>

    </div>

  );

}

export default LogicGateSandbox;