import React from "react";
import "../styles/JobCard.scss";

const JobCard = ({ job, handleFilterClick }) => {
  const tags = [job.role, job.level, ...job.languages, ...job.tools];

  return (
    <article className={`job-card ${job.featured ? "featured" : ""}`}>
      <img src={job.logo} alt={job.company} className="logo" />
      <div className="job-info">
        <div className="company">
          <span className="company-name">{job.company}</span>
          {job.new && <span className="new">NEW!</span>}
          {job.featured && <span className="featured-badge">FEATURED</span>}
        </div>
        <h2 className="position">{job.position}</h2>
        <p className="details">
          {job.postedAt} · {job.contract} · {job.location}
        </p>
      </div>
      <div className="tags">
        {tags.map((tag, idx) => (
          <span key={idx} onClick={() => handleFilterClick(tag)}>{tag}</span>
        ))}
      </div>
    </article>
  );
};

export default JobCard;
