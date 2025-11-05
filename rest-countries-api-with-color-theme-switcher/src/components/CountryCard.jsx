import React from "react";
import { Link } from "react-router-dom";

export default function CountryCard({ country }) {
  return (
    <article className="card">
      <Link to={`/country/${country.cca3}`} className="card-link">
        <div className="flag">
          <img
            src={country.flags.svg}
            alt={`Flag of ${country.name.common}`}
          />
        </div>
        <div className="card-body">
          <h2 className="country-name">{country.name.common}</h2>
          <p>
            <strong>Population:</strong>{" "}
            {country.population.toLocaleString()}
          </p>
          <p>
            <strong>Region:</strong> {country.region}
          </p>
          <p>
            <strong>Capital:</strong>{" "}
            {country.capital ? country.capital[0] : "—"}
          </p>
        </div>
      </Link>
    </article>
  );
}
