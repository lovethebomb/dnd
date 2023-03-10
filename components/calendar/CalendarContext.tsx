import React, { MutableRefObject, useContext, useRef, useState } from "react";
import { addMonths, isLastDayOfMonth, subMonths, format } from "date-fns";
import { CalendarEvent, CalendarWeekStartsOn } from "./Calendar";
import { convertToDate, Player } from "../../lib/players";

type CalendarContextType = {
  events: CalendarEvent[];
  weekStartsOn: CalendarWeekStartsOn;
  currentMonth: Date;
  setCurrentMonth: (date: Date) => void;
  selectedDate: Date;
  prevMonth: () => void;
  nextMonth: () => void;
  // Player
  isSelecting: boolean;
  selectedPlayer: Player;
  setSelectedPlayer: (player: Player) => void;
  setSelectedDate: (date: Date) => void;
  selectedDates: MutableRefObject<Set<string>>;
  eventsForPlayer: MutableRefObject<Set<string>>;
  selectedEvents: MutableRefObject<Set<string>>;
  // Touch Events
  handleStart: (
    e: React.MouseEvent<HTMLDivElement>,
    dateString: string
  ) => void;
  handleMove: (e: React.MouseEvent<HTMLDivElement>, dateString: string) => void;
  handleEnd: (e: React.MouseEvent<HTMLDivElement>, dateString: string) => void;
  // Logic
  updateEvents: (player: Player, dates: string[]) => void;
  updateDates: (player: Player, dates: string[]) => Promise<{ data: { [x: string]: any; }[]; error: PostgrestError; }>
};

const CalendarContext = React.createContext<Partial<CalendarContextType>>({});

import { supabase } from "../../lib/supabaseClient";
import { PostgrestError } from "@supabase/supabase-js";

export const useCalendar = () => useContext(CalendarContext);

type CalendarProviderProps = {
  children: React.ReactNode;
  events: CalendarEvent[];
  weekStartsOn: CalendarWeekStartsOn;
};

export const CalendarProvider: React.FunctionComponent<
  CalendarProviderProps
> = ({ children, events, weekStartsOn }) => {
  const [calendarEvents, setEvents] = useState(events);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>();
  const selectedDates = useRef<Set<string>>(new Set());
  const isSelecting = useRef(false);
  const [_, setForceRender] = useState(false);

  const [selectedPlayer, setSelectedPlayer] = useState<Player>("");
  const eventsForPlayer = useRef<Set<string>>(new Set());
  const selectedEvents = useRef<Set<string>>(new Set());
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  console.debug("[provider] render");
  let firstTarget = null;
  let lastMoveTarget = null;
  const canSelectDates = true;

  // Touch events
  function handleStart(
    e: React.MouseEvent<HTMLDivElement>,
    dateString: string
  ) {
    if (!canSelectDates) {
      return;
    }

    isSelecting.current = true;
    firstTarget = e.currentTarget;

    if (selectedDates.current.has(dateString)) {
      selectedDates.current.delete(dateString);
      e.currentTarget.removeAttribute("data-selected");
    } else {
      selectedDates.current.add(dateString);
      e.currentTarget.setAttribute("data-selected", "true");
    }
  }

  function handleMove(e: React.MouseEvent<HTMLDivElement>, dateString: string) {
    if (!isSelecting.current) {
      return;
    }
    if (firstTarget === e.currentTarget) {
      return;
    }
    if (lastMoveTarget === e.currentTarget) {
      return;
    }

    lastMoveTarget = e.currentTarget;

    if (selectedDates.current.has(dateString)) {
      selectedDates.current.delete(dateString);
      e.currentTarget.removeAttribute("data-selected");
    } else {
      selectedDates.current.add(dateString);
      e.currentTarget.setAttribute("data-selected", "true");
    }
  }

  function handleEnd(e: React.MouseEvent<HTMLDivElement>, dateString: string) {
    if (!isSelecting.current) {
      return;
    }

    isSelecting.current = false;
    firstTarget = null;
    lastMoveTarget = null;
    console.debug("selected dates", selectedDates);
    updateSelectedEvents(selectedPlayer);
  }

  // Select Player
  function handleSetSelectedPlayer(player: Player) {
    console.debug("handleSetSelectedPlayer", player);
    setSelectedPlayer(player);
    updateSelectedEvents(player);
  }


  // Events
  function updateSelectedEvents(player: Player) {
    const eventsForPlayerFilter = calendarEvents.filter(
      (event) => event.type === "player" && event.name === player
    );
    const dateStrings = eventsForPlayerFilter.map((event) => event.dateString);
    eventsForPlayer.current = new Set(dateStrings);
    selectedEvents.current = new Set(
      dateStrings.filter((dateString) => selectedDates.current.has(dateString))
    );
    console.debug("updateSelectedEvents", {
      selectedPlayer,
      eventsForPlayerFilter: eventsForPlayerFilter.length,
      dateStrings,
      selectedEvents,
      eventsForPlayer,
      selectedDates: selectedDates.current.size,
    });
    // TODO: Optimize re-render
    setForceRender((prev) => !prev);
  }

  function updateEvents(player: Player, dates: string[]) {
    console.debug("updateEvents", player, dates);

    // Cleanup selectedDates
    selectedDates.current.clear();

    // Update events list with the new selectedDates
    const eventsWithoutPlayer = [
      ...calendarEvents.filter(
        (event) =>
          event.type !== "player" ||
          (event.type === "player" && event.name !== player)
      ),
    ];
    dates.forEach((playerDate) => {
      const { date, dateString } = convertToDate(playerDate);
      eventsWithoutPlayer.push({
        date,
        dateString,
        name: player,
        type: "player",
      });
    });

    setEvents(eventsWithoutPlayer);
    console.debug("updateEvents", { eventsWithoutPlayer });
  }

  // Database
  async function updateDates(player, dates) {
    const { data, error } = await supabase
      .from("player_dates")
      .upsert(
        {
          player,
          availability: { datesArray: dates },
        },
        { onConflict: "player" }
      )
      .select();

    return {
      data,
      error,
    };
  }

  return (
    <CalendarContext.Provider
      value={{
        events: calendarEvents,
        weekStartsOn,
        currentMonth,
        setCurrentMonth,
        selectedDate,
        setSelectedDate,
        prevMonth,
        nextMonth,
        // Player
        selectedPlayer,
        setSelectedPlayer: handleSetSelectedPlayer,
        eventsForPlayer,
        selectedDates,
        selectedEvents,
        // Touch events
        handleStart,
        handleMove,
        handleEnd,
        // Logic
        updateEvents,
        updateDates,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};
