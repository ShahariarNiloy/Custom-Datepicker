import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Timestamp } from './types';

const startOfMonth = (monthTimestamp: Timestamp): Timestamp => {
  const date = new Date(monthTimestamp);
  date.setDate(1);
  return date.setHours(0, 0, 0, 0) as Timestamp;
};

const getNextMonthTimestamp = (monthTimestamp: Timestamp): Timestamp => {
  const currentDate = new Date(monthTimestamp);
  const nextDate = new Date(monthTimestamp);
  nextDate.setHours(0, 0, 0, 0);
  nextDate.setMonth(currentDate.getMonth() + 1, 1);

  return nextDate.getTime() as Timestamp;
};

const getPrevMonthTimestamp = (monthTimestamp: Timestamp): Timestamp => {
  const currentDate = new Date(monthTimestamp);
  const prevDate = new Date(monthTimestamp);
  prevDate.setHours(0, 0, 0, 0);
  prevDate.setMonth(currentDate.getMonth() - 1, 1);

  return prevDate.getTime() as Timestamp;
};

export const useCalendarMonth = (timestamp: Timestamp) => {
  const monthTimestamp = useMemo(() => startOfMonth(timestamp), [timestamp]);
  const [currentMonthTimestamp, setCurrentMonthTimestamp] = useState(monthTimestamp);

  const onPrevMonth = useCallback(() => {
    setCurrentMonthTimestamp((state) => getPrevMonthTimestamp(state));
  }, []);

  const onNextMonth = useCallback(() => {
    setCurrentMonthTimestamp((state) => getNextMonthTimestamp(state));
  }, []);

  useEffect(
    () => {
      setCurrentMonthTimestamp(monthTimestamp);
    },
    [monthTimestamp],
  );

  return {
    currentMonthTimestamp,
    prevMonthTimestamp: getPrevMonthTimestamp(currentMonthTimestamp),
    nextMonthTimestamp: getNextMonthTimestamp(currentMonthTimestamp),
    onPrevMonth,
    onNextMonth,
  };
};
