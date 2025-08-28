export const InputBox = ({reference, name,type,placeholder,onChange,value,onKeyDown}) => {
  return (
    <input
      ref={reference}
      name={name}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      onKeyDown={onKeyDown}
      className="border-solid border-2 w-100 rounded-lg p-2 h-15"
    />
  );
};
