import React, {
  MutableRefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { addMonths, isLastDayOfMonth, subMonths, format, sub } from "date-fns";
import { CalendarEvent, CalendarWeekStartsOn } from "./Calendar";
import {
  convertToDate,
  Player,
  transformAvailibility,
  transformChangeAvailibility,
} from "../../lib/players";

type CalendarContextType = {
  localEvents: CalendarEvent[];
  calendarEvents: CalendarEvent[];
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
  updateDates: (
    player: Player,
    dates: string[]
  ) => Promise<{ data: { [x: string]: any }[]; error: PostgrestError }>;
  isToday: (date: Date|number) => boolean
};

const CalendarContext = React.createContext<Partial<CalendarContextType>>({});

import { supabase } from "../../lib/supabaseClient";
import { PostgrestError } from "@supabase/supabase-js";
import { isToday as DateFnsIsToday } from "date-fns";

export const useCalendar = () => useContext(CalendarContext);

type CalendarProviderProps = {
  children: React.ReactNode;
  localEvents: CalendarEvent[];
  weekStartsOn: CalendarWeekStartsOn;
};

export const CalendarProvider: React.FunctionComponent<
  CalendarProviderProps
> = ({ children, localEvents, weekStartsOn }) => {
  const [calendarEvents, setEvents] = useState([]);
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
  const [loadingInitial, setLoadingInitial] = useState(true)


  let subscription = null;
  useEffect(() => {
    getInitialEvents();

    return () => {
      subscription.unsubscribe();
      console.log(
        "Remove supabase subscription by useEffect unmount",
        subscription
      );
    };
  }, []);

  console.debug("[provider] render", subscription, calendarEvents, localEvents);
  let firstTarget = null;
  let lastMoveTarget = null;
  let beforeLastMoveTarget = null;
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
    lastMoveTarget = e.currentTarget;

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


    /*

    Cell   Cell
    */
   let cellToUpdate = e.currentTarget
   if (beforeLastMoveTarget === e.currentTarget) {
    console.debug('going back!')
   }

    if (lastMoveTarget !== beforeLastMoveTarget) {
      beforeLastMoveTarget = lastMoveTarget
    }
    lastMoveTarget = e.currentTarget;

    console.debug('handleMove', {
      firstTarget,
      lastMoveTarget,
      beforeLastMoveTarget,
      cellToUpdate
    })

    if (selectedDates.current.has(dateString)) {
      selectedDates.current.delete(dateString);
      cellToUpdate.removeAttribute("data-selected");
    } else {
      selectedDates.current.add(dateString);
      cellToUpdate.setAttribute("data-selected", "true");
    }
  }

  function handleEnd(e: React.MouseEvent<HTMLDivElement>, dateString: string) {
    if (!isSelecting.current) {
      return;
    }

    isSelecting.current = false;
    firstTarget = null;
    lastMoveTarget = null;
    beforeLastMoveTarget = null;
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
    console.debug(
      "[updateSelectedEvents] eventsForPlayerFilter",
      eventsForPlayerFilter
    );
    const dateStrings = eventsForPlayerFilter.map((event) => event.dateString);
    console.debug("[updateSelectedEvents] dateStrings", dateStrings);
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
    updateSelectedEvents(player);
  }

  // Database
  const onSubscriptionChange = (payload) => {
    setEvents((previousEvents) => {
      const player = payload.new.player;
      const newEvents = transformChangeAvailibility(payload.new.availability);
      console.debug("onSubscriptionChange", {
        previousEvents,
        player,
        newEvents,
      });

      // Cleanup selectedDates
      // selectedDates.current.clear();

      const eventsWithoutPlayer = [
        ...previousEvents.filter(
          (event) =>
            event.type !== "player" ||
            (event.type === "player" && event.name !== player)
        ),
      ];
      newEvents.forEach((playerDate) => {
        const { date, dateString } = convertToDate(playerDate);
        eventsWithoutPlayer.push({
          date,
          dateString,
          name: player,
          type: "player",
        });
      });

      return eventsWithoutPlayer;
    });
  }

  const fetchInitialEvents = async () => {
    if (!calendarEvents.length) {
      let { data, error } = await supabase.from("player_dates").select();

      if (error) {
        // TODO:
        console.error("[supabase] could not load initial events");
      }

      let transformedPlayerDates = data.map((entry) => ({
        player: entry.player,
        events: transformAvailibility(entry.availability),
      }));
      let events = [];
      for (let playerDate of transformedPlayerDates) {
        playerDate.events.forEach((item) => {
          events.push({
            date: item.date,
            dateString: item.dateString,
            name: playerDate.player,
            type: "player",
          });
        });
      }
      setEvents(state => {
        state = events
        return events
      });
    }
  }

  const getInitialEvents = async () => {
    if (!subscription) {
      fetchInitialEvents()
      subscription = supabase
        .channel("table-db-changes")
        .on(
          "postgres_changes",
          {
            event: "UPDATE",
            schema: "public",
            table: "player_dates",
          },
          (payload) => {
            onSubscriptionChange(payload);
          }
        )
        .subscribe();
    }
  };

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

  function isToday(date: Date|number) {
    return DateFnsIsToday(date)
  }



  return (
    <CalendarContext.Provider
      value={{
        localEvents,
        calendarEvents,
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
        // date-fns
        isToday
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};
