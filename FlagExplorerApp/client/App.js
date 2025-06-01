import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(process.env.REACT_APP_API_URL + '/countries')
      .then(res => setCountries(res.data))
      .catch(err => {
        console.error(err);
        setError(' Failed to load country data. Please try again later.');
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p style={{ textAlign: 'center', marginTop: '2rem' }}> ...Loading countries...</p>;
  }

  if (error) {
    return <p style={{ color: 'red', textAlign: 'center', marginTop: '2rem' }}>{error}</p>;
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem', padding: '1rem' }}>
      {countries.map((country, i) => (
        <div key={country.name || i} style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
          <p style={{ fontSize: '3rem' }}>{country.flag || '🏳️'}</p>
          <p>{country.name || 'Unknown Country'}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
