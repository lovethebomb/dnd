import React, { useState } from "react";
import { useCalendar } from "./CalendarContext";
import { Player, PLAYER_COLORS } from "../../lib/players";

const DURATION_SAVED = 3000;

const CalendarForm: React.FunctionComponent = () => {
  const {
    localEvents,
    calendarEvents,
    selectedDates,
    selectedPlayer,
    setSelectedPlayer,
    updateEvents,
    eventsForPlayer,
    selectedEvents,
    updateDates,
  } = useCalendar();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSaved, setHasSaved] = useState(false);

  let canAdd =
    !isSubmitting && selectedPlayer !== "" && selectedDates.current.size > 0;
  let canDelete =
    !isSubmitting &&
    selectedPlayer !== "" &&
    selectedEvents.current.size > 0 &&
    selectedDates.current.size === selectedEvents.current.size;

  function validate() {
    if (isSubmitting) {
      return false;
    }

    if (selectedPlayer === "" || typeof selectedPlayer === null) {
      return false;
    }

    if (!selectedDates || !selectedDates.current) {
      return false;
    }
    return true;
  }

  async function handleSubmit(player: Player, dates: string[]) {
    // FIXME: do we really need sorting? its just nicer
    dates.sort();

    const { data, error } = await updateDates(player, dates);
    updateEvents(player as string, dates);

    setIsSubmitting(false);
    setHasSaved(true);
    console.debug("[handleSubmit] complete", { data, error });

    setTimeout(() => {
      setHasSaved(false);
    }, DURATION_SAVED);
  }

  async function addDates(e) {
    console.debug("[addDates] start");
    e.preventDefault();

    if (!validate) {
      setIsSubmitting(false);
      setHasSaved(false);
    }

    setIsSubmitting(true);

    const cloneSelectedDates = new Set(selectedDates.current);
    calendarEvents.forEach((event) => {
      if (event.type === "player" && event.name === selectedPlayer) {
        cloneSelectedDates.add(event.dateString);
      }
    });

    console.debug("[addDates] submit", {
      player: selectedPlayer,
      toSubmit: cloneSelectedDates,
    });

    const datesArray = Array.from(cloneSelectedDates);
    try {
      return handleSubmit(selectedPlayer, datesArray);
    } catch (e) {
      setIsSubmitting(false);
      setHasSaved(false);
    }
  }

  async function deleteDates(e) {
    console.debug("[deleteDates] start");
    e.preventDefault();

    if (!validate) {
      setIsSubmitting(false);
      setHasSaved(false);
    }

    setIsSubmitting(true);

    // copy all original events
    const cloneEventsForPlayer = new Set(eventsForPlayer.current);

    console.debug("selectedEvents", cloneEventsForPlayer);

    Array.from(selectedEvents.current).forEach((event) => {
      cloneEventsForPlayer.delete(event);
    });

    console.debug("[deleteDates] submit", {
      selectedPlayer,
      toSubmit: cloneEventsForPlayer,
    });
    const datesArray = Array.from(cloneEventsForPlayer);

    try {
      return handleSubmit(selectedPlayer, datesArray);
    } catch (e) {
      setIsSubmitting(false);
      setHasSaved(false);
    }
  }

  const playerColorStyle = {
    "--color-player": PLAYER_COLORS[selectedPlayer],
  } as React.CSSProperties;

  return (
    <form
      className="calendar-form"
      data-submitting={isSubmitting}
      data-saved={hasSaved}
      onSubmit={addDates}
    >
      <div>
        <span
          className="calendar-form-color-player"
          style={playerColorStyle}
        ></span>
        <select
          name="player"
          value={selectedPlayer}
          onChange={(e) => setSelectedPlayer(e.target.value)}
        >
          <option value="">Choose player to update...</option>
          <option value="Droop">Droop</option>
          <option value="Nesji">Nesji</option>
          <option value="Xendar">Xendar</option>
          <option value="Sharinn">Sharinn</option>
          <option value="Zerakos">Zerakos</option>
        </select>
        <button type="submit" className="calendar-form-add" disabled={!canAdd}>
          Add
        </button>
        <button
          onClick={deleteDates}
          className="calendar-form-delete"
          disabled={!canDelete}
        >
          Delete
        </button>
        <span className="calendar-form-success">Saved!</span>
      </div>
    </form>
  );
};

export default CalendarForm;
