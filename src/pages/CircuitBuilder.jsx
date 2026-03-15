import React, { useState, useEffect } from "react";
import "./CircuitBuilder.css";

function CircuitBuilder() {
  const [components, setComponents] = useState([]);
  const [voltage, setVoltage] = useState(5);
  const [logicText, setLogicText] = useState("");
  const [error, setError] = useState(""); // <-- error message

  const resistance = 10;
  const current = (voltage / resistance).toFixed(2);

  const addComponent = (type) => {
    let newError = "";

    if (type === "battery") {
      // Battery can be added anytime
      setComponents([...components, type]);
    } else if (type === "wire") {
      if (!components.includes("battery")) {
        newError = "Add a battery first before adding a wire!";
      } else {
        setComponents([...components, type]);
      }
    } else if (type === "bulb") {
      const batteryIndex = components.indexOf("battery");
      const wireIndex = components.indexOf("wire");

      if (batteryIndex === -1) {
        newError = "Add a battery first!";
      } else if (wireIndex === -1 || batteryIndex > wireIndex) {
        newError = "Add a wire connecting battery before adding the bulb!";
      } else {
        setComponents([...components, type]);
      }
    }

    setError(newError);
    // Clear error after 3 seconds
    if (newError) {
      setTimeout(() => setError(""), 3000);
    }
  };

  // Determine if bulb should glow based on correct order
  const isBulbOn = () => {
    const batteryIndex = components.indexOf("battery");
    const wireIndex = components.indexOf("wire");
    const bulbIndex = components.indexOf("bulb");
    return (
      batteryIndex !== -1 &&
      wireIndex !== -1 &&
      bulbIndex !== -1 &&
      batteryIndex < wireIndex &&
      wireIndex < bulbIndex
    );
  };

  const bulbBrightness = isBulbOn() ? Math.min(1, voltage / 10) : 0;

  // Update textarea logic
  useEffect(() => {
    const text = `
Circuit Components: ${components.join(", ") || "None"}

Voltage: ${voltage} V
Resistance: ${resistance} Ω
Current: ${current} A

Ohm's Law:
Current = Voltage / Resistance

Bulb brightness ${
      isBulbOn() ? "increases with voltage" : "is OFF (circuit incomplete or wrong order)"
    }.
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

      {error && <p className="error-message">{error}</p>}

      <h2 className="section-title">Circuit Area</h2>
      <div className="circuit-area">
        {components.map((comp, index) => {
          if (comp === "battery") return <div key={index} className="component">🔋</div>;
          if (comp === "wire") return <div key={index} className="component">〰️</div>;
          if (comp === "bulb") return (
            <div
              key={index}
              className="bulb"
              style={{ opacity: bulbBrightness }}
            >
              💡
            </div>
          );
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
        Bulb lights up only if battery → wire → bulb sequence is correct.
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