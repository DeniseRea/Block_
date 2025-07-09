import React from "react";
import { TableHeader } from "../../components/Table/TableHeader";
import { TableBody } from "../../components/Table/TableBody";
import { TableContainer } from "../../components/Table/TableContainer";
import { InputField } from "../../components/InputField";
import { SelectInput } from "../../components/SelectInput";
import { useTheme } from "../../context/ThemeContext";

export const ConfigPage = () => {
  const { colors } = useTheme();
  const options = [
    { value: "gato", label: "Gato" },
    { value: "minecraft", label: "Minecraft" },
    { value: "anime", label: "Anime" },
  ];

  const headers = ["Inicio", "Texto", "Final"];

  const data = [
    {
      inicio: <InputField label="" type="number" placeholder="00000" />,
      texto: <SelectInput options={options} />,
      final: <InputField label="" type="number" placeholder="00000" />,
    },
  ];

  const extractValues = (item) => [item.inicio, item.texto, item.final];

  return (
    <div 
      className="container py-5"
      style={{ 
        backgroundColor: colors.background,
        color: colors.text,
        minHeight: '100vh'
      }}
    >
      <h2 className="text-center mb-4" style={{ color: colors.primary }}>
        <i className="fas fa-cog me-2"></i>
        Configuración
      </h2>
      <p className="text-center mb-4" style={{ color: colors.textSecondary }}>
        Ingrese el número de ceros a agregar:
      </p>

      <TableContainer>
        <table 
          className="table table-hover table-bordered text-center"
          style={{ 
            backgroundColor: colors.card,
            color: colors.text,
            borderColor: colors.border
          }}
        >
          <TableHeader headers={headers} />
          <TableBody data={data} extractValues={extractValues} />
        </table>
      </TableContainer>
    </div>
  );
};