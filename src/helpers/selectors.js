export function getAppointmentsForDay(state, day) {
  const foundDay = state.days.find((element) => element.name === day);
  if (!foundDay) {
    return [];
  }
  const results = [];
  for (const id of foundDay.appointments) {
    results.push(state.appointments[id])
  }
  return results;
}