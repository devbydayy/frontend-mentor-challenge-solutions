import React from "react";
import "../styles/FilterBar.scss";

const FilterBar = ({ filters, removeFilter, clearFilters }) => {
  return (
    <div className="filter-bar">
      <div className="filter-tags">
        {filters.map((filter, idx) => (
          <div key={idx} className="filter-tag">
            <span>{filter}</span>
            <button onClick={() => removeFilter(filter)}>✕</button>
          </div>
        ))}
      </div>
      <button className="clear" onClick={clearFilters}>Clear</button>
    </div>
  );
};

export default FilterBar;
