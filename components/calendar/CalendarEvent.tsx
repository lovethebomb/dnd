import React from 'react';
import { PLAYER_COLORS } from '../../lib/players';
import { CalendarEvent as CalendarEventType } from './Calendar';

type Props = {
  event: CalendarEventType;
};

const CalendarEvent: React.FunctionComponent<Props> = ({ event }) => {
  if (event.type && event.type === "player") {
    const playerColorStyle = { "--color-player": PLAYER_COLORS[event.name] } as React.CSSProperties;
    return (<div className="calendar-event calendar-event--player" style={playerColorStyle}>{event.name}</div>)
  }
  return (<div className="calendar-event">{event.name}</div>)
}
;

export default CalendarEvent;
