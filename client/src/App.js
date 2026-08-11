import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/countries`)
      .then((res) => {
        setCountries(res.data);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load countries.");
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <h2>Loading countries...</h2>;

  if (error) return <h2>{error}</h2>;

  return (
    <div className="container">
      <h1>🌍 Flag Explorer</h1>

      <input
        type="text"
        placeholder="Search country..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <div className="grid">
        {filteredCountries.map((country, index) => (
          <div className="card" key={index}>
            {country.flagPng ? (
              <img
                src={country.flagPng}
                alt={country.name}
                className="flag"
              />
            ) : (
              <div style={{ fontSize: "3rem" }}>
                {country.flag || "🏳️"}
              </div>
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
              {country.population.toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

