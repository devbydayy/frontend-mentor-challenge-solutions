import React, { useEffect, useState } from "react";
import CountryCard from "./CountryCard";

export default function CountryList() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(
  "https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,cca3"
)
  .then((res) => {
    if (!res.ok) throw new Error(`Failed to fetch countries: ${res.status}`);
    return res.json();
  })
  .then((data) => {
    if (Array.isArray(data)) setCountries(data);
    else setCountries([]);
    setLoading(false);
  })
  .catch((err) => {
    console.error(err);
    setError(err.message);
    setCountries([]);
    setLoading(false);
  });
  }, []);

  const filtered = Array.isArray(countries)
    ? countries.filter(
        (c) =>
          c.name.common.toLowerCase().includes(search.toLowerCase()) &&
          (region ? c.region === region : true)
      )
    : [];

  if (loading) return <p>Loading countries...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className="country-list">
      <div className="controls">
        <div className="search">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder="Search for a country..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="filter">
          <select value={region} onChange={(e) => setRegion(e.target.value)}>
            <option value="">Filter by Region</option>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>
      </div>

      <div className="grid">
        {filtered.map((country) => (
          <CountryCard key={country.cca3} country={country} />
        ))}
      </div>
    </section>
  );
}
