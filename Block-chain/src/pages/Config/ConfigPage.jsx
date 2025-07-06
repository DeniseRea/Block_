import { TableHeader } from "../../components/Table/TableHeader";
import { TableBody } from "../../components/Table/TableBody";
import { TableContainer } from "../../components/Table/TableContainer";
import { InputField } from "../../components/InputField";
import { SelectInput } from "../../components/SelectInput";

export const ConfigPage = () => {
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
    <div className="container py-5">
      <h2 className="text-center mb-4 text-primary">Configuración</h2>
        <p>Ingrese el número de ceros a agregar:</p>

      <TableContainer>
        <table className="table table-hover table-bordered text-center">
          <TableHeader headers={headers} />
          <TableBody data={data} extractValues={extractValues} />
        </table>
      </TableContainer>
    </div>
  );
};