import React, { useState } from "react";
import { useCalendar } from "./CalendarContext";
import { supabase } from "../../lib/supabaseClient";
import { PLAYER_COLORS } from "../../lib/players";

const DURATION_SAVED = 3000;

const CalendarForm: React.FunctionComponent = () => {
  const { weekStartsOn, currentMonth, selectedDates, selectedPlayer, setSelectedPlayer, updateEvents } = useCalendar();
  // const [playerName, setPlayerName] = useState("-1");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSaved, setHasSaved] = useState(false);

  let canSubmit = !isSubmitting && selectedPlayer !== "";

  async function submitForm(e) {
    e.preventDefault();
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData(e.target);
    const player = formData.get("player");
    if (player === "" || typeof player === null) {
      setIsSubmitting(false);
      return;
    }
    if (!selectedDates || !selectedDates.current) {
      return;
    }
    console.debug("submitForm:", {
      player,
      toSubmit: selectedDates.current.size,
    });
    const datesArray = Array.from(selectedDates.current)
    const { data, error } = await supabase
      .from("player_dates")
      .upsert(
        {
          player,
          availability: { datesArray },
        },
        { onConflict: "player" }
      )
      .select();
      updateEvents(player as string,  datesArray)

    setIsSubmitting(false);
    setHasSaved(true);
    console.debug("supabase complete", { data, error });

    setTimeout(() => {
      setHasSaved(false);
    }, DURATION_SAVED);
  }
  const playerColorStyle = {
    "--color-player": PLAYER_COLORS[selectedPlayer],
  } as React.CSSProperties;

  return (
    <form
      className="calendar-form"
      data-submitting={isSubmitting}
      data-saved={hasSaved}
      onSubmit={submitForm}
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
          <option value="Nesji">Nesji</option>
          <option value="Xendar">Xendar</option>
          <option value="Sharinn">Sharinn</option>
          <option value="Zerakos">Zerakos</option>
        </select>
        <button disabled={!canSubmit}>Save Dates</button>
        <span className="calendar-form-success">Saved!</span>
      </div>
    </form>
  );
};

export default CalendarForm;
