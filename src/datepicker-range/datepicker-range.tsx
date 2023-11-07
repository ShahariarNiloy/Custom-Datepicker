import React, { FC, memo } from 'react';
import { Calendar } from '../calendar';
import { CalendarDay } from '../calendar-day';
import { displayDay, isCurrentMonth } from '../utils';
import { useCalendarMonth } from '../use-calendar-month';
import { useDatepickerRange } from './use-datepicker-range';
import { useHighlightedMode } from './use-highlighted-mode';
import { useSet } from '../use-set';
import { Timestamp } from '../types';

type Props = Parameters<typeof useDatepickerRange>[0];

const DatepickerRange: FC<Props> = (props) => {
  const {
    selected,
    onDisableDay,
  } = props;

  const monthTimestamp = selected
    ? selected[0]
    : Date.now() as Timestamp;

  const {
    currentMonthTimestamp,
    nextMonthTimestamp,
    onPrevMonth,
    onNextMonth,
  } = useCalendarMonth(monthTimestamp);

  const {
    nextSelected,
    highlightedDay,
    onClick,
    onHighlight,
  } = useDatepickerRange(props);

  const nextSelectedSet = useSet(nextSelected);
  const getHighlightedMode = useHighlightedMode(nextSelected, highlightedDay);

  return (
    <>
      <Calendar monthTimestamp={currentMonthTimestamp}>
        {(dayTimestamp) => isCurrentMonth(currentMonthTimestamp, dayTimestamp) && (
          <CalendarDay
            key={String(dayTimestamp)}
            highlightedMode={getHighlightedMode(dayTimestamp)}
            isSelected={nextSelectedSet.has(dayTimestamp)}
            dayTimestamp={dayTimestamp}
            onClick={onClick}
            onPointerEnter={onHighlight}
            onDisable={onDisableDay}
          >
            {displayDay(dayTimestamp)}
          </CalendarDay>
        )}
      </Calendar>
      <Calendar
        monthTimestamp={nextMonthTimestamp}
        onPrevMonth={onPrevMonth}
        onNextMonth={onNextMonth}
      >
        {(dayTimestamp) => isCurrentMonth(nextMonthTimestamp, dayTimestamp) && (
          <CalendarDay
            key={String(dayTimestamp)}
            highlightedMode={getHighlightedMode(dayTimestamp)}
            isSelected={nextSelectedSet.has(dayTimestamp)}
            dayTimestamp={dayTimestamp}
            onClick={onClick}
            onPointerEnter={onHighlight}
            onDisable={onDisableDay}
          >
            {displayDay(dayTimestamp)}
          </CalendarDay>
        )}
      </Calendar>
    </>
  );
};

const DatepickerRangeMemo = memo(DatepickerRange);
export { DatepickerRangeMemo as DatepickerRange };
