import { useEffect, useRef, useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

interface Option {
  label: string;
  value: string | number;
}

interface SelectDropdownProps {
  options: Option[];
  onChange: (value: Option['value']) => void;
  initialValue?: Option['value'];
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  label?: string;
}

const SelectDropdown = ({
  options,
  onChange,
  initialValue,
  placeholder = 'Select an option',
  className = '',
  disabled = false,
  label,
}: SelectDropdownProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(
    initialValue
      ? options.find((opt) => opt.value === initialValue) || null
      : null,
  );
  const [openUpwards, setOpenUpwards] = useState(false);

  const trigger = useRef<HTMLButtonElement>(null);
  const dropdown = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target as Node) ||
        trigger.current?.contains(target as Node)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    if (dropdownOpen && trigger.current) {
      const rect = trigger.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      setOpenUpwards(spaceBelow < 200);
    }
  }, [dropdownOpen]);

  const handleSelect = (option: Option) => {
    setSelectedOption(option);
    onChange(option.value);
    setDropdownOpen(false);
  };

  return (
    <div className="relative w-full ">
      {label && (
        <div className="!mb-1 text-sm text-gray-700 dark:text-white">
          {label}
        </div>
      )}
      <button
        ref={trigger}
        type="button"
        onClick={() => !disabled && setDropdownOpen(!dropdownOpen)}
        className={`flex items-center justify-between w-full px-4 py-2 text-left border rounded-md transition-all ${
          disabled
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-white dark:bg-boxdark border-gray-300 dark:!text-white cursor-pointer'
        } ${className}`}
        disabled={disabled}
      >
        <span
          className={
            !selectedOption ? 'text-gray-400' : 'text-gray-900 dark:text-white'
          }
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <FaChevronDown
          className={`transition-transform text-gray-500 dark:text-white ${
            dropdownOpen ? 'rotate-180' : ''
          }`}
          size={14}
        />
      </button>

      <div
        ref={dropdown}
        className={`absolute left-0 right-0 z-40 mt-1 rounded-md border bg-white dark:bg-boxdark py-1.5 shadow-lg ${
          dropdownOpen && !disabled
            ? openUpwards
              ? 'bottom-full mb-1'
              : 'top-full mt-1'
            : 'hidden'
        }`}
      >
        {options?.map((option) => (
          <button
            key={option.value}
            type="button"
            className={`flex w-full items-center px-4 py-2 text-left text-sm dark:text-white transition-all ${
              selectedOption?.value === option.value
                ? 'bg-boxdark dark:bg-white dark:!text-black text-white'
                : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
            onClick={() => handleSelect(option)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export { SelectDropdown };
