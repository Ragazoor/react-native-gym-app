export function formatDate(date: Date): string {
  // Format the date portion (yyyy-MM-dd)
  const dateTimePart = date.toISOString().split("Z")[0];

  // Get the timezone offset in minutes and format it to ±hh:mm
  const timezoneOffset = -date.getTimezoneOffset(); // In minutes
  const sign = timezoneOffset >= 0 ? "+" : "-";
  const hoursOffset = String(
    Math.floor(Math.abs(timezoneOffset) / 60)
  ).padStart(2, "0");
  const minutesOffset = String(Math.abs(timezoneOffset) % 60).padStart(2, "0");

  const offsetPart = `${sign}${hoursOffset}:${minutesOffset}`;

  // Combine date, time, and timezone offset
  return `${dateTimePart}${offsetPart}`;
}
