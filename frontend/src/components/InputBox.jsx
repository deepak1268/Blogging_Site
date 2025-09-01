export const InputBox = ({reference,name,type,placeholder,onChange,value,onKeyDown,children,}) => {

  return (
    <div className="relative w-full">
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
      {children && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          {children}
        </div>
      )}
    </div>
  );
};
