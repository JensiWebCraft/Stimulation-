import React, { useState } from "react";
import "./ChemicalBalance.css";

const molecules = {
  H2: { H: 2 },
  O2: { O: 2 },
  H2O: { H: 2, O: 1 }
};

function ChemicalBalance() {

  const [reactants, setReactants] = useState({ H2: 0, O2: 0 });
  const [products, setProducts] = useState({ H2O: 0 });

  const changeCount = (side, molecule, value) => {

    if (side === "reactants") {
      setReactants(prev => ({
        ...prev,
        [molecule]: Math.max(0, prev[molecule] + value)
      }));
    } else {
      setProducts(prev => ({
        ...prev,
        [molecule]: Math.max(0, prev[molecule] + value)
      }));
    }

  };

  const countAtoms = (sideData) => {

    const total = { H: 0, O: 0 };

    Object.keys(sideData).forEach(molecule => {

      const count = sideData[molecule];
      const atoms = molecules[molecule];

      Object.keys(atoms).forEach(atom => {
        total[atom] += atoms[atom] * count;
      });

    });

    return total;
  };

  const reactantAtoms = countAtoms(reactants);
  const productAtoms = countAtoms(products);

  const balanced =
    reactantAtoms.H === productAtoms.H &&
    reactantAtoms.O === productAtoms.O;

  return (

    <div className="container">

      <h1 className="title">Chemical Balance Scale</h1>

      <h2 className="section-title">Reactants</h2>

      {Object.keys(reactants).map(mol => (

        <div key={mol} className="molecule-row">

          <button className="btn" onClick={() => changeCount("reactants", mol, -1)}>−</button>

          {mol} : {reactants[mol]}

          <button className="btn" onClick={() => changeCount("reactants", mol, 1)}>+</button>

        </div>

      ))}

      <h2 className="section-title">Products</h2>

      {Object.keys(products).map(mol => (

        <div key={mol} className="molecule-row">

          <button className="btn" onClick={() => changeCount("products", mol, -1)}>−</button>

          {mol} : {products[mol]}

          <button className="btn" onClick={() => changeCount("products", mol, 1)}>+</button>

        </div>

      ))}

      <h2 className="section-title">Atom Count</h2>

      <div className="atom-count">
        <p>Reactants → H: {reactantAtoms.H} | O: {reactantAtoms.O}</p>
        <p>Products → H: {productAtoms.H} | O: {productAtoms.O}</p>
      </div>

      <div className={`balance-box ${balanced ? "balanced" : "not-balanced"}`}>
        {balanced ? "Balanced ⚖️" : "Not Balanced ⚖️"}
      </div>

    </div>

  );

}

export default ChemicalBalance;