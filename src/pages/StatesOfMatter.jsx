import React, { useRef, useEffect, useState } from "react";
import "./StatesOfMatter.css";

function StatesOfMatter() {

  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  const [temperature, setTemperature] = useState(20);

  const particles = useRef([]);
  const particleCount = 40;

  // Create particles
  useEffect(() => {

    const canvas = canvasRef.current;
    particles.current = [];

    for (let i = 0; i < particleCount; i++) {
      particles.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: Math.random() - 0.5,
        vy: Math.random() - 0.5
      });
    }

  }, []);

  // Animation
  useEffect(() => {

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const animate = () => {

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const speed = temperature / 10;

      particles.current.forEach(p => {

        p.x += p.vx * speed;
        p.y += p.vy * speed;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = "blue";
        ctx.fill();

      });

      animationRef.current = requestAnimationFrame(animate);

    };

    animate();

    // cleanup old animation
    return () => cancelAnimationFrame(animationRef.current);

  }, [temperature]);

  // State detection
  let state = "Solid";

  if (temperature > 40 && temperature <= 70) state = "Liquid";
  if (temperature > 70) state = "Gas";

  return (

    <div className="container">

      <h1 className="title">States of Matter Simulation</h1>

      <canvas
        ref={canvasRef}
        width={600}
        height={300}
        className="canvas"
      />

      <h2 className="section-title">
        Temperature (Bunsen Burner)
      </h2>

      <input
        className="slider"
        type="range"
        min="10"
        max="100"
        value={temperature}
        onChange={(e) => setTemperature(Number(e.target.value))}
      />

      <p className="temp-text">Temperature: {temperature} °C</p>

      <h3 className="state-text">Current State: {state}</h3>

      <p className="info-text">
        Low temperature → particles packed (Solid) <br/>
        Medium temperature → particles slide (Liquid) <br/>
        High temperature → particles move fast (Gas)
      </p>

    </div>

  );

}

export default StatesOfMatter;