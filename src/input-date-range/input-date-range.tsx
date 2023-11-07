import React, {
  FC, useCallback, useMemo, useState,
} from 'react';
import { DatepickerPopup } from '../datepicker-popup';
import { DatepickerRange } from '../datepicker-range';
import { Timestamp } from '../types';
import './input-date-range.css';

type Props = {
    value?: [Timestamp, Timestamp];
    onChange: (nextValue: [Timestamp, Timestamp]) => void;
}

const displayDate = (dayTimestamp: Timestamp): string => {
  const date = new Date(dayTimestamp);
  return date.toDateString().substring(4);
};

export const InputDateRange: FC<Props> = (props) => {
  const {
    value,
    onChange,
  } = props;
  const [isShownPicker, setShownPicker] = useState(false);

  const handleSelect = useCallback(
    (nextValue: [Timestamp, Timestamp]) => {
      setShownPicker(false);
      onChange(nextValue);
    },
    [onChange],
  );

  const valueString = useMemo(
    () => {
      if (!value?.length) {
        return '';
      }

      const [min, max] = value;

      return `${displayDate(min)} - ${displayDate(max)}`;
    },
    [value],
  );

  const onToggleShow = useCallback(
    () => setShownPicker((state) => !state),
    [],
  );

  return (
    <div className="input-date-range">
      <input
        readOnly
        placeholder="Choose range of dates"
        type="text"
        className="input-date-range-control"
        value={valueString}
        onClick={onToggleShow}
      />

      {isShownPicker && (
        <div className="input-date-range-picker">
          <DatepickerPopup>
            <DatepickerRange
              selected={value}
              onSelect={handleSelect}
            />
          </DatepickerPopup>
        </div>
      )}
    </div>
  );
};
