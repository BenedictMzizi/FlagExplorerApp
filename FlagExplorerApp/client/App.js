import React, { useEffect, useState } from "react";

function App() {

  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then(res => res.json())
      .then(data =>
        setCountries(
          data.map(c => ({
            name: c.name?.common,
            flag: c.flag
          }))
        )
      );
  }, []);

 
  const filteredCountries = countries.filter(country =>
    country.name?.toLowerCase().includes(search.toLowerCase())
  );

  
  return (
    <div style={{ padding: "1rem" }}>

      <h2>Flag Explorer</h2>

      {/* SEARCH INPUT */}
      <input
        type="text"
        placeholder="Search country..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "1rem",
          borderRadius: "6px",
          border: "1px solid #ccc",
          fontSize: "16px"
        }}
      />

      {/* COUNTRY GRID */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1rem',
          padding: '1rem',
          maxHeight: '600px',
          overflowY: 'auto',
          border: '1px solid #ddd',
          borderRadius: '8px'
        }}
      >
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country, i) => (
            <div
              key={country.name || i}
              style={{
                border: '1px solid #ccc',
                padding: '1rem',
                borderRadius: '8px',
                textAlign: 'center'
              }}
            >
              <p style={{ fontSize: '3rem' }}>
                {country.flag || '🏳️'}
              </p>
              <p>{country.name || 'Unknown Country'}</p>
            </div>
          ))
        ) : (
          <p style={{
            gridColumn: '1 / -1',
            textAlign: 'center',
            fontStyle: 'italic'
          }}>
            No countries match your search.
          </p>
        )}
      </div>

    </div>
  );
}

export default App;
