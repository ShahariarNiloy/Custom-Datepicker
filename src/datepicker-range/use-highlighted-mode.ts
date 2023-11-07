import { useMemo } from 'react';
import { checkInRange } from '../utils';
import { Timestamp } from '../types';

export const useHighlightedMode = (
  nextSelected: Timestamp[],
  highlightedDay: Timestamp,
) => {
  const [fromDay, toDay] = useMemo(
    () => [...nextSelected, highlightedDay].slice(0, 2),
    [nextSelected, highlightedDay],
  );

  return (dayTimestamp: Timestamp): 'from' | 'to' | 'middle' | null => {
    const inRange = checkInRange(
      dayTimestamp,
      [fromDay, toDay].sort(),
    );

    if (!inRange || toDay === fromDay) {
      return null;
    }

    // selecting FROM date

    if (toDay < fromDay) {
      if (dayTimestamp === toDay) {
        return 'from';
      }

      return dayTimestamp === fromDay
        ? 'to'
        : 'middle';
    }

    // selecting TO date

    if (dayTimestamp === toDay) {
      return 'to';
    }

    return dayTimestamp === fromDay
      ? 'from'
      : 'middle';
  };
};
