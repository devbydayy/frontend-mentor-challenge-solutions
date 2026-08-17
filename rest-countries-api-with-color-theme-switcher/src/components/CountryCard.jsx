import React from "react";
import { Link } from "react-router-dom";

export default function CountryCard({ country }) {
  const name = country.names?.common || 'Unknown';
  const flagUrl = country.flag?.url_svg || country.flag?.url_png || '';
  const population = country.population || 0;
  const region = country.region || '';
  const capital = country.capitals?.[0]?.name || '—';
  const code = country.codes?.alpha_3 || country.uuid || '';

  return (
    <article className="card">
      <Link to={`/country/${code}`} className="card-link">
        <div className="flag">
          <img
            src={flagUrl}
            alt={`Flag of ${name}`}
          />
        </div>
        <div className="card-body">
          <h2 className="country-name">{name}</h2>
          <p>
            <strong>Population:</strong>{" "}
            {population.toLocaleString()}
          </p>
          <p>
            <strong>Region:</strong> {region}
          </p>
          <p>
            <strong>Capital:</strong>{" "}
            {capital}
          </p>
        </div>
      </Link>
    </article>
  );
}
