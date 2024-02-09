// src/pages/index.js or your React component file
import { useState } from 'react';

export default function mintbutton() {
  const [status, setStatus] = useState('');

  const runScript = async () => {
    try {
      const response = await fetch('/api/mint-nft', {
        method: 'POST',
      });

      if (response.ok) {
        setStatus('Script execution initiated.');
      } else {
        const data = await response.json();
        setStatus(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus('Internal Server Error');
    }
  };

  return (
    <div>
      <button onClick={runScript}>Run Script</button>
      {status && <p>{status}</p>}
    </div>
  );
}
