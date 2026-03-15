import React, { useRef, useEffect, useState } from "react";
import "./TriangleMaker.css";

function TriangleMaker() {

  const canvasRef = useRef(null);

  const [points, setPoints] = useState([
    { x: 100, y: 200 },
    { x: 300, y: 80 },
    { x: 500, y: 200 }
  ]);

  const [dragIndex, setDragIndex] = useState(null);

  const distance = (p1, p2) =>
    Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);

  const classifyTriangle = () => {

    const a = distance(points[1], points[2]);
    const b = distance(points[0], points[2]);
    const c = distance(points[0], points[1]);

    if (Math.abs(a - b) < 5 && Math.abs(b - c) < 5) {
      return "Equilateral";
    }

    if (Math.abs(a - b) < 5 || Math.abs(b - c) < 5 || Math.abs(a - c) < 5) {
      return "Isosceles";
    }

    return "Scalene";
  };

  const getAngle = (A, B, C) => {
    const AB = distance(A, B);
    const BC = distance(B, C);
    const AC = distance(A, C);

    return Math.acos((AB ** 2 + BC ** 2 - AC ** 2) / (2 * AB * BC)) * 180 / Math.PI;
  };

  const angleA = getAngle(points[1], points[0], points[2]).toFixed(1);
  const angleB = getAngle(points[0], points[1], points[2]).toFixed(1);
  const angleC = getAngle(points[0], points[2], points[1]).toFixed(1);

  useEffect(() => {

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    ctx.lineTo(points[1].x, points[1].y);
    ctx.lineTo(points[2].x, points[2].y);
    ctx.closePath();

    ctx.strokeStyle = "black";
    ctx.stroke();

    points.forEach((p, i) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 8, 0, Math.PI * 2);
      ctx.fillStyle = "red";
      ctx.fill();

      ctx.fillStyle = "black";
      ctx.fillText(["A", "B", "C"][i], p.x + 10, p.y);
    });

  }, [points]);

  const handleMouseDown = (e) => {

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    points.forEach((p, i) => {
      if (Math.hypot(p.x - x, p.y - y) < 10) {
        setDragIndex(i);
      }
    });

  };

  const handleMouseMove = (e) => {

    if (dragIndex === null) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newPoints = [...points];
    newPoints[dragIndex] = { x, y };

    setPoints(newPoints);

  };

  const handleMouseUp = () => {
    setDragIndex(null);
  };

  return (

    <div className="container">

      <h1 className="title">Triangle Maker & Classifier</h1>

      <canvas
        ref={canvasRef}
        width={600}
        height={350}
        className="canvas"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />

      <div className="result-box">

        <h2>Triangle Type: {classifyTriangle()}</h2>

        <p>Angle A: {angleA}°</p>
        <p>Angle B: {angleB}°</p>
        <p>Angle C: {angleC}°</p>

        <h3 className="angle-sum">
          Angle Sum: {(Number(angleA) + Number(angleB) + Number(angleC)).toFixed(1)}°
        </h3>

      </div>

    </div>

  );

}

export default TriangleMaker;