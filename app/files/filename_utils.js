export function todayName() {
  return (new Date()).toLocaleString("ru", {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    timezone: 'UTC'
  });
}
