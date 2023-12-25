import { Timestamp } from "./types";

export const isCurrentMonth = (
  monthTimestamp: Timestamp,
  dayTimestamp: Timestamp
): boolean => {
  const monthDate = new Date(monthTimestamp);
  const date = new Date(dayTimestamp);
  return monthDate.getMonth() === date.getMonth();
};

export const startOfDay = (dayTimestamp: Timestamp): Timestamp => {
  const date = new Date(dayTimestamp);
  return date.setHours(0, 0, 0, 0) as Timestamp;
};

export const lastDateOfMonth = (dayTimestamp: Timestamp): number => {
  const date = new Date(dayTimestamp);
  date.setMonth(date.getMonth() + 1, 1);
  date.setDate(0);
  return date.getDate();
};

export const displayDay = (timestamp: Timestamp): string => {
  const date = new Date(timestamp);
  return `0${date.getDate()}`.slice(-2);
};

export const displayYear = (timestamp: Timestamp): string => {
  const date = new Date(timestamp);
  return `${date.getFullYear()}`;
};

export const displayTenYear = (timestamp: Timestamp): string => {
  const date = new Date(timestamp);
  return `${date.getFullYear()} - ${date.getFullYear() + 9}`;
};

export const displayMonth = (timestamp: Timestamp): string => {
  const date = new Date(timestamp); // Convert seconds to milliseconds
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const monthIndex = date.getMonth();
  return monthNames[monthIndex];
};

export const checkInRange = (target: number, range: number[]): boolean => {
  const [min = 0, max = 0] = range;

  return target >= min && target <= max;
};
