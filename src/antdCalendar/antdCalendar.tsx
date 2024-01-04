import { FC, useCallback, useMemo, useState } from "react";
import { CalendarWeekDays } from "../calendar-week-days";
import { makeCustomCalendar } from "../make-calendar";
import { Timestamp } from "../types";
import { displayDay } from "../utils";
import { useCalendarMonth } from "./useCalendarMonth";
// import { startOfDay } from "../utils";

type Props = {
  selected?: Timestamp;
  onSelect: (nextSelected: Timestamp) => void;
};

export const AntdCalendar: FC<Props> = ({ selected, onSelect }) => {
  const [innerSelected, setInnerSelected] = useState(selected);
  const {
    currentMonthTimestamp,
    onPrevMonth,
    onNextMonth,
    // onNextYear,
    // onPrevYear,
    // onPrevTenYear,
    // onNextTenYear,
    // onPrevHundredYear,
    // onNextHundredYear,
  } = useCalendarMonth(innerSelected || (Date.now() as Timestamp));
  //   const selectedStartOfDay = useMemo(() => startOfDay(selected as Timestamp), [selected]);

  // const [pickerType, setPickerType] = useState({
  //   month: false,
  //   singleYear: false,
  //   rangeYear: false,
  // });

  // const onClick = (daytimestamp: Timestamp) => {
  //   if (pickerType.month) {
  //     setInnerSelected(daytimestamp);
  //     setPickerType((prev) => ({ ...prev, month: false }));
  //     return;
  //   }
  //   if (pickerType.singleYear) {
  //     setInnerSelected(daytimestamp);
  //     setPickerType((prev) => ({ ...prev, singleYear: false }));
  //     return;
  //   }
  //   if (pickerType.rangeYear) {
  //     setInnerSelected(daytimestamp);
  //     setPickerType((prev) => ({
  //       ...prev,
  //       singleYear: true,
  //       rangeYear: false,
  //     }));
  //     return;
  //   }
  //   onSelect(daytimestamp);
  // };

  const calendar = useMemo(
    () => makeCustomCalendar(currentMonthTimestamp, "day"),
    [currentMonthTimestamp]
  );

  const handlePrevMonth = useCallback((): void => {
    if (!onPrevMonth) {
      return;
    }

    onPrevMonth();
  }, [onPrevMonth]);

  const handleNextMonth = useCallback((): void => {
    if (!onNextMonth) {
      return;
    }
    onNextMonth();
  }, [onNextMonth]);
  // const calendarMonth = useMemo(
  //   () => makeMonthCalendar(monthTimestamp),
  //   [monthTimestamp]
  // );

  // const calendarTenYear = useMemo(
  //   () => makeTenYearCalendar(monthTimestamp),
  //   [monthTimestamp]
  // );

  const date = new Date(currentMonthTimestamp);
  const month = date.toLocaleDateString("en", { month: "long" });
  return (
    <div className="calendar">
      <div className="calendar-header">
        <div className="calendar-header-switcher">
          <button
            type="button"
            data-mode="prev"
            className="calendar-header-button-double"
            // onClick={
            //   rangeYearPicker
            //     ? handlePrevHundredYear
            //     : singleYearPicker
            //     ? handlePrevTenYear
            //     : handlePrevYear
            // }
          >
            previous Year
          </button>
          <button
            type="button"
            data-mode="prev"
            className="calendar-header-button"
            onClick={handlePrevMonth}
          >
            previous month
          </button>
          <div>
            <span
              // onClick={() => setMonthPicker(true)}
              className="calendar-header-month"
            >
              {month}
            </span>
            <span className="calendar-header-year">{date.getFullYear()}</span>
          </div>
          <button
            type="button"
            data-mode="next"
            className="calendar-header-button"
            onClick={handleNextMonth}
          >
            next month
          </button>
          <button
            type="button"
            data-mode="next"
            className="calendar-header-button-double"
            // onClick={
            //   rangeYearPicker
            //     ? handleNextHundredYear
            //     : singleYearPicker
            //     ? handleNextTenYear
            //     : handleNextYear
            // }
          >
            next year
          </button>
        </div>
      </div>
      <table className="calendar-table">
        <thead>
          <CalendarWeekDays />
        </thead>

        <tbody>
          {calendar.map((week, index) => (
            <tr key={String(index)}>
              {week.map((day) => (
                <td key={day} className="calendar-table-cell">
                  <div
                    className="calendar-day"
                    // data-day={date.getDay()}
                    // data-first-date={date.getDate() === 1}
                    // data-last-date={
                    //   lastDateOfMonth(dayTimestamp) === date.getDate()
                    // }
                    // data-highlighted-mode={highlightedMode}
                  >
                    <button
                      type="button"
                      className="calendar-day-button"
                      // disabled={isDisabled}
                      // data-today={isToday}
                      // data-selected={isSelected}
                      // data-current-month={isCurrentMonth}
                      // onClick={handleClick}
                      // onPointerEnter={handlePointerEnter}
                      // onPointerLeave={handlePointerLeave}
                    >
                      {displayDay(day)}
                    </button>
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
