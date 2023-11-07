import { FC, memo, PropsWithChildren, useCallback } from "react";
import { Timestamp } from "../types";
import { lastDateOfMonth } from "../utils";
import "./calendar-day.css";

type Props = {
  isCurrentMonth?: boolean;
  isSelected?: boolean;
  highlightedMode?: "from" | "to" | "middle" | null;
  dayTimestamp: Timestamp;
  onClick: (dayTimestamp: Timestamp) => void;
  onPointerEnter?: (dayTimestamp: Timestamp) => void;
  onPointerLeave?: (dayTimestamp: Timestamp) => void;
  onDisable?: (dayTimestamp: Timestamp) => boolean;
};

const CalendarDay: FC<PropsWithChildren<Props>> = (props) => {
  const {
    children,
    isCurrentMonth = true,
    isSelected = false,
    dayTimestamp,
    highlightedMode,
    onClick,
    onPointerEnter,
    onPointerLeave,
    onDisable,
  } = props;

  const now = new Date();
  const date = new Date(dayTimestamp);
  const isToday = date.toDateString() === now.toDateString();

  const handleClick = useCallback(() => {
    onClick(dayTimestamp);
  }, [onClick, dayTimestamp]);

  const handlePointerEnter = useCallback(() => {
    if (onPointerEnter) {
      onPointerEnter(dayTimestamp);
    }
  }, [onPointerEnter, dayTimestamp]);

  const handlePointerLeave = useCallback(() => {
    if (onPointerLeave) {
      onPointerLeave(dayTimestamp);
    }
  }, [onPointerLeave, dayTimestamp]);

  const isDisabled = onDisable && onDisable(dayTimestamp);

  return (
    <div
      className="calendar-day"
      data-day={date.getDay()}
      data-first-date={date.getDate() === 1}
      data-last-date={lastDateOfMonth(dayTimestamp) === date.getDate()}
      data-highlighted-mode={highlightedMode}
    >
      <button
        type="button"
        className="calendar-day-button"
        disabled={isDisabled}
        data-today={isToday}
        data-selected={isSelected}
        data-current-month={isCurrentMonth}
        onClick={handleClick}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
      >
        {children}
      </button>
    </div>
  );
};

const CalendarDayMemo = memo(CalendarDay);
export { CalendarDayMemo as CalendarDay };
