import React, { useRef, useEffect, useState } from "react";
import "./SolarSystem.css";

function SolarSystem() {

  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  const [speed, setSpeed] = useState(1);
  const [selected, setSelected] = useState(null);

  const planets = [
    { name: "Mercury", distance: 60, size: 4, speed: 4, km: "57M km" },
    { name: "Venus", distance: 90, size: 6, speed: 3, km: "108M km" },
    { name: "Earth", distance: 130, size: 6, speed: 2.5, km: "150M km" },
    { name: "Mars", distance: 170, size: 5, speed: 2, km: "228M km" }
  ];

  const angles = useRef(planets.map(() => Math.random() * Math.PI * 2));

  useEffect(() => {

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const animate = () => {

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Sun
      ctx.beginPath();
      ctx.arc(centerX, centerY, 15, 0, Math.PI * 2);
      ctx.fillStyle = "orange";
      ctx.fill();

      planets.forEach((planet, i) => {

        angles.current[i] += planet.speed * 0.01 * speed;

        const x = centerX + Math.cos(angles.current[i]) * planet.distance;
        const y = centerY + Math.sin(angles.current[i]) * planet.distance;

        // Orbit
        ctx.beginPath();
        ctx.arc(centerX, centerY, planet.distance, 0, Math.PI * 2);
        ctx.strokeStyle = "#ccc";
        ctx.stroke();

        // Planet
        ctx.beginPath();
        ctx.arc(x, y, planet.size, 0, Math.PI * 2);
        ctx.fillStyle = "blue";
        ctx.fill();

        planet.x = x;
        planet.y = y;

      });

      animationRef.current = requestAnimationFrame(animate);

    };

    animate();

    // Stop previous animation
    return () => cancelAnimationFrame(animationRef.current);

  }, [speed]);

  const handleClick = (e) => {

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    planets.forEach(p => {

      const d = Math.hypot(p.x - x, p.y - y);

      if (d < 10) {
        setSelected(p);
      }

    });

  };

  return (

    <div className="container">

      <h1 className="title">Solar System Scale Explorer</h1>

      <canvas
        ref={canvasRef}
        width={700}
        height={400}
        onClick={handleClick}
        className="canvas"
      />

      <h2>Time Warp</h2>

      <input
        type="range"
        min="1"
        max="10"
        value={speed}
        className="slider"
        onChange={(e) => setSpeed(Number(e.target.value))}
      />

      <p className="speed-text">
        Speed Multiplier: {speed}x
      </p>

      {selected && (

        <div className="planet-info">

          <h2>{selected.name}</h2>

          <p>Distance from Sun: {selected.km}</p>

          <p>
            Planets closer to the Sun orbit faster than those further away.
          </p>

        </div>

      )}

    </div>

  );

}

export default SolarSystem;