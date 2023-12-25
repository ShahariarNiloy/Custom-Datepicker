import { useCallback, useEffect, useMemo, useState } from "react";
import { Timestamp } from "../types";

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

const getNextYearTimestamp = (monthTimestamp: Timestamp): Timestamp => {
  const currentDate = new Date(monthTimestamp);
  const nextDate = new Date(monthTimestamp);
  nextDate.setHours(0, 0, 0, 0);
  nextDate.setFullYear(
    currentDate.getFullYear() + 1,
    currentDate.getMonth(),
    1
  );

  return nextDate.getTime() as Timestamp;
};

const getPrevYearTimestamp = (monthTimestamp: Timestamp): Timestamp => {
  const currentDate = new Date(monthTimestamp);
  const prevDate = new Date(monthTimestamp);
  prevDate.setHours(0, 0, 0, 0);
  prevDate.setFullYear(
    currentDate.getFullYear() - 1,
    currentDate.getMonth(),
    1
  );

  return prevDate.getTime() as Timestamp;
};

const getNextTenYearTimestamp = (monthTimestamp: Timestamp): Timestamp => {
  const currentDate = new Date(monthTimestamp);
  const nextDate = new Date(monthTimestamp);
  nextDate.setHours(0, 0, 0, 0);
  nextDate.setFullYear(
    currentDate.getFullYear() + 10,
    currentDate.getMonth(),
    1
  );

  return nextDate.getTime() as Timestamp;
};

const getPrevTenYearTimestamp = (monthTimestamp: Timestamp): Timestamp => {
  const currentDate = new Date(monthTimestamp);
  const prevDate = new Date(monthTimestamp);
  prevDate.setHours(0, 0, 0, 0);
  prevDate.setFullYear(
    currentDate.getFullYear() - 10,
    currentDate.getMonth(),
    1
  );

  return prevDate.getTime() as Timestamp;
};

const getNextHundredYearTimestamp = (monthTimestamp: Timestamp): Timestamp => {
  const currentDate = new Date(monthTimestamp);
  const nextDate = new Date(monthTimestamp);
  nextDate.setHours(0, 0, 0, 0);
  nextDate.setFullYear(
    currentDate.getFullYear() + 100,
    currentDate.getMonth(),
    1
  );

  return nextDate.getTime() as Timestamp;
};

const getPrevHundredYearTimestamp = (monthTimestamp: Timestamp): Timestamp => {
  const currentDate = new Date(monthTimestamp);
  const prevDate = new Date(monthTimestamp);
  prevDate.setHours(0, 0, 0, 0);
  prevDate.setFullYear(
    currentDate.getFullYear() - 100,
    currentDate.getMonth(),
    1
  );

  return prevDate.getTime() as Timestamp;
};

export const useCalendarMonth = (timestamp: Timestamp) => {
  const monthTimestamp = useMemo(() => startOfMonth(timestamp), [timestamp]);
  const [currentMonthTimestamp, setCurrentMonthTimestamp] =
    useState(monthTimestamp);

  const onPrevMonth = useCallback(() => {
    setCurrentMonthTimestamp((state) => getPrevMonthTimestamp(state));
  }, []);

  const onNextMonth = useCallback(() => {
    setCurrentMonthTimestamp((state) => getNextMonthTimestamp(state));
  }, []);

  const onPrevYear = useCallback(() => {
    setCurrentMonthTimestamp((state) => getPrevYearTimestamp(state));
  }, []);

  const onNextYear = useCallback(() => {
    setCurrentMonthTimestamp((state) => getNextYearTimestamp(state));
  }, []);

  const onPrevTenYear = useCallback(() => {
    setCurrentMonthTimestamp((state) => getPrevTenYearTimestamp(state));
  }, []);

  const onNextTenYear = useCallback(() => {
    setCurrentMonthTimestamp((state) => getNextTenYearTimestamp(state));
  }, []);

  const onPrevHundredYear = useCallback(() => {
    setCurrentMonthTimestamp((state) => getPrevHundredYearTimestamp(state));
  }, []);

  const onNextHundredYear = useCallback(() => {
    setCurrentMonthTimestamp((state) => getNextHundredYearTimestamp(state));
  }, []);

  useEffect(() => {
    setCurrentMonthTimestamp(monthTimestamp);
  }, [monthTimestamp]);

  return {
    currentMonthTimestamp,
    prevMonthTimestamp: getPrevMonthTimestamp(currentMonthTimestamp),
    nextMonthTimestamp: getNextMonthTimestamp(currentMonthTimestamp),
    onPrevMonth,
    onNextMonth,
    onPrevYear,
    onNextYear,
    onPrevTenYear,
    onNextTenYear,
    onPrevHundredYear,
    onNextHundredYear,
  };
};
