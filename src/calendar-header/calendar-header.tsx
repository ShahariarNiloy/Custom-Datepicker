import { FC, memo, useCallback } from "react";
import "./calendar-header.css";

type Props = {
  monthTimestamp: number;
  isDisabled?: boolean;
  onPrevMonth?: () => void;
  onNextMonth?: () => void;
};

const CalendarHeader: FC<Props> = (props) => {
  const { isDisabled, monthTimestamp, onPrevMonth, onNextMonth } = props;

  const date = new Date(monthTimestamp);
  const month = date.toLocaleDateString("en", { month: "long" });

  const handlePrevMonth = useCallback((): void => {
    if (isDisabled || !onPrevMonth) {
      return;
    }

    onPrevMonth();
  }, [isDisabled, onPrevMonth]);

  const handleNextMonth = useCallback((): void => {
    if (isDisabled || !onNextMonth) {
      return;
    }

    onNextMonth();
  }, [isDisabled, onNextMonth]);

  return (
    <div className="calendar-header">
      <div>
        {month}{" "}
        <span className="calendar-header-year">{date.getFullYear()}</span>
      </div>
      <div className="calendar-header-switcher">
        {onPrevMonth && (
          <button
            type="button"
            data-mode="prev"
            className="calendar-header-button"
            onClick={handlePrevMonth}
          >
            previous month
          </button>
        )}
        {onNextMonth && (
          <button
            type="button"
            data-mode="next"
            className="calendar-header-button"
            onClick={handleNextMonth}
          >
            next month
          </button>
        )}{" "}
      </div>
    </div>
  );
};

const CalendarHeaderMemo = memo(CalendarHeader);
export { CalendarHeaderMemo as CalendarHeader };
