import { FC, memo, useMemo } from "react";
import { Calendar } from "../calendar";
import { CalendarDay } from "../calendar-day";
import { Timestamp } from "../types";
import { useCalendarMonth } from "../use-calendar-month";
import { displayDay, isCurrentMonth, startOfDay } from "../utils";

type Props = {
  selected?: Timestamp;
  onSelect: (nextSelected: Timestamp) => void;
};

const DatepickerSimple: FC<Props> = (props) => {
  const { selected = 0 as Timestamp, onSelect } = props;

  const { currentMonthTimestamp, onPrevMonth, onNextMonth } = useCalendarMonth(
    selected || (Date.now() as Timestamp)
  );

  const selectedStartOfDay = useMemo(() => startOfDay(selected), [selected]);

  return (
    <Calendar
      monthTimestamp={currentMonthTimestamp}
      onPrevMonth={onPrevMonth}
      onNextMonth={onNextMonth}
    >
      {(dayTimestamp) => (
        <CalendarDay
          key={String(dayTimestamp)}
          isCurrentMonth={isCurrentMonth(currentMonthTimestamp, dayTimestamp)}
          isSelected={selectedStartOfDay === dayTimestamp}
          dayTimestamp={dayTimestamp}
          onClick={onSelect}
        >
          {displayDay(dayTimestamp)}
        </CalendarDay>
      )}
    </Calendar>
  );
};

const DatepickerSimpleMemo = memo(DatepickerSimple);
export { DatepickerSimpleMemo as DatepickerSimple };
