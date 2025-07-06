// src/components/TeamCarousel.jsx
import { useEffect } from "react";
import { TeamMemberCard } from "./TeamMemberCard";

export const TeamCarousel = ({ team }) => {
  useEffect(() => {
    const carouselElement = document.getElementById("teamCarousel");
    if (carouselElement) {
      new bootstrap.Carousel(carouselElement, {
        interval: 5000,
        ride: "carousel",
      });
    }
  }, []);

  return (
    <div
      id="teamCarousel"
      className="carousel slide"
      data-bs-ride="carousel"
      data-bs-interval="5000"
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
      >
        <span className="carousel-control-prev-icon" />
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#teamCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" />
      </button>
    </div>
  );
};
