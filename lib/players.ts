export const PLAYER_COLORS = {
  Droop: "#f2f2f2",
  Nesji: "#ffc107",
  Xendar: "#03a9f4",
  Sharinn: "#4caf50",
  Zerakos: "#f44336",
};

export type Player = string;
export type Availability = {
  datesArray: string[];
};

export function convertToDate(dateString: string) {
  const year = ~~dateString.substr(0, 4);
  const month = ~~dateString.substr(4, 2);
  const day = ~~dateString.substr(6, 2);
  const date = new Date(year, month - 1, day);
  return { date, dateString };
}

export function transformAvailibility(availability: Availability | null) {
  if (!availability) {
    return [];
  }
  if (availability && !availability.datesArray) {
    return [];
  }
  if (availability && availability.datesArray.length < 1) {
    return [];
  }

  return availability.datesArray.map(convertToDate);
}

export function sortyByPlayerName(a, b) {
  if (a.name < b.name) return -1;
  if (a.name > b.name) return 1;
  return 0;
}
