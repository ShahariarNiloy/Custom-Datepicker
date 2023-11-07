import { Timestamp } from './types';

type CalendarWeek = Timestamp[]; // всегда 7 элементов
export type Calendar = CalendarWeek[];

type DateConstructValue = string | Timestamp | Date;

/**
 * @example
 * makeCalendar('2018-02-15')
 *
 * 29 30 31 01 02 03 04
 * 05 06 07 08 09 10 11
 * 12 13 14 15 16 17 18
 * 19 20 21 22 23 24 25
 * 26 27 28 01 02 03 04
 */
export const makeCalendar = (
  dateConstructValue: DateConstructValue,
): Calendar => {
  const dateIterator = new Date(dateConstructValue);
  const currentYear = dateIterator.getFullYear();

  if (Number.isNaN(currentYear)) {
    throw new TypeError('Invalid Date');
  }

  const currentMonth = dateIterator.getMonth();
  dateIterator.setDate(1);
  dateIterator.setHours(0, 0, 0, 0);
  const currentDay = dateIterator.getDay();
  const offsetDays = currentDay ? currentDay - 1 : 6;
  dateIterator.setDate(dateIterator.getDate() - offsetDays);
  const calendar: Calendar = [];

  while (
    currentMonth >= dateIterator.getMonth()
    || currentYear !== dateIterator.getFullYear()
  ) {
    if (currentYear < dateIterator.getFullYear()) {
      return calendar;
    }

    // is Monday
    if (dateIterator.getDay() === 1) {
      calendar.push(Array(7).fill(0));
    }

    const lastWeek = calendar[calendar.length - 1];

    lastWeek.forEach((_, index): void => {
      lastWeek[index] = dateIterator.getTime() as Timestamp;
      dateIterator.setDate(dateIterator.getDate() + 1);
    });
  }

  return calendar;
};
