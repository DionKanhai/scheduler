// this function takes a state and day as an input and returns the appointments array for the given day

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

/* this function takes a state and a interview as an 
input and returns an object that contains the interview data
if it is passed an object that contains an interviewer */
export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const interviewerID = interview.interviewer
  const interviewObj = {
    student: interview.student,
    interviewer: state.interviewers[interviewerID]
  };
  return interviewObj;
};



