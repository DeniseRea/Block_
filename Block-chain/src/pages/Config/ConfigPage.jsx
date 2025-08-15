import React, { useState } from "react";
import { TableHeader } from "../../components/Table/TableHeader";
import { TableBody } from "../../components/Table/TableBody";
import { TableContainer } from "../../components/Table/TableContainer";
import { InputField } from "../../components/InputField";
import { SelectInput } from "../../components/SelectInput";
import { useTheme } from "../../context/ThemeContext";
import StorageConfig from "../../components/StorageConfig";

export const ConfigPage = () => {
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState('general');
  
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

      {/* Tabs de navegación */}
      <div className="row justify-content-center mb-4">
        <div className="col-12 col-lg-6">
          <ul className="nav nav-pills justify-content-center">
            {[
              { id: 'general', label: 'General', icon: 'fas fa-sliders-h' },
              { id: 'storage', label: 'Almacenamiento', icon: 'fas fa-database' }
            ].map(tab => (
              <li className="nav-item me-2" key={tab.id}>
                <button
                  className={`nav-link ${activeTab === tab.id ? 'active' : ''}`}
                  style={{
                    backgroundColor: activeTab === tab.id ? colors.primary : 'transparent',
                    color: activeTab === tab.id ? '#ffffff' : colors.text,
                    border: `1px solid ${colors.primary}`,
                    borderRadius: '10px'
                  }}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <i className={`${tab.icon} me-2`}></i>
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Contenido de las tabs */}
      {activeTab === 'general' && (
        <div>
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
      )}

      {/* Tab de almacenamiento */}
      {activeTab === 'storage' && (
        <StorageConfig />
      )}
    </div>
  );
};

