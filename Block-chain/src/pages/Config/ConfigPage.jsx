import { SelectInput } from "../../components/SelectInput";
import { InputField } from "../../components/InputField";

export const ConfigPage = () => {
  const options = [
    { value: "gato", label: "Gato" },
    { value: "minecraft", label: "Minecraft" },
    { value: "anime", label: "Anime" },
  ];

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Configuración</h2>

      <div className="table-responsive">
        <table className="table table-bordered text-center">
          <thead>
            <tr>
              <th>Inicio</th>
              <th>Texto</th>
              <th>Final</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <InputField label="" type="number" placeholder="00000" />
              </td>
              <td>
                <SelectInput options={options} />
              </td>
              <td>
                <InputField label="" type="number" placeholder="00000" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};