import { Dispatch, FC, SetStateAction, memo, useCallback } from "react";
import "./calendar-header.css";

type Props = {
  monthTimestamp: number;
  isDisabled?: boolean;
  onPrevMonth?: () => void;
  onNextMonth?: () => void;
  onPrevYear?: () => void;
  onNextYear?: () => void;
  onPrevTenYear?: () => void;
  onNextTenYear?: () => void;
  onPrevHundredYear?: () => void;
  onNextHundredYear?: () => void;
  monthPicker: boolean;
  setMonthPicker: Dispatch<SetStateAction<boolean>>;
  singleYearPicker: boolean;
  setSingleYearPicker: Dispatch<SetStateAction<boolean>>;
  rangeYearPicker: boolean;
  setRangeYearPicker: Dispatch<SetStateAction<boolean>>;
};

const CalendarHeader: FC<Props> = (props) => {
  const {
    isDisabled,
    monthTimestamp,
    onPrevMonth,
    onNextMonth,
    onNextYear,
    onPrevYear,
    onPrevTenYear,
    onNextTenYear,
    onPrevHundredYear,
    onNextHundredYear,
    monthPicker,
    setMonthPicker,
    singleYearPicker,
    setSingleYearPicker,
    rangeYearPicker,
    setRangeYearPicker,
  } = props;

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

  const handlePrevYear = useCallback((): void => {
    if (isDisabled || !onPrevYear) {
      return;
    }

    onPrevYear();
  }, [isDisabled, onPrevYear]);

  const handleNextYear = useCallback((): void => {
    if (isDisabled || !onNextYear) {
      return;
    }

    onNextYear();
  }, [isDisabled, onNextYear]);

  const handlePrevTenYear = useCallback((): void => {
    if (isDisabled || !onPrevTenYear) {
      return;
    }

    onPrevTenYear();
  }, [isDisabled, onPrevTenYear]);

  const handleNextTenYear = useCallback((): void => {
    if (isDisabled || !onNextTenYear) {
      return;
    }

    onNextTenYear();
  }, [isDisabled, onNextTenYear]);

  const handlePrevHundredYear = useCallback((): void => {
    if (isDisabled || !onPrevHundredYear) {
      return;
    }

    onPrevHundredYear();
  }, [isDisabled, onPrevHundredYear]);

  const handleNextHundredYear = useCallback((): void => {
    if (isDisabled || !onNextHundredYear) {
      return;
    }

    onNextHundredYear();
  }, [isDisabled, onNextHundredYear]);

  const tenYearRange = (date: Date): string => {
    const year = date.getFullYear();
    const startYear = Math.floor(year / 10) * 10;
    const endYear = startYear + 9;

    return `${startYear} - ${endYear}`;
  };

  const hundredYearRange = (date: Date): string => {
    const year = date.getFullYear();
    const startYear = Math.floor(year / 100) * 100;
    const endYear = startYear + 99;

    return `${startYear} - ${endYear}`;
  };

  return (
    <div className="calendar-header">
      <div className="calendar-header-switcher">
        {(onPrevYear || onPrevTenYear || onPrevHundredYear) && (
          <button
            type="button"
            data-mode="prev"
            className="calendar-header-button-double"
            onClick={
              rangeYearPicker
                ? handlePrevHundredYear
                : singleYearPicker
                ? handlePrevTenYear
                : handlePrevYear
            }
          >
            previous Year
          </button>
        )}
        {onPrevMonth && !monthPicker && !singleYearPicker && (
          <button
            type="button"
            data-mode="prev"
            className="calendar-header-button"
            onClick={handlePrevMonth}
          >
            previous month
          </button>
        )}
        <div>
          {!monthPicker && !singleYearPicker && !rangeYearPicker && (
            <span
              onClick={() => setMonthPicker(true)}
              className="calendar-header-month"
            >
              {month}{" "}
            </span>
          )}
          {rangeYearPicker ? (
            <span className="calendar-header-year">
              {hundredYearRange(date)}
            </span>
          ) : singleYearPicker ? (
            <span
              className="calendar-header-year"
              onClick={() => {
                setSingleYearPicker(false);
                setRangeYearPicker(true);
              }}
            >
              {tenYearRange(date)}
            </span>
          ) : (
            <span
              className="calendar-header-year"
              onClick={() => setSingleYearPicker(true)}
            >
              {date.getFullYear()}
            </span>
          )}
        </div>
        {onNextMonth && !monthPicker && !singleYearPicker && (
          <button
            type="button"
            data-mode="next"
            className="calendar-header-button"
            onClick={handleNextMonth}
          >
            next month
          </button>
        )}
        {(onNextYear || onNextTenYear || onNextHundredYear) && (
          <button
            type="button"
            data-mode="next"
            className="calendar-header-button-double"
            onClick={
              rangeYearPicker
                ? handleNextHundredYear
                : singleYearPicker
                ? handleNextTenYear
                : handleNextYear
            }
          >
            next year
          </button>
        )}{" "}
      </div>
    </div>
  );
};

const CalendarHeaderMemo = memo(CalendarHeader);
export { CalendarHeaderMemo as CalendarHeader };
