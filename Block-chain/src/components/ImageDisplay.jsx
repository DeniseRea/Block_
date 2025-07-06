// src/components/ImageDisplay.jsx

export const ImageDisplay = ({ src, alt, width = "200px", height = "auto", rounded = true }) => {
  return (
    <img
      src={src}
      alt={alt}
      style={{ width, height, objectFit: "cover" }}
      className={rounded ? "img-fluid rounded" : "img-fluid"}
    />
  );
};
