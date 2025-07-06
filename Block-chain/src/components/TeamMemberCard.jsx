// src/components/TeamMemberCard.jsx
import PropTypes from 'prop-types';

export const TeamMemberCard = ({ photo, name, role, description, github, linkedin }) => {
  return (
    <div className="card text-center" style={{ width: "18rem" }}>
      <img src={photo} alt={name} className="card-img-top rounded-circle" style={{ width: "150px", margin: "auto" }} />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">{role}</p>
        <p className="card-text">{description}</p>
        <div className="d-flex justify-content-center gap-3">
          <a href={github} className="btn btn-dark" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-github"></i> GitHub
          </a>
          <a href={linkedin} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin"></i> LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
};

TeamMemberCard.propTypes = {
  photo: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  github: PropTypes.string,
  linkedin: PropTypes.string
};