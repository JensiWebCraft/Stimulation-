import React, { useRef, useState } from "react";
import "./ProjectileSimulation.css";

function ProjectileSimulation() {
  const canvasRef = useRef(null);
  const [angle, setAngle] = useState(45);
  const [velocity, setVelocity] = useState(30);
  const [height, setHeight] = useState(null);
  const [range, setRange] = useState(null);

  const g = 9.8;

  const fireProjectile = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const rad = (angle * Math.PI) / 180;

    const vx = velocity * Math.cos(rad);
    const vy = velocity * Math.sin(rad);

    const maxHeight =
      (velocity * velocity * Math.sin(rad) * Math.sin(rad)) / (2 * g);

    const totalRange = (velocity * velocity * Math.sin(2 * rad)) / g;

    setHeight(maxHeight.toFixed(2));
    setRange(totalRange.toFixed(2));

    let t = 0;
    const scale = 5;

    const interval = setInterval(() => {
      const x = vx * t;
      const y = vy * t - 0.5 * g * t * t;

      if (y < 0) {
        clearInterval(interval);
        return;
      }

      const canvasX = x * scale;
      const canvasY = canvas.height - y * scale;

      ctx.setLineDash([4, 4]);
      ctx.lineTo(canvasX, canvasY);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(canvasX, canvasY, 5, 0, Math.PI * 2);
      ctx.fill();

      t += 0.1;
    }, 30);
  };

  return (
    <div className="container">
      <h1 className="title">Projectile Motion Simulation</h1>

      <div className="control-box">
        <label>Angle: {angle}°</label>
        <br />
        <input
          className="slider"
          type="range"
          min="0"
          max="90"
          value={angle}
          onChange={(e) => setAngle(Number(e.target.value))}
        />
      </div>

      <div className="control-box">
        <label>Velocity: {velocity} m/s</label>
        <br />
        <input
          className="slider"
          type="range"
          min="10"
          max="100"
          value={velocity}
          onChange={(e) => setVelocity(Number(e.target.value))}
        />
      </div>

      <button className="fire-btn" onClick={fireProjectile}>
        Fire
      </button>

      <div className="canvas-box">
        <canvas ref={canvasRef} width={600} height={300} className="canvas" />
      </div>

      {height && (
        <div className="result-box">
          <h3>Maximum Height (Vertex): {height} m</h3>
          <h3>Range (Roots): {range} m</h3>
        </div>
      )}
    </div>
  );
}

export default ProjectileSimulation;