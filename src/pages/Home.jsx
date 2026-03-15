import { Link } from "react-router-dom";
import "./Home.css";

const simulations = [
  { title: "Projectile Motion", path: "/projectile" },
  { title: "Cell Inspector", path: "/cell" },
  { title: "Chemical Balance", path: "/chemical" },
  { title: "Pulley Lab", path: "/pulley" },
  { title: "Triangle Maker", path: "/triangle" },
  { title: "Circuit Builder", path: "/circuit" },
  { title: "States of Matter", path: "/states" },
  { title: "Solar System", path: "/solar" },
  { title: "Logic Gate Sandbox", path: "/logic" },
  { title: "Supply & Demand", path: "/market" }
];

function Home() {
  return (
    <div className="home">

      <h1>Science Simulation Lab</h1>
      <p>Explore interactive simulations for Physics, Chemistry, Math and Computer Science.</p>

      <div className="simulation-grid">

        {simulations.map((sim, index) => (
          <Link to={sim.path} key={index} className="card">

            <h3>{sim.title}</h3>
            <p>Open Simulation →</p>

          </Link>
        ))}

      </div>

    </div>
  );
}

export default Home;