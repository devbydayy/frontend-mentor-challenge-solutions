import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

export default function CountryDetail() {
  const { code } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/alpha/${code}`)
      .then((res) => res.json())
      .then((data) => setCountry(data[0]));
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
            src={country.flags.svg}
            alt={`Flag of ${country.name.common}`}
          />
        </div>

        <div className="detail-body">
          <h2>{country.name.common}</h2>
          <div className="details-columns">
            <div>
              <p>
                <strong>Native Name:</strong>{" "}
                {Object.values(country.name.nativeName || {})[0]?.common ||
                  country.name.common}
              </p>
              <p>
                <strong>Population:</strong>{" "}
                {country.population.toLocaleString()}
              </p>
              <p>
                <strong>Region:</strong> {country.region}
              </p>
              <p>
                <strong>Sub Region:</strong> {country.subregion}
              </p>
              <p>
                <strong>Capital:</strong>{" "}
                {country.capital ? country.capital[0] : "—"}
              </p>
            </div>
            <div>
              <p>
                <strong>Top Level Domain:</strong>{" "}
                {country.tld ? country.tld[0] : "—"}
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
              {country.borders ? (
                country.borders.map((b) => (
                <Link key={b} to={`/country/${b}`} className="chip">
                  {b}
                </Link>
              ))
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
