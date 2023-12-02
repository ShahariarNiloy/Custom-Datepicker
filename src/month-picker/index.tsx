// MonthPicker.jsx
import React, { FC, memo, useState } from "react";
import { makeCalendar } from "../make-calendar";
import { useCalendarMonth } from "../use-calendar-month";
import "./month-picker.css";
import { Timestamp } from "../types";

type MonthPickerProps = {
  onSelect: (monthTimestamp: number) => void;
};

const MonthPicker: FC<MonthPickerProps> = ({ onSelect }) => {
  const currentTimestamp = Date.now();
  const { currentMonthTimestamp, onPrevMonth, onNextMonth } = useCalendarMonth(
    currentTimestamp as Timestamp
  );

  const [selectedYear, setSelectedYear] = useState<number>(
    new Date(currentMonthTimestamp).getFullYear()
  );

  const calendar = Array.from({ length: 12 }, (_, index) => {
    const monthTimestamp = new Date(selectedYear, index, 1).getTime();
    return makeCalendar(monthTimestamp as Timestamp)[0];
  });

  const handleSelect = (monthIndex: number) => {
    const selectedMonthTimestamp = calendar[monthIndex][0]; // Assuming the first day of the month
    onSelect(selectedMonthTimestamp);
  };

  return (
    <div className="month-picker">
      <div className="month-picker-header">
        <button onClick={onPrevMonth}>Previous Year</button>
        <span>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
          >
            {Array.from(
              { length: 10 },
              (_, index) => selectedYear - 5 + index
            ).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </span>
        <button onClick={onNextMonth}>Next Year</button>
      </div>
      <div className="month-picker-grid">
        {calendar.map((month, index) => (
          <div
            key={index}
            className="month-picker-cell"
            onClick={() => handleSelect(index)}
          >
            {new Date(month[0]).toLocaleDateString("en", { month: "long" })}
          </div>
        ))}
      </div>
    </div>
  );
};

const MonthPickerMemo = memo(MonthPicker);
export { MonthPickerMemo as MonthPicker };
