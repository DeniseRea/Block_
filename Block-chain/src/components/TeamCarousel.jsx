import React, { useEffect } from "react";
import { TeamMemberCard } from "./TeamMemberCard";
import { useTheme } from "../context/ThemeContext";

export const TeamCarousel = ({ team }) => {
  const { colors, isDarkMode } = useTheme();

  useEffect(() => {
    const carouselElement = document.getElementById("teamCarousel");
    if (carouselElement) {
      new bootstrap.Carousel(carouselElement, {
        interval: 5000,
        ride: "carousel",
      });
    }

    // Agregar efectos hover a las flechas
    const prevButton = document.querySelector('[data-bs-slide="prev"]');
    const nextButton = document.querySelector('[data-bs-slide="next"]');
    
    if (prevButton) {
      prevButton.addEventListener('mouseenter', () => {
        prevButton.style.opacity = '1';
        prevButton.style.transform = 'translateY(-50%) scale(1.1)';
      });
      prevButton.addEventListener('mouseleave', () => {
        prevButton.style.opacity = '0.8';
        prevButton.style.transform = 'translateY(-50%) scale(1)';
      });
    }

    if (nextButton) {
      nextButton.addEventListener('mouseenter', () => {
        nextButton.style.opacity = '1';
        nextButton.style.transform = 'translateY(-50%) scale(1.1)';
      });
      nextButton.addEventListener('mouseleave', () => {
        nextButton.style.opacity = '0.8';
        nextButton.style.transform = 'translateY(-50%) scale(1)';
      });
    }
  }, []);

  return (
    <div
      id="teamCarousel"
      className="carousel slide"
      data-bs-ride="carousel"
      data-bs-interval="5000"
      style={{ 
        backgroundColor: colors.card,
        borderRadius: '15px',
        padding: '1rem',
        border: `1px solid ${colors.border}`,
        position: 'relative'
      }}
    >
      <div className="carousel-inner">
        {team.map((member, index) => (
          <div
            key={index}
            className={`carousel-item ${index === 0 ? "active" : ""}`}
          >
            <div className="d-flex justify-content-center">
              <TeamMemberCard
                photo={member.photo}
                name={member.name}
                role={member.role}
                description={member.description}
                github={member.github}
                linkedin={member.linkedin}
              />
            </div>
          </div>
        ))}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#teamCarousel"
        data-bs-slide="prev"
        style={{ 
          width: '40px',
          height: '40px',
          backgroundColor: colors.primary,
          borderRadius: '50%',
          top: '50%',
          transform: 'translateY(-50%)',
          left: '-20px',
          opacity: '0.8',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s ease'
        }}
      >
        <i className="fas fa-chevron-left" style={{ color: colors.light, fontSize: '1.2rem' }}></i>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#teamCarousel"
        data-bs-slide="next"
        style={{ 
          width: '40px',
          height: '40px',
          backgroundColor: colors.primary,
          borderRadius: '50%',
          top: '50%',
          transform: 'translateY(-50%)',
          right: '-20px',
          opacity: '0.8',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s ease'
        }}
      >
        <i className="fas fa-chevron-right" style={{ color: colors.light, fontSize: '1.2rem' }}></i>
      </button>
    </div>
  );
};
