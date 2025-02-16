import { ButtonHTMLAttributes } from 'react';
import { FaSpinner } from 'react-icons/fa';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  loading = false,
  type = 'button',
  children,
  className = '',
  ...rest
}) => {
  return (
    <button
      type={type}
      className={`flex items-center justify-center rounded bg-primary px-4 py-2 font-medium text-gray hover:bg-opacity-90 disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
      disabled={loading}
      {...rest}
    >
      {loading ? <FaSpinner className="animate-spin mr-2" /> : null}
      {children}
    </button>
  );
};

export default Button;
