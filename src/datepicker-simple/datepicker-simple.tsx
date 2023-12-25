import { FC, memo, useMemo, useState } from "react";
import { Calendar } from "../calendar";
import { CalendarDay } from "../calendar-day";
import { Timestamp } from "../types";
import { useCalendarMonth } from "../use-calendar-month";
import {
  displayDay,
  displayMonth,
  displayTenYear,
  displayYear,
  isCurrentMonth,
  startOfDay,
} from "../utils";

type Props = {
  selected?: Timestamp;
  onSelect: (nextSelected: Timestamp) => void;
};

const DatepickerSimple: FC<Props> = (props) => {
  const { selected = 0 as Timestamp, onSelect } = props;
  const [innerSelected, setInnerSelected] = useState(selected);

  const {
    currentMonthTimestamp,
    onPrevMonth,
    onNextMonth,
    onNextYear,
    onPrevYear,
    onPrevTenYear,
    onNextTenYear,
    onPrevHundredYear,
    onNextHundredYear,
  } = useCalendarMonth(innerSelected || (Date.now() as Timestamp));

  const selectedStartOfDay = useMemo(() => startOfDay(selected), [selected]);

  const [monthPicker, setMonthPicker] = useState(false);
  const [singleYearPicker, setSingleYearPicker] = useState(false);
  const [rangeYearPicker, setRangeYearPicker] = useState(false);

  const onClick = (daytimestamp: Timestamp) => {
    if (monthPicker) {
      setInnerSelected(daytimestamp);
      setMonthPicker(false);
      return;
    }
    if (singleYearPicker) {
      setInnerSelected(daytimestamp);
      setSingleYearPicker(false);
      return;
    }
    if (rangeYearPicker) {
      setInnerSelected(daytimestamp);
      setRangeYearPicker(false);
      setSingleYearPicker(true);
      return;
    }
    onSelect(daytimestamp);
  };

  return (
    <Calendar
      monthTimestamp={currentMonthTimestamp}
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
    >
      {(dayTimestamp) => {
        if (!dayTimestamp) return;

        return (
          <CalendarDay
            key={String(dayTimestamp)}
            isCurrentMonth={isCurrentMonth(currentMonthTimestamp, dayTimestamp)}
            isSelected={
              selectedStartOfDay === dayTimestamp &&
              !monthPicker &&
              !singleYearPicker &&
              !rangeYearPicker
            }
            dayTimestamp={dayTimestamp}
            onClick={onClick}
            monthPicker={monthPicker}
            setMonthPicker={setMonthPicker}
          >
            {monthPicker ? (
              displayMonth(dayTimestamp)
            ) : singleYearPicker ? (
              displayYear(dayTimestamp)
            ) : rangeYearPicker ? (
              <span style={{ display: "flex", whiteSpace: "nowrap" }}>
                {displayTenYear(dayTimestamp)}
              </span>
            ) : (
              displayDay(dayTimestamp)
            )}
          </CalendarDay>
        );
      }}
    </Calendar>
  );
};

const DatepickerSimpleMemo = memo(DatepickerSimple);
export { DatepickerSimpleMemo as DatepickerSimple };
