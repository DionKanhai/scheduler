import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  });


  const setDay = day => setState({ ...state, day });


  useEffect(() => {
    const daysURL = `http://localhost:8001/api/days`;
    const appointmentsURL = `http://localhost:8001/api/appointments`;
    const interviewersURL = `http://localhost:8001/api/interviewers`;
    Promise.all([
      axios.get(daysURL),
      axios.get(appointmentsURL),
      axios.get(interviewersURL)
    ]).then((all) => {
      setState(prev => (({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data })))
    })
  }, []);

  const updateSpots = function (id, appointments) {
    // find the day that we want to book or cancel our appointment and see if it includes the
    // appointment id 
    const foundDay = state.days.find((day) => day.appointments.includes(id));
    const foundIndex = state.days.findIndex((day) => day.appointments.includes(id));

    let spots = 0;
    if (!foundDay) {
      return state.days;
    }

    for (const id of foundDay.appointments) {
      if (appointments[id].interview === null) {
        spots++
      }
    }
    const days = [
      ...state.days
    ]
    days[foundIndex] = { ...days[foundIndex], spots }
    return days
  }

  const bookInterview = function (id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const days = updateSpots(id, appointments);
    const interviewDataFromAPI = `/api/appointments/${id}`;
    return axios.put(interviewDataFromAPI, { interview })
      .then(() => {
        setState((prev) => {
          return {
            ...prev, appointments, days
          }
        })
      })
  };

  const cancelInterview = function (id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }
    const days = updateSpots(id, appointments)
    const interviewDataFromAPI = `/api/appointments/${id}`;
    return axios.delete(interviewDataFromAPI)
      .then(() => {
        setState((prev) => {
          return {
            ...prev, appointments, days
          }
        })
      })
  }
  return { cancelInterview, bookInterview, setDay, state }
}
