import React, { useState } from "react";
import "./CellInspector.css";

const animalOrganelles = [
  { name: "Nucleus", description: "Controls the activities of the cell." },
  { name: "Mitochondria", description: "Produces energy for the cell." },
  { name: "Cell Membrane", description: "Controls what enters and leaves the cell." }
];

const plantOrganelles = [
  { name: "Nucleus", description: "Controls the activities of the cell." },
  { name: "Mitochondria", description: "Produces energy for the cell." },
  { name: "Cell Wall", description: "Provides structure and protection." },
  { name: "Chloroplast", description: "Helps plants perform photosynthesis." }
];

function CellInspector() {
  const [mode, setMode] = useState("animal");
  const [hovered, setHovered] = useState(null);
  const [showDiff, setShowDiff] = useState(false);

  const data = mode === "animal" ? animalOrganelles : plantOrganelles;

  return (
    <div className="container">
      <h1 className="title">Interactive Cell Inspector</h1>

      <div className="toggle-buttons">
        <button onClick={() => setMode("animal")}>Animal Mode</button>
        <button onClick={() => setMode("plant")}>Plant Mode</button>
      </div>

      <button
        className="diff-btn"
        onClick={() => setShowDiff(!showDiff)}
      >
        Show Differences
      </button>

      <div className="organelles-container">
        {data.map((org, index) => {
          const highlight =
            showDiff &&
            (org.name === "Cell Wall" || org.name === "Chloroplast");

          return (
            <div
              key={index}
              className={`organelle-box ${highlight ? "highlight" : ""}`}
              onMouseEnter={() => setHovered(org)}
              onMouseLeave={() => setHovered(null)}
            >
              {org.name}
            </div>
          );
        })}
      </div>

      {hovered && (
        <div className="info-box">
          <h3>{hovered.name}</h3>
          <p>{hovered.description}</p>
        </div>
      )}
    </div>
  );
}

export default CellInspector;