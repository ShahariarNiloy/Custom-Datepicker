import { FC, useState } from "react";
import { Timestamp } from "../types";
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
    // onPrevMonth,
    // onNextMonth,
    // onNextYear,
    // onPrevYear,
    // onPrevTenYear,
    // onNextTenYear,
    // onPrevHundredYear,
    // onNextHundredYear,
  } = useCalendarMonth(innerSelected || (Date.now() as Timestamp));
  //   const selectedStartOfDay = useMemo(() => startOfDay(selected as Timestamp), [selected]);

  const [pickerType, setPickerType] = useState({
    month: false,
    singleYear: false,
    rangeYear: false,
  });

  const onClick = (daytimestamp: Timestamp) => {
    if (pickerType.month) {
      setInnerSelected(daytimestamp);
      setPickerType((prev) => ({ ...prev, month: false }));
      return;
    }
    if (pickerType.singleYear) {
      setInnerSelected(daytimestamp);
      setPickerType((prev) => ({ ...prev, singleYear: false }));
      return;
    }
    if (pickerType.rangeYear) {
      setInnerSelected(daytimestamp);
      setPickerType((prev) => ({
        ...prev,
        singleYear: true,
        rangeYear: false,
      }));
      return;
    }
    onSelect(daytimestamp);
  };
  return (
    <div onClick={() => onClick(0 as Timestamp)}>{currentMonthTimestamp}</div>
  );
};
