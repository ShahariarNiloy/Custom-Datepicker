import { Dispatch, FC, ReactNode, SetStateAction, memo, useMemo } from "react";
import { CalendarHeader } from "../calendar-header";
import { CalendarWeekDays } from "../calendar-week-days";
import {
  makeCalendar,
  makeHundredYearCalendar,
  makeMonthCalendar,
  makeTenYearCalendar,
} from "../make-calendar";
import { Timestamp } from "../types";
import "./calendar.css";

type Props = {
  monthTimestamp: Timestamp;
  onPrevMonth?: () => void;
  onNextMonth?: () => void;
  onNextYear?: () => void;
  onPrevYear?: () => void;
  onNextTenYear?: () => void;
  onPrevTenYear?: () => void;
  onNextHundredYear?: () => void;
  onPrevHundredYear?: () => void;
  children: (dayTimestamp: Timestamp) => ReactNode;
  monthPicker: boolean;
  setMonthPicker: Dispatch<SetStateAction<boolean>>;
  singleYearPicker: boolean;
  setSingleYearPicker: Dispatch<SetStateAction<boolean>>;
  rangeYearPicker: boolean;
  setRangeYearPicker: Dispatch<SetStateAction<boolean>>;
};

const Calendar: FC<Props> = (props) => {
  const {
    children,
    monthTimestamp,
    onPrevMonth,
    onNextMonth,
    onNextYear,
    onPrevYear,
    onPrevTenYear,
    onNextTenYear,
    onNextHundredYear,
    onPrevHundredYear,
    monthPicker,
    setMonthPicker,
    singleYearPicker,
    setSingleYearPicker,
    rangeYearPicker,
    setRangeYearPicker,
  } = props;

  const calendar = useMemo(
    () => makeCalendar(monthTimestamp),
    [monthTimestamp]
  );

  const calendarMonth = useMemo(
    () => makeMonthCalendar(monthTimestamp),
    [monthTimestamp]
  );

  const calendarTenYear = useMemo(
    () => makeTenYearCalendar(monthTimestamp),
    [monthTimestamp]
  );

  const calendarHundredYear = useMemo(
    () => makeHundredYearCalendar(monthTimestamp),
    [monthTimestamp]
  );

  return (
    <div className="calendar">
      <CalendarHeader
        monthTimestamp={monthTimestamp}
        onPrevMonth={onPrevMonth}
        onNextMonth={onNextMonth}
        onNextYear={onNextYear}
        onPrevYear={onPrevYear}
        onPrevTenYear={onPrevTenYear}
        onNextTenYear={onNextTenYear}
        onPrevHundredYear={onPrevHundredYear}
        onNextHundredYear={onNextHundredYear}
        monthPicker={monthPicker}
        setMonthPicker={setMonthPicker}
        singleYearPicker={singleYearPicker}
        setSingleYearPicker={setSingleYearPicker}
        rangeYearPicker={rangeYearPicker}
        setRangeYearPicker={setRangeYearPicker}
      />
      <table className="calendar-table">
        {!monthPicker && !singleYearPicker && !rangeYearPicker && (
          <>
            <thead>
              <CalendarWeekDays />
            </thead>

            <tbody>
              {calendar.map((week, index) => (
                <tr key={String(index)}>
                  {week.map((day) => (
                    <td key={day} className="calendar-table-cell">
                      {children(day)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </>
        )}

        {monthPicker && (
          <tbody>
            {calendarMonth.map((week, index) => (
              <tr key={String(index)}>
                {week.map((day) => (
                  <td key={day} className="calendar-table-cell">
                    {children(day)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        )}

        {singleYearPicker && (
          <tbody>
            {calendarTenYear.map((week, index) => (
              <tr key={String(index)}>
                {week.map((day) => (
                  <td key={day} className="calendar-table-cell">
                    {children(day)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        )}

        {rangeYearPicker && (
          <tbody>
            {calendarHundredYear.map((week, index) => (
              <tr key={String(index)}>
                {week.map((day) => (
                  <td key={day} className="calendar-table-cell">
                    {children(day)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
};

const CalendarMemo = memo(Calendar);
export { CalendarMemo as Calendar };
