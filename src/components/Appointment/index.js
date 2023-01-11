import React from "react";
import './styles.scss'
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";


export default function Appointment({ student, interviewer, time, interview, interviewers, bookInterview, id, cancelInterview }) {

  const EMPTY = 'EMPTY';
  const SHOW = 'SHOW';
  const CREATE = 'CREATE';
  const SAVING = 'SAVING';
  const DELETING = 'DELETING';
  const VERIFY = 'VERIFY';

  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );

  const saveAppointment = function(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    }
    transition(SAVING)
    bookInterview(id, interview)
    .then(() => transition(SHOW))
  }

  const removeAppointment = function() {
    transition(DELETING)
    cancelInterview(id)
    .then(() => transition(EMPTY))
  }

  return (
    <article className='appointment'>
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SAVING && <Status message={SAVING}/>}
      {mode === VERIFY && <Confirm message={"Are you sure you would like to Delete?"} onConfirm={removeAppointment} onCancel={() => back()} />}
      {mode === DELETING && <Status message={DELETING}/>}
      {mode === SHOW && (<Show student={interview.student} interviewer={interview.interviewer} onDelete={() => transition(VERIFY)} />)}
      {mode === CREATE && (
        <Form
          student={student}
          interviewers={interviewers}
          onCancel={back}
          onSave={saveAppointment}
        />
      )}
    </article>
  );

};
