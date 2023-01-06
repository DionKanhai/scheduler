import React from "react";
import './styles.scss'
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";


export default function Appointment({ student, interviewer, time, interview, interviewers }) {

  const EMPTY = 'EMPTY';
  const SHOW = 'SHOW';
  const CREATE = 'CREATE';

  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );


  return (
    <article className='appointment'>
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (<Show student={interview.student} interviewer={interview.interviewer} />)}
      {mode === CREATE && (<Form student={student} interviewers={interviewers} onCancel={() => back()} />)}
    </article>
  );

};
