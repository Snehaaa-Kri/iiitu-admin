import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const DatePickerCustomDefault = ({ setDate, Dat }) => {
  const [yearDefault, monthDefault] = Dat?.split('-').map(Number);
  const [month, setMonth] = useState(monthDefault ?? new Date().getMonth());
  const [year, setYear] = useState(yearDefault ?? new Date().getFullYear());

  useEffect(() => {
    if (year && month >= 0) {
      const formattedMonth = String(month + 1).padStart(2, '0');
      setDate(`${year}-${formattedMonth}`);
    }
  }, [month, year, setDate]);

  const handleMonthChange = (e) => {
    setMonth(parseInt(e.target.value, 10));
  };

  const handleYearChange = (e) => {
    const currentYear=new Date().getFullYear();
    const enteredYear = parseInt(e.target.value, 10);
    // setYear(parseInt(e.target.value, 10));
    if (enteredYear > currentYear) {
     return  toast.error(`Year cannot exceed ${currentYear}`);
    } else {
      setYear(enteredYear);
    }
  };

  return (
    <div className="flex items-center justify-center dark:bg-form-input p-4 bg-white dark:bg-gray-800 dark:border-form-strokedark rounded-lg shadow-md">
      <select
        className="w-full p-2 pl-10 text-sm text-gray-700 dark:border-form-strokedark dark:text-gray-300 bg-white dark:bg-form-input rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400"
        value={month}
        onChange={handleMonthChange}
      >
        <option value="" disabled>
          Select Month
        </option>
        {months.map((monthName, index) => (
          <option key={index} value={index}>
            {monthName}
          </option>
        ))}
      </select>
      <input
        type="number"
        className="w-full p-2 pl-10 text-sm text-gray-700 dark:text-white bg-white dark:bg-form-input rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400"
        value={year}
        placeholder="Year eg.(2024)"
        onChange={handleYearChange}
      />
    </div>
  );
};

export default DatePickerCustomDefault;
