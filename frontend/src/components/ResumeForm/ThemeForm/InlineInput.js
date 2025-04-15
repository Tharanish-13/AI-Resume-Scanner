export const InlineInput = ({
    label,
    labelClassName,
    name,
    value = "",
    placeholder,
    inputStyle = {},
    onChange,
  }) => {
    return (
      <label className={`inline-input-label ${labelClassName || ""}`}>
        <span className="inline-input-label-text">{label}</span>
        <input
          type="text"
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(name, e.target.value)}
          className="inline-input"
          style={inputStyle}
        />
      </label>
    );
  };
  