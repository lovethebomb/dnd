import React from "react";
import { CalendarProvider } from "./CalendarContext";
import CalendarHeader from "./CalendarHeader";
import CalendarDays from "./CalendarDays";
import CalendarCells from "./CalendarCells";
import CalendarForm from "./CalendarForm";

export type CalendarEvent = {
  date: Date;
  dateString: string;
  name: string;
  type: "normal" | "session" | "player"
};

export type CalendarWeekStartsOn = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type CalendarProps = {
  events: CalendarEvent[];
  weekStartsOn?: CalendarWeekStartsOn;
};

const Calendar: React.FunctionComponent<CalendarProps> = ({
  events,
  weekStartsOn = 1,
}) => (
  <div className="calendar">
    <CalendarProvider events={events} weekStartsOn={weekStartsOn}>
      <CalendarHeader />
      <CalendarDays />
      <CalendarCells />
      <CalendarForm />

    </CalendarProvider>
  </div>
);

export default Calendar;
