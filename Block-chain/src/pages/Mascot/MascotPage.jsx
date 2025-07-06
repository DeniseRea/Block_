// src/pages/About/MascotPage.jsx
import { MascotCard } from "../../components/MascotCard";
import mascotImage from "../../assets/ESPEcito.png"; 

export const MascotPage = () => {
  return (
    <div className="container py-5">
      <h2 className="text-center mb-4"> Conoce a ESPEcito</h2>
      <MascotCard
        name="ESPEcito el lobo"
        description="ESPEcito es el guardián oficial de los bytes. Le encanta ayudar a estudiantes y corre más rápido que un ping. Siempre está listo para una nueva aventura tecnológica."
        image={mascotImage}
      />
    </div>
  );
};
