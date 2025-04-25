import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

function App() {
  const [Ms, setMs] = useState(75); // kA/m
  const [Meff, setMeff] = useState(0); // mT
  const [Ku, setKu] = useState(null); // J/m³

  useEffect(() => {
    const mu0 = 4 * Math.PI * 1e-7;
    const Ms_T = Ms * 1e3;
    const Meff_T = Meff * 1e-3/mu0;
    const Ku_val = 0.5 * mu0 * Ms_T * (Ms_T - Meff_T);
    setKu(Ku_val.toExponential(3));
  }, [Ms, Meff]); // ← Run this code whenever Ms or Meff changes

  return (
    <div
      style={{
        maxWidth: '400px',
        margin: '2rem auto',
        fontFamily: 'sans-serif',
      }}
    >
      <h2>Ku Calculator</h2>

      <label>Ms (kA/m):</label>
      <input
        type="number"
        value={Ms}
        onChange={(e) => setMs(parseFloat(e.target.value))}
        style={{ width: '100%', marginBottom: '1rem' }}
      />

      <label>Meff (mT):</label>
      <input
        type="number"
        value={Meff}
        onChange={(e) => setMeff(parseFloat(e.target.value))}
        style={{ width: '100%', marginBottom: '1rem' }}
      />

      <div>
        <strong>Ku:</strong> {Ku} J/m³
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('app')).render(<App />);
