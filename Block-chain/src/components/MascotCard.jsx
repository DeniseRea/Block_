// src/components/MascotCard.jsx

export const MascotCard = ({ name, description, image }) => {
  return (
    <div className="card text-center shadow p-3 mb-5 bg-white rounded" style={{ maxWidth: '400px', margin: 'auto' }}>
      <img src={image} className="card-img-top rounded" alt={`Foto de ${name}`} />
      <div className="card-body">
        <h3 className="card-title mt-3">{name}</h3>
        <p className="card-text">{description}</p>
        
      </div>
    </div>
  );
};
