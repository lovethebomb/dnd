import React, {
  MutableRefObject,
  useContext,
  useRef,
  useState,
} from "react";
import { addMonths, isLastDayOfMonth, subMonths, format } from "date-fns";
import { CalendarEvent, CalendarWeekStartsOn } from "./Calendar";
import { convertToDate, Player } from "../../lib/players";

type CalendarContextType = {
  events: CalendarEvent[];
  weekStartsOn: CalendarWeekStartsOn;
  currentMonth: Date;
  setCurrentMonth: (date: Date) => void;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  selectedPlayer: Player,
  setSelectedPlayer: (player: Player) => void,
  selectedDates: MutableRefObject<Set<string>>;
  prevMonth: () => void;
  nextMonth: () => void;
  isSelecting: boolean;
  updateEvents: (player: Player, dates: string[]) => void,
  handleStart: (
    e: React.MouseEvent<HTMLDivElement>,
    dateString: string
  ) => void;
  handleMove: (e: React.MouseEvent<HTMLDivElement>, dateString: string) => void;
  handleEnd: (e: React.MouseEvent<HTMLDivElement>, dateString: string) => void;
};

const CalendarContext = React.createContext<Partial<CalendarContextType>>({});

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
  const [_, setForceRender] = useState(false)

  const [selectedPlayer, setSelectedPlayer] = useState<Player>("");
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  console.debug("[provider] render");
  let firstTarget = null;
  let lastMoveTarget = null;
  const canSelectDates = selectedPlayer && selectedPlayer !== ""

  // Methods
  function handleStart(
    e: React.MouseEvent<HTMLDivElement>,
    dateString: string
  ) {
    if (!canSelectDates) {
      return
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
    // setForceRender((prev) => !prev)
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
    // setForceRender((prev) => !prev)
  }

  function handleEnd(e: React.MouseEvent<HTMLDivElement>, dateString: string) {
    if (!isSelecting.current) {
      return;
    }

    isSelecting.current = false;
    firstTarget = null;
    lastMoveTarget = null;
    console.debug("selected dates", selectedDates);
  }

  function handleSetSelectedPlayer(player: Player) {
    setSelectedPlayer(player)
    // Convert events to selectedDates
    const eventsForPlayer = events.filter(event => event.type === "player" && event.name === player)
    console.debug('all events for player', { player, eventsForPlayer })
    console.debug('selectedDates', selectedDates.current)
    selectedDates.current.clear()
    console.debug('selectedDates after clear', selectedDates.current)
    // selectedDates.current = new Set(eventsForPlayer.map(event => event.dateString))
    console.debug('selectedDates events', selectedDates.current)
    // setForceRender((prev) => !prev)
  }

  function updateEvents(player: Player, dates: string[]) {
    console.debug('updateEvents', player, dates)
    // Update events list with the new selectedDates
    const eventsWithoutPlayer = events.filter(event => event.type !== "player" || (event.type === "player" && event.name !== player))
    dates.forEach(playerDate => {
      const { date, dateString } = convertToDate(playerDate)
      eventsWithoutPlayer.push({ date, dateString, name: player, type: "player" })
    })

    setEvents(eventsWithoutPlayer)
    console.debug('updateEvents', { eventsWithoutPlayer })
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
        selectedPlayer,
        setSelectedPlayer: handleSetSelectedPlayer,
        selectedDates,
        handleStart,
        handleMove,
        handleEnd,
        updateEvents
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};
