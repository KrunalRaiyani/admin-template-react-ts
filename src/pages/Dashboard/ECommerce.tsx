import React, { useEffect, useState } from 'react';
import CardDataStats from '../../components/CardDataStats';
import DefaultLayout from '../../layout/DefaultLayout';
import { GET_DASHBOARD_DATA } from '../../utils/actions/Dashboard';
import CheckboxOne from '../../components/Checkboxes/CheckboxOne';
import CheckboxTwo from '../../components/Checkboxes/CheckboxTwo';
import CheckboxThree from '../../components/Checkboxes/CheckboxThree';
import CheckboxFour from '../../components/Checkboxes/CheckboxFour';
import CheckboxFive from '../../components/Checkboxes/CheckboxFive';
import DropdownDefault from '../../components/Dropdowns/DropdownDefault';
import DatePickerOne from '../../components/Forms/DatePicker/DatePickerOne';
import DatePickerTwo from '../../components/Forms/DatePicker/DatePickerTwo';
import MultiSelect from '../../components/Forms/MultiSelect';
import SwitcherOne from '../../components/Switchers/SwitcherOne';
import SwitcherTwo from '../../components/Switchers/SwitcherTwo';
import SwitcherThree from '../../components/Switchers/SwitcherThree';
import SwitcherFour from '../../components/Switchers/SwitcherFour';
import { TextField } from '../../components/TextField/TextField';
import { SelectDropdown } from '../../components/Dropdowns/SelectDropdown';

const ECommerce: React.FC = () => {
  const [data, setData] = useState({});

  const getData = async () => {
    try {
      const res = await GET_DASHBOARD_DATA();
      setData(res?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(data, 'cehckData');

  return (
    <DefaultLayout>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats
          title="Total Registration"
          total={data?.totalRegistration}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
        </CardDataStats>
        <CardDataStats title="Exam Pending" total={data?.ExamPending}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </CardDataStats>
        <CardDataStats title="Pending Traning" total={data?.TrainingPending}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"
            />
          </svg>
        </CardDataStats>
        <CardDataStats title="Total Kyc" total={data?.successKycCount}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 2.994v2.25m10.5-2.25v2.25m-14.252 13.5V7.491a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v11.251m-18 0a2.25 2.25 0 0 0 2.25 2.25h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5m-6.75-6h2.25m-9 2.25h4.5m.002-2.25h.005v.006H12v-.006Zm-.001 4.5h.006v.006h-.006v-.005Zm-2.25.001h.005v.006H9.75v-.006Zm-2.25 0h.005v.005h-.006v-.005Zm6.75-2.247h.005v.005h-.005v-.005Zm0 2.247h.006v.006h-.006v-.006Zm2.25-2.248h.006V15H16.5v-.005Z"
            />
          </svg>
        </CardDataStats>

        {/* checkboxes */}
        <div>
          <CheckboxOne />
          <CheckboxTwo />
          <CheckboxThree />
          <CheckboxFour />
          <CheckboxFive />
        </div>

        {/* dropdown */}
        <div>
          <DropdownDefault />
        </div>

        {/* datepicer */}
        <div>
          <DatePickerOne />
          <DatePickerTwo />
        </div>

        {/* multie select */}
        <div>
          <MultiSelect id="1" />
        </div>

        {/* select */}
        <SelectDropdown />

        {/* switches */}
        <SwitcherOne />
        <SwitcherTwo />
        <SwitcherThree />
        <SwitcherFour />

        {/* text field */}
        <TextField />
      </div>
    </DefaultLayout>
  );
};

export default ECommerce;
