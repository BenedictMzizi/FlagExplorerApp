import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [countries, setCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/countries`)
      .then((res) => setCountries(res.data))
      .catch((err) => {
        console.error(err);
        setError('❌ Failed to load country data. Please try again later.');
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p style={{ textAlign: 'center', marginTop: '2rem' }}>⏳ Loading countries...</p>;
  }

  if (error) {
    return <p style={{ color: 'red', textAlign: 'center', marginTop: '2rem' }}>{error}</p>;
  }

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <input
        type="text"
        placeholder="Search countries..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{
          margin: '1rem auto',
          display: 'block',
          padding: '0.5rem 1rem',
          width: '300px',
          fontSize: '1rem',
          borderRadius: '8px',
          border: '1px solid #ccc'
        }}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem', padding: '1rem' }}>
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country, i) => (
            <div
              key={country.name || i}
              style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}
            >
              <p style={{ fontSize: '3rem' }}>{country.flag || '🏳️'}</p>
              <p>{country.name || 'Unknown Country'}</p>
            </div>
          ))
        ) : (
          <p style={{ gridColumn: '1 / -1', textAlign: 'center', fontStyle: 'italic' }}>
            No countries match your search.
          </p>
        )}
      </div>
    </>
  );
}

export default App;
