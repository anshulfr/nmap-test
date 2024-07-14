import { useState } from 'react';

function App() {
  const [ip, setIp] = useState('');
  const [scanResult, setScanResult] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/scan', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ip }),
    });
    const result = await response.json();
    setScanResult(result.output);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Nmap Scan</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            placeholder="Enter IP address"
          />
          <button type="submit">Scan</button>
        </form>
        {scanResult && (
          <div>
            <h2>Scan Result:</h2>
            <pre>{scanResult}</pre>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
