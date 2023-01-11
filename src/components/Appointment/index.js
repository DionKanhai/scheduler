import React from "react";
import './styles.scss'
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";


export default function Appointment({ student, interviewer, time, interview, interviewers, bookInterview, id }) {

  const EMPTY = 'EMPTY';
  const SHOW = 'SHOW';
  const CREATE = 'CREATE';
  const SAVING = 'SAVING';

  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );

  const save = function(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    }
    bookInterview(id, interview)
    transition(SAVING)
    .then(() => transition(SHOW))
  }

  return (
    <article className='appointment'>
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SAVING && <Status />}
      {mode === SHOW && (<Show student={interview.student} interviewer={interview.interviewer} />)}
      {mode === CREATE && (
        <Form
          student={student}
          interviewers={interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
    </article>
  );

};
