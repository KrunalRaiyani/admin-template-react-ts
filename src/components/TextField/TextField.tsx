import { useState } from 'react';

interface TextFieldProps {
  label?: string;
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  type?: 'text' | 'email' | 'password' | 'number';
}

const TextField = ({
  label,
  value = '',
  onChange,
  placeholder = 'Enter text',
  className = '',
  disabled = false,
  type = 'text',
  ...rest
}: TextFieldProps) => {
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onChange(e);
  };

  return (
    <div className={`flex flex-col w-full ${className}`}>
      {label && (
        <label className="mb-1 text-sm text-gray-700 dark:text-white">
          {label}
        </label>
      )}
      <input
        type={type}
        value={inputValue}
        onChange={handleChange}
        placeholder={placeholder}
        className={`w-full px-4 py-2 border rounded-md transition-all text-gray-900 dark:text-white bg-white dark:bg-boxdark focus:outline-none $ {
          disabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : ''
        }`}
        disabled={disabled}
        {...rest}
      />
    </div>
  );
};

export { TextField };
