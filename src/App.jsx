import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";

import ProjectileSimulation from "./pages/ProjectileSimulation";
import CellInspector from "./pages/CellInspector";
import ChemicalBalance from "./pages/ChemicalBalance";
import PulleySimulation from "./pages/PulleySimulation";
import TriangleMaker from "./pages/TriangleMaker";
import CircuitBuilder from "./pages/CircuitBuilder";
import StatesOfMatter from "./pages/StatesOfMatter";
import SolarSystem from "./pages/SolarSystem";
import LogicGateSandbox from "./pages/LogicGateSandbox";
import SupplyDemand from "./pages/SupplyDemand";

function App() {

return (

<BrowserRouter>

<Navbar/>

<Routes>

<Route path="/" element={<Home/>}/>

<Route path="/projectile" element={<ProjectileSimulation/>}/>
<Route path="/cell" element={<CellInspector/>}/>
<Route path="/chemical" element={<ChemicalBalance/>}/>
<Route path="/pulley" element={<PulleySimulation/>}/>
<Route path="/triangle" element={<TriangleMaker/>}/>
<Route path="/circuit" element={<CircuitBuilder/>}/>
<Route path="/states" element={<StatesOfMatter/>}/>
<Route path="/solar" element={<SolarSystem/>}/>
<Route path="/logic" element={<LogicGateSandbox/>}/>
<Route path="/market" element={<SupplyDemand/>}/>

</Routes>

</BrowserRouter>

)

}

export default App