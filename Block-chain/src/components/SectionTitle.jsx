// src/components/SectionTitle.jsx

import PropTypes from "prop-types";

export const SectionTitle = ({ icon, title, subtitle }) => {
  return (
    <div className="text-center my-5">
      <h2 className="display-5 fw-bold">
        {icon && <span className="me-2">{icon}</span>}
        {title}
      </h2>
      {subtitle && <p className="text-muted fs-5">{subtitle}</p>}
    </div>
  );
};

SectionTitle.propTypes = {
  icon: PropTypes.node,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
};
