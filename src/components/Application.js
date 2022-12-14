import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import axios from "axios";


export default function Application(props) {

  const [day, setDay] = useState('Monday')
  const [days, setDays] = useState([])

  useEffect(() => {
    const daysURL = `http://localhost:8001/api/days`;
    axios.get(daysURL).then(response => {
      setDays(response.data)
    })
  },[]);

  const appointmentsData = days.map((appointment) => {
    return (
    <Appointment
      key={appointment.id}
      {...appointment}
    />
    )
  })


  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={days}
            value={day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentsData}
      </section>
    </main>
  );
}
