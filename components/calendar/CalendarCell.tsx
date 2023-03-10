import React, { MouseEventHandler, useCallback } from "react";
import { isSameDay, isSameMonth, isToday, format } from "date-fns";
import { useCalendar } from "./CalendarContext";
import CalendarEvent from "./CalendarEvent";
import { sortyByPlayerName } from "../../lib/players";

type Props = {
  date: Date;
};

const CalendarCell: React.FunctionComponent<Props> = ({ date }) => {
  const {
    events,
    currentMonth,
    setSelectedDate,
    handleStart,
    handleMove,
    handleEnd,
    selectedDates,
  } = useCalendar();

  if (!currentMonth || !setSelectedDate) return null;
  // const todayEvents = events.filter((event) => isSameDay(date, event.date))
  const todayEvents = [...events.filter((event) => isSameDay(date, event.date))]
  todayEvents.sort(sortyByPlayerName)

  const dateString = format(date, "yyyyMMdd");

  let classes = "calendar-cell";

  // console.debug('render cell', { dateString, selectedDates: selectedDates, current: selectedDates.current.has(dateString) })

  if (isToday(date)) {
    classes += " calendar-cell--today";
  }

  if (!isSameMonth(date, currentMonth)) {
    classes += " calendar-cell--disabled";
  }

  const onMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    return handleStart(e, dateString);
  }, [date]);
  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    return handleMove(e, dateString);
  }, [date]);
  const onMouseUp = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    return handleEnd(e, dateString);
  }, [date]);
  return (
    <div
      className={classes}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      data-testid="calendar-cell"
      data-selected={
        selectedDates.current && selectedDates.current.has(dateString)
      }
    >
      <div className="calendar-cell__date">{format(date, "d")}</div>
      {todayEvents &&
        todayEvents
          .map((event) => (
            <CalendarEvent
              key={`${event.name}-${format(event.date, "T")}`}
              event={event}
            />
          ))}
    </div>
  );
};

export default CalendarCell;
