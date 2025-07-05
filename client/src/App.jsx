import { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000')
      .then(res => res.text())
      .then(data => setMessage(data));
  }, []);

  return (
    <div style={{ textAlign: 'center', paddingTop: '3rem' }}>
      <h1>🍽️ CuisineQuest</h1>
      <p>{message || 'Loading...'}</p>
    </div>
  );
}

export default App;
