export function parseDateFromString(dateString: string): Date | null {
  const [day, month, year] = dateString.split("-");
  if (!day || !month || !year) return null;
  return new Date(Number(year), Number(month) - 1, Number(day));
}
