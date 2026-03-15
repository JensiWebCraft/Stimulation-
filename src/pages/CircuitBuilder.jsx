import React, { useState } from "react";
import "./CircuitBuilder.css";

function CircuitBuilder() {

  const [components, setComponents] = useState([]);
  const [voltage, setVoltage] = useState(5);

  const resistance = 10;

  const current = (voltage / resistance).toFixed(2);

  const addComponent = (type) => {
    setComponents([...components, type]);
  };

  const bulbBrightness = Math.min(1, voltage / 10);

  return (

    <div className="container">

      <h1 className="title">Circuit Builder (Ohm’s Law)</h1>

      <h2 className="section-title">Drag Components</h2>

      <div className="button-group">
        <button onClick={() => addComponent("battery")}>Battery</button>
        <button onClick={() => addComponent("wire")}>Wire</button>
        <button onClick={() => addComponent("bulb")}>Bulb</button>
      </div>

      <h2 className="section-title">Circuit Area</h2>

      <div className="circuit-area">

        {components.map((comp, index) => {

          if (comp === "battery") {
            return <div key={index} className="component">🔋</div>;
          }

          if (comp === "wire") {
            return <div key={index} className="component">〰️</div>;
          }

          if (comp === "bulb") {
            return (
              <div
                key={index}
                className="bulb"
                style={{ opacity: bulbBrightness }}
              >
                💡
              </div>
            );
          }

          return null;

        })}

      </div>

      <h2 className="section-title">Voltage Control</h2>

      <input
        className="slider"
        type="range"
        min="1"
        max="12"
        value={voltage}
        onChange={(e) => setVoltage(Number(e.target.value))}
      />

      <p className="info">Voltage: {voltage} V</p>

      <h3 className="info">Current: {current} A</h3>

      <p className="info">Resistance: {resistance} Ω</p>

      <p className="info">
        Bulb Brightness increases when voltage increases.
      </p>

    </div>

  );
}

export default CircuitBuilder;