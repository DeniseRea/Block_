
export const SelectInput = ({ options, value, onChange }) => (
  <select className="form-select" value={value} onChange={onChange}>
    {options.map((opt) => (
      <option key={opt.value} value={opt.value}>
        {opt.label}
      </option>
    ))}
  </select>
);
