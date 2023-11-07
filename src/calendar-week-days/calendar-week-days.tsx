import { FC, memo } from "react";
import "./calendar-week-days.css";

const date = new Date(1970, 0, 4);
const days = Array.from({ length: 7 }, () => {
  date.setDate(date.getDate() + 1);
  return date.toLocaleDateString("en", { weekday: "long" }).toLowerCase();
});

const CalendarWeekDays: FC = () => (
  <tr className="calendar-week-days">
    {days.map((day) => (
      <td key={day} className="calendar-week-day" abbr={day}>
        {day.toUpperCase()[0]}
      </td>
    ))}
  </tr>
);

const CalendarWeekDaysMemo = memo(CalendarWeekDays, () => true);
export { CalendarWeekDaysMemo as CalendarWeekDays };
