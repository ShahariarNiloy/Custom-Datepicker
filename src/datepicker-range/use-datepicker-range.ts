import {
  useCallback, useRef, useState,
} from 'react';
import { startOfDay } from '../utils';
import { Timestamp } from '../types';

type Props = {
  selected?: [Timestamp, Timestamp];
  onSelect: (nextSelected: [Timestamp, Timestamp]) => void;
  onDisableDay?: (dayTimestamp: Timestamp) => boolean;
};

export const useDatepickerRange = (props: Props) => {
  const {
    selected,
    onSelect,
    onDisableDay,
  } = props;

  const [nextSelected, setNextSelected] = useState<Timestamp[]>(() => {
    if (!selected) {
      return [];
    }

    return selected
      .map(startOfDay)
      .sort();
  });

  const [highlightedDay, setHighlightedDay] = useState<Timestamp>(0 as Timestamp);

  // cache - fix recreating handleClick by selectedState
  const selectedCountRef = useRef(nextSelected);
  selectedCountRef.current = nextSelected;

  const onClick = useCallback(
    (dayTimestamp: Timestamp) => {
      if (selectedCountRef.current.length === 1) {
        const finalNextSelected = [
          selectedCountRef.current[0],
          dayTimestamp,
        ].sort() as [Timestamp, Timestamp];

        setNextSelected(finalNextSelected);
        onSelect(finalNextSelected);
        setHighlightedDay(0 as Timestamp);
        return;
      }

      setNextSelected([dayTimestamp]);
      setHighlightedDay(dayTimestamp);
    },
    [onSelect],
  );

  const onHighlight = useCallback(
    (dayTimestamp: Timestamp) => {
      const isDisabled = onDisableDay && onDisableDay(dayTimestamp);

      if (isDisabled || selectedCountRef.current.length !== 1) {
        return;
      }

      setHighlightedDay(dayTimestamp);
    },
    [onDisableDay],
  );

  return {
    nextSelected,
    highlightedDay,
    onClick,
    onHighlight,
  };
};
