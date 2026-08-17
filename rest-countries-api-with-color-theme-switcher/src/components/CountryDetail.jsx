import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

export default function CountryDetail() {
  const { code } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);

  useEffect(() => {
    const API_KEY = 'rc_live_abbdcf8f65e7498ca213ceb0a2cdc7b4';
    
    fetch(
      `https://api.restcountries.com/countries/v5/code?q=${code}`,
      { 
        headers: { 
          'Authorization': `Bearer ${API_KEY}` 
        } 
      }
    )
    .then((res) => {
      if (!res.ok) throw new Error(`Failed to fetch country: ${res.status}`);
      return res.json();
    })
    .then((data) => {
      console.log('Country detail response:', data);
      
      if (data?.data?.objects && Array.isArray(data.data.objects) && data.data.objects.length > 0) {
        setCountry(data.data.objects[0]);
      } else {
        setCountry(null);
      }
    })
    .catch((err) => {
      console.error(err);
      setCountry(null);
    });
  }, [code]);

  if (!country) return <p>Loading...</p>;

  return (
    <section className="country-detail">
      <button className="back" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="detail-grid">
        <div className="flag-large">
          <img
            src={country.flag?.url_svg || country.flag?.url_png} 
            alt={`Flag of ${country.names?.common}`}
          />
        </div>

        <div className="detail-body">
          <h2>{country.names?.common}</h2>
          <div className="details-columns">
            <div>
              <p>
                <strong>Native Name:</strong>{" "}
                {country.names?.native ? Object.values(country.names.native)[0]?.common : country.names?.common}
              </p>
              <p>
                <strong>Population:</strong>{" "}
                {country.population?.toLocaleString()}
              </p>
              <p>
                <strong>Region:</strong> {country.region}
              </p>
              <p>
                <strong>Sub Region:</strong> {country.subregion}
              </p>
              <p>
                <strong>Capital:</strong>{" "}
                {country.capitals?.[0]?.name || "—"}
              </p>
            </div>
            <div>
              <p>
                <strong>Top Level Domain:</strong>{" "}
                {country.tld?.[0] || "—"}
              </p>
              <p>
                <strong>Currencies:</strong>{" "}
                {country.currencies
                  ? Object.values(country.currencies)
                      .map((c) => c.name)
                      .join(", ")
                  : "—"}
              </p>
              <p>
                <strong>Languages:</strong>{" "}
                {country.languages
                  ? Object.values(country.languages).join(", ")
                  : "—"}
              </p>
            </div>
          </div>

          <div className="borders">
            <strong>Border Countries:</strong>
            <div className="borders-list">
              {country.borders && country.borders.length > 0 ? (
                country.borders.map((borderCode) => {
                  return (
                    <Link key={borderCode} to={`/country/${borderCode}`} className="chip">
                      {borderCode}
                    </Link>
                  );
                })
              ) : (
                <span> None </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
