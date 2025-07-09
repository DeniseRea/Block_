import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "../context/ThemeContext";

export const SectionTitle = ({ icon, title, subtitle }) => {
  const { colors } = useTheme();

  return (
    <div className="text-center my-5">
      <h2 
        className="display-5 fw-bold"
        style={{ color: colors.primary }}
      >
        {icon && <span className="me-2">{icon}</span>}
        {title}
      </h2>
      {subtitle && (
        <p 
          className="fs-5"
          style={{ color: colors.textSecondary }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

SectionTitle.propTypes = {
  icon: PropTypes.node,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
};
