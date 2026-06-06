export function formatMonthYear(date) {
  return date
    .toLocaleString("en-US", { month: "short", year: "numeric" })
    .toUpperCase();
}

export function formatLongMonthYear(date) {
  return date.toLocaleString("en-US", { month: "long", year: "numeric" });
}

export function formatMonthDay(date) {
  return date.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
  });
}

export function formatShortMonthDay(date) {
  const month = date.toLocaleString("en-US", { month: "short" });
  const day = date.getDate();

  return `${month} ${day}`;
}

export function formatFullDate(date) {
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}



