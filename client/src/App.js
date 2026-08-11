import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [countries, setCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/countries`)
      .then((res) => setCountries(res.data))
      .catch((err) => {
        console.error(err);
        setError("❌ Failed to load country data. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "2rem" }}>
        ⏳ Loading countries...
      </h2>
    );
  }

  if (error) {
    return (
      <h2 style={{ color: "red", textAlign: "center", marginTop: "2rem" }}>
        {error}
      </h2>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>🌍 Flag Explorer</h1>

      <input
        type="text"
        placeholder="Search countries..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{
          display: "block",
          margin: "20px auto",
          width: "320px",
          padding: "12px",
          fontSize: "16px",
          borderRadius: "8px",
          border: "1px solid #ccc",
        }}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))",
          gap: "20px",
        }}
      >
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country, index) => (
            <div
              key={country.name || index}
              style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "16px",
                textAlign: "center",
                boxShadow: "0 2px 8px rgba(0,0,0,.1)",
                background: "#fff",
              }}
            >
              {country.flagPng ? (
                <img
                  src={country.flagPng}
                  alt={country.name}
                  style={{
                    width: "120px",
                    height: "80px",
                    objectFit: "cover",
                    border: "1px solid #ddd",
                  }}
                />
              ) : (
                <p style={{ fontSize: "3rem" }}>{country.flag || "🏳️"}</p>
              )}

              <h3>{country.name}</h3>

              <p>
                <strong>Capital:</strong> {country.capital}
              </p>

              <p>
                <strong>Region:</strong> {country.region}
              </p>

              <p>
                <strong>Population:</strong>{" "}
                {country.population?.toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <h3
            style={{
              gridColumn: "1/-1",
              textAlign: "center",
            }}
          >
            No countries found.
          </h3>
        )}
      </div>
    </div>
  );
}

export default App;
