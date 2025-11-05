import React, { useState } from "react";
import data from "./assets/data.json";
import Header from "./components/Header";
import JobCard from "./components/JobCard";
import FilterBar from "./components/FilterBar";

const App = () => {
  const [filters, setFilters] = useState([]);

  const filterFunc = ({ role, level, languages, tools }) => {
    const tags = [role, level, ...languages, ...tools];
    return filters.every(filter => tags.includes(filter));
  };

  const handleFilterClick = (filter) => {
    if (!filters.includes(filter)) {
      setFilters([...filters, filter]);
    }
  };

  const handleFilterRemove = (filter) => {
    setFilters(filters.filter(f => f !== filter));
  };

  const clearFilters = () => setFilters([]);

  const filteredJobs = filters.length === 0 ? data : data.filter(filterFunc);

  return (
    <div>
      <Header />
      {filters.length > 0 && (
        <FilterBar
          filters={filters}
          removeFilter={handleFilterRemove}
          clearFilters={clearFilters}
        />
      )}
      <main className="job-listings">
        {filteredJobs.map(job => (
          <JobCard
            key={job.id}
            job={job}
            handleFilterClick={handleFilterClick}
          />
        ))}
      </main>
      <footer class="attribution">
      Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>. 
      Coded by <a href="#">DevbyDay</a>.
      </footer>  
    </div>
  );
};

export default App;
