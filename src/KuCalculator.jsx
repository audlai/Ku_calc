import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

function App() {
  const [Ms, setMs] = useState(75); // Saturation magnetization (kA/m)
  const [Meff, setMeff] = useState(0); // Effective magnetization (mT)
  const [Ku, setKu] = useState(null); // Result

  const calculateKu = () => {
    const mu0 = 4 * Math.PI * 1e-7; // T·m/A
    const Ms_T = Ms * 1e3; // Convert kA/m to A/m
    const Meff_T = (Meff * 1e-3) / mu0; // Convert mT to T
    const Ku_val = 0.5 * mu0 * Ms_T * (Ms_T - Meff_T); // Ku in J/m³
    setKu(Ku_val.toExponential(3)); // Display in scientific notation
  };

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

      <button
        onClick={calculateKu}
        style={{ padding: '0.5rem 1rem', marginBottom: '1rem' }}
      >
        Calculate Ku
      </button>

      {Ku && (
        <div>
          <strong>Ku:</strong> {Ku} J/m³
        </div>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('app')).render(<App />);
