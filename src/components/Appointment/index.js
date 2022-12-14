import React from "react";
import './styles.scss'
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";


export default function Appointment({ student, interviewer, time, interview }) {

  return (
    <article className='appointment'>
      <Header time={time}/>
      {interview ? <Show student={student} interviewer={interviewer}/> : <Empty/>}
    </article>
  );

};
