import React from "react";
import './styles.scss'
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";


export default function Appointment({ student, interviewer, time, interview, interviewers, bookInterview, id, cancelInterview }) {

  const EMPTY = 'EMPTY';
  const SHOW = 'SHOW';
  const CREATE = 'CREATE';
  const SAVING = 'SAVING';
  const DELETING = 'DELETING';
  const VERIFY = 'VERIFY';
  const EDIT = 'EDIT';
  const ERROR_SAVE = 'ERROR_SAVE';
  const ERROR_DELETE = 'ERROR_DELETE';

  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );

  const saveAppointment = function (name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    }
    transition(SAVING)
    bookInterview(id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));
  }

  const removeAppointment = function () {
    transition(DELETING, true)
    cancelInterview(id)
      .then(() => transition(EMPTY))
      .catch(error => transition(ERROR_DELETE, true));
  }


  return (
    <article className='appointment'>
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SAVING && <Status message={SAVING} />}
      {mode === VERIFY &&
        <Confirm
          message={"Are you sure you would like to Delete?"}
          onConfirm={removeAppointment}
          onCancel={() => back()}
        />
      }
      {mode === ERROR_DELETE &&
        <Error
          message={"Sorry there was an error with the request"}
          onClose={() => back()}
        />
      }
      {mode === ERROR_SAVE &&
        <Error
          message={"Sorry there was an error with the request"}
          onClose={() => back()}
        />
      }
      {mode === DELETING && <Status message={DELETING} />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onDelete={() => transition(VERIFY)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form
          student={student}
          interviewers={interviewers}
          onCancel={back}
          onSave={saveAppointment}
        />
      )}
      {mode === EDIT && (
        <Form
          student={interview.student}
          interviewers={interviewers}
          interviewer={interview.interviewer.id}
          onCancel={back}
          onSave={saveAppointment}
        />
      )}
    </article>
  );

};
