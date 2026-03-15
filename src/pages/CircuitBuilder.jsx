import React, { useState, useEffect } from "react";
import "./CircuitBuilder.css";

function CircuitBuilder() {

  const [components, setComponents] = useState([]);
  const [voltage, setVoltage] = useState(5);
  const [logicText, setLogicText] = useState("");

  const resistance = 10;

  const current = (voltage / resistance).toFixed(2);

  const addComponent = (type) => {
    setComponents([...components, type]);
  };

  const bulbBrightness = Math.min(1, voltage / 10);

  // Update textarea logic
  useEffect(() => {
    const text = `
Circuit Components: ${components.join(", ") || "None"}

Voltage: ${voltage} V
Resistance: ${resistance} Ω
Current: ${current} A

Ohm's Law:
Current = Voltage / Resistance

Bulb brightness increases when voltage increases.
`;
    setLogicText(text);
  }, [components, voltage, current]);

  return (

    <div className="container">

      <h1 className="title">Circuit Builder (Ohm’s Law)</h1>

      <h2 className="section-title">Add Components</h2>

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

      <h2 className="section-title">Circuit Logic</h2>

      <textarea
        className="logic-textarea"
        value={logicText}
        onChange={(e) => setLogicText(e.target.value)}
        rows="8"
      />

    </div>

  );
}

export default CircuitBuilder;