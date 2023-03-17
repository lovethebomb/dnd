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
  localEvents: CalendarEvent[];
  weekStartsOn?: CalendarWeekStartsOn;
};

const Calendar: React.FunctionComponent<CalendarProps> = ({
  localEvents,
  weekStartsOn = 1,
}) => {
  return (
  <div className="calendar">
    <CalendarProvider localEvents={localEvents} weekStartsOn={weekStartsOn}>
      <CalendarHeader />
      <CalendarDays />
      <CalendarCells />
      <CalendarForm />

    </CalendarProvider>
  </div>
)};

export default Calendar;
