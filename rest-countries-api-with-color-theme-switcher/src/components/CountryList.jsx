import React, { useEffect, useState } from "react";
import CountryCard from "./CountryCard";

export default function CountryList() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [totalCountries, setTotalCountries] = useState(0);

  const API_KEY = 'rc_live_abbdcf8f65e7498ca213ceb0a2cdc7b4';
  const LIMIT = 25;

  const fetchCountries = (offsetValue, append = false) => {
    const setLoadingState = append ? setLoadingMore : setLoading;
    setLoadingState(true);

    fetch(
      `https://api.restcountries.com/countries/v5?offset=${offsetValue}&limit=${LIMIT}`,
      { 
        headers: { 
          'Authorization': `Bearer ${API_KEY}` 
        } 
      }
    )
    .then((res) => {
      if (!res.ok) throw new Error(`Failed to fetch countries: ${res.status}`);
      return res.json();
    })
    .then((data) => {
      console.log('API Response:', data);
      
      if (data?.data?.objects && Array.isArray(data.data.objects)) {
        const total = data.data?.meta?.total || 0;
        setTotalCountries(total);
        
        const currentOffset = data.data?.meta?.offset || offsetValue;
        const limit = data.data?.meta?.limit || LIMIT;
        setHasMore((currentOffset + limit) < total);
        
        if (append) {
          setCountries(prev => [...prev, ...data.data.objects]);
        } else {
          setCountries(data.data.objects);
        }
      } else {
        setCountries([]);
        setHasMore(false);
      }
      setLoadingState(false);
    })
    .catch((err) => {
      console.error(err);
      if (!append) {
        setError(err.message);
        setCountries([]);
      }
      setLoadingState(false);
    });
  };

  useEffect(() => {
    fetchCountries(0, false);
  }, []);

  const loadMore = () => {
    if (!loadingMore && hasMore) {
      const nextOffset = offset + LIMIT;
      setOffset(nextOffset);
      fetchCountries(nextOffset, true);
    }
  };

  const filtered = Array.isArray(countries)
    ? countries.filter((c) => {
        const name = c.names?.common || '';
        const regionValue = c.region || '';
        
        const matchesSearch = name
          .toLowerCase()
          .includes(search.toLowerCase());
        const matchesRegion = region ? regionValue === region : true;
        
        return matchesSearch && matchesRegion;
      })
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
          <CountryCard key={country.codes?.alpha_3 || country.uuid} country={country} />
        ))}
      </div>

      {filtered.length > 0 && (
        <div className="load-more-container">
          <p className="country-count">
            Showing {filtered.length} of {totalCountries} countries
          </p>
          {hasMore ? (
            <button 
              className="load-more-btn" 
              onClick={loadMore}
              disabled={loadingMore}
            >
              {loadingMore ? 'Loading...' : 'Load More Countries'}
            </button>
          ) : (
            <p className="all-loaded">All countries loaded! 🎉</p>
          )}
        </div>
      )}
    </section>
  );
}
