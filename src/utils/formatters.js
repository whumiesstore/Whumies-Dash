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

