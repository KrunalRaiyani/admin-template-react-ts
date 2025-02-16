import React from 'react';

const InputField = ({
  name,
  label,
  value,
  handleChagne,
  handleBlur,
  error,
  touched,
  icon,
  type,
  placeholder,
  style,
}: any) => {
  return (
    <div className="mb-4">
      <label className="mb-2.5 block font-medium text-black dark:text-white">
        {label}
      </label>
      <div className="relative">
        <input
          name={name}
          value={value}
          type={type || 'text'}
          onChange={handleChagne}
          onBlur={handleBlur}
          placeholder={placeholder}
          className={`w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${style}`}
        />

        {icon && <span className="absolute right-4 top-4">{icon}</span>}
      </div>
      {error && touched && <div className="text-red-500 mt-2">{error}</div>}
    </div>
  );
};

export default InputField;
