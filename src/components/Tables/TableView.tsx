import React, { useEffect, useState } from 'react';
import usePagination from '../../hooks/usePagination';
import { SelectDropdown } from '../Dropdowns/SelectDropdown';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface TableViewProps {
  rows: any[];
  columns: any[];
  count: number;
  handlePagination: (page: number) => void;
  handleLimitChange?: (limit: number) => void;
  initialLimit?: number;
  isLoading?: boolean;
}

const TableView = ({
  rows,
  columns,
  count,
  handlePagination,
  handleLimitChange,
  initialLimit = 10,
  isLoading,
}: TableViewProps) => {
  const [rowsPerPage, setRowsPerPage] = useState(initialLimit);

  const limitOptions = [
    { label: '10', value: 10 },
    { label: '25', value: 25 },
    { label: '50', value: 50 },
    { label: '75', value: 75 },
    { label: '100', value: 100 },
  ];

  const totalPages = Math.ceil(count / rowsPerPage);
  const { currentPage, goToPage, nextPage, prevPage, generatePagination } =
    usePagination(totalPages);
  const pagination = generatePagination();

  useEffect(() => {
    handlePagination && handlePagination(currentPage);
  }, [currentPage]);

  const onLimitChange = (value: number) => {
    setRowsPerPage(value);
    handleLimitChange && handleLimitChange(value);
  };

  return (
    <div>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                {columns?.map((column: any) => (
                  <th
                    key={column?.id}
                    className="py-4 px-4 font-medium text-black dark:text-white xl:pl-11"
                    style={column?.minWidth && { minWidth: column?.minWidth }}
                  >
                    {column?.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isLoading
                ? Array.from({ length: rowsPerPage }).map((_, index) => (
                    <tr key={index} className="animate-pulse">
                      {columns.map((column: any, idx: number) => (
                        <td
                          key={idx}
                          className="border-b border-[#eee] py-5 px-4 dark:border-strokedark xl:pl-11"
                        >
                          <div className="rounded-md">
                            <div className="h-6 bg-slate-200 dark:bg-graydark rounded w-full animate-pulse"></div>
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))
                : rows?.map((row: any, key: number) => (
                    <tr key={key}>
                      {columns?.map((column: any, index: number) =>
                        column?.rander ? (
                          <td
                            key={index}
                            className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11"
                          >
                            <div className="text-black dark:text-white">
                              {column?.rander(row, key)}
                            </div>
                          </td>
                        ) : (
                          <td
                            key={index}
                            className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11"
                          >
                            <div className="text-black dark:text-white">
                              {row?.[column?.id] || '-'}
                            </div>
                          </td>
                        ),
                      )}
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex flex-col items-center mt-6">
        <div className="flex items-center gap-2 w-full justify-between">
          <button
            className={`flex gap-2 items-center pagination-btn border rounded-md p-2.5 ${
              currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''
            }`}
            onClick={prevPage}
            disabled={currentPage === 1}
          >
            <FaChevronLeft />
            Prev
          </button>
          <div className="flex items-center gap-2">
            {pagination.map((page, index) => (
              <button
                key={index}
                onClick={() => typeof page === 'number' && goToPage(page)}
                className={`pagination-num border rounded-md p-2 w-10 ${
                  currentPage === page
                    ? '!bg-primary font-medium !text-gray !hover:bg-opacity-90'
                    : ''
                }`}
                disabled={page === currentPage}
              >
                {page}
              </button>
            ))}
          </div>
          <button
            className={`flex gap-2 items-center pagination-btn border rounded-md p-2.5 ${
              currentPage === totalPages ? 'cursor-not-allowed opacity-50' : ''
            }`}
            onClick={nextPage}
            disabled={currentPage === totalPages}
          >
            Next
            <FaChevronRight />
          </button>
        </div>
        <div className="mt-4 self-start w-20">
          <SelectDropdown
            options={limitOptions}
            onChange={onLimitChange}
            initialValue={initialLimit}
            className="text-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default TableView;
