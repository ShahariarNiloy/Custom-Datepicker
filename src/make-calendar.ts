/* eslint-disable no-case-declarations */
import { Timestamp } from "./types";

type CalendarWeek = Timestamp[];
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
  dateConstructValue: DateConstructValue
): Calendar => {
  const dateIterator = new Date(dateConstructValue);
  const currentYear = dateIterator.getFullYear();

  if (Number.isNaN(currentYear)) {
    throw new TypeError("Invalid Date");
  }

  const currentMonth = dateIterator.getMonth();
  dateIterator.setDate(1);
  dateIterator.setHours(0, 0, 0, 0);
  const currentDay = dateIterator.getDay();
  const offsetDays = currentDay ? currentDay - 1 : 6;
  dateIterator.setDate(dateIterator.getDate() - offsetDays);
  const calendar: Calendar = [];

  while (
    currentMonth >= dateIterator.getMonth() ||
    currentYear !== dateIterator.getFullYear()
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

export const makeMonthCalendar = (
  dateConstructValue: DateConstructValue
): Calendar => {
  const dateIterator = new Date(dateConstructValue);
  const currentYear = dateIterator.getFullYear();

  if (Number.isNaN(currentYear)) {
    throw new TypeError("Invalid Date");
  }

  const calendar: Timestamp[] = [];
  dateIterator.setMonth(0);

  for (let i = 0; i < 12; i++) {
    dateIterator.setMonth(i);
    dateIterator.setDate(1);
    dateIterator.setHours(0, 0, 0, 0);

    calendar[i] = dateIterator.getTime() as Timestamp;
  }

  const monthCalendar = Array.from({ length: 4 }, (_, rowIndex) =>
    Array.from(
      { length: 3 },
      (_, colIndex) => calendar[rowIndex * 3 + colIndex]
    )
  );

  return monthCalendar;
};

export const makeTenYearCalendar = (
  dateConstructValue: DateConstructValue
): Calendar => {
  const dateIterator = new Date(dateConstructValue);
  const currentYear = dateIterator.getFullYear();
  const currentMonth = dateIterator.getMonth();
  const currentDate = dateIterator.getDate();

  if (Number.isNaN(currentYear)) {
    throw new TypeError("Invalid Date");
  }
  const calendar: Timestamp[] = [];
  const startYear = Math.floor(currentYear / 10) * 10;
  dateIterator.setMonth(currentMonth);
  dateIterator.setDate(currentDate);

  for (let i = 0; i < 10; i++) {
    dateIterator.setFullYear(i + startYear);
    calendar[i] = dateIterator.getTime() as Timestamp;
  }

  const monthCalendar = Array.from({ length: 4 }, (_, rowIndex) =>
    Array.from(
      { length: 3 },
      (_, colIndex) => calendar[rowIndex * 3 + colIndex]
    )
  );

  return monthCalendar;
};

export const makeHundredYearCalendar = (
  dateConstructValue: DateConstructValue
): Calendar => {
  const dateIterator = new Date(dateConstructValue);
  const currentYear = dateIterator.getFullYear();
  const currentMonth = dateIterator.getMonth();
  const currentDate = dateIterator.getDate();

  if (Number.isNaN(currentYear)) {
    throw new TypeError("Invalid Date");
  }
  const calendar: Timestamp[] = [];
  const startYear = Math.floor(currentYear / 100) * 100;
  dateIterator.setMonth(currentMonth);
  dateIterator.setDate(currentDate);

  for (let i = 0; i < 10; i++) {
    dateIterator.setFullYear(i * 10 + startYear);
    calendar[i] = dateIterator.getTime() as Timestamp;
  }

  const monthCalendar = Array.from({ length: 4 }, (_, rowIndex) =>
    Array.from(
      { length: 3 },
      (_, colIndex) => calendar[rowIndex * 3 + colIndex]
    )
  );

  return monthCalendar;
};

export const makeCustomCalendar = (
  dateConstructValue: DateConstructValue,
  calendarType: "day" | "month" | "tenYear" | "hundredYear"
): Calendar => {
  const dateIterator = new Date(dateConstructValue);
  const currentYear = dateIterator.getFullYear();
  const currentMonth = dateIterator.getMonth();
  // const currentDate = dateIterator.getDate();

  if (Number.isNaN(currentYear)) {
    throw new TypeError("Invalid Date");
  }

  const calendar: Calendar = [];
  // let startValue: number;

  switch (calendarType) {
    case "month":
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 3; j++) {
          dateIterator.setMonth(i * 3 + j);
          dateIterator.setDate(1);
          dateIterator.setHours(0, 0, 0, 0);

          calendar[i][j] = dateIterator.getTime() as Timestamp;
        }
      }

      return calendar;

    // case "tenYear":
    //   startValue = Math.floor(currentYear / 10) * 10;
    //   for (let i = 0; i < 10; i++) {
    //     dateIterator.setFullYear(i + startValue);
    //     calendar[i] = dateIterator.getTime() as Timestamp;
    //   }
    //   break;

    case "day":
    default:
      dateIterator.setDate(1);
      dateIterator.setHours(0, 0, 0, 0);
      const currentDay = dateIterator.getDay();
      const offsetDays = currentDay ? currentDay - 1 : 6;
      dateIterator.setDate(dateIterator.getDate() - offsetDays);

      while (
        currentMonth >= dateIterator.getMonth() ||
        currentYear !== dateIterator.getFullYear()
      ) {
        if (currentYear < dateIterator.getFullYear()) {
          return calendar;
        }

        if (dateIterator.getDay() === 1) {
          calendar.push(Array(7).fill(0));
        }

        const lastWeek = calendar[calendar.length - 1];

        lastWeek.forEach((_, index): void => {
          lastWeek[index] = dateIterator.getTime() as Timestamp;
          dateIterator.setDate(dateIterator.getDate() + 1);
        });
      }
      return calendar as Calendar;
  }

  // const monthCalendar = Array.from({ length: 4 }, (_, rowIndex) =>
  //   Array.from(
  //     { length: 3 },
  //     (_, colIndex) => calendar[rowIndex * 3 + colIndex]
  //   )
  // );

  // return monthCalendar as Calendar;
};
