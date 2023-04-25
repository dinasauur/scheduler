import React from 'react';

import 'components/Appointment/styles.scss';

import useVisualMode from 'hooks/useVisualMode';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';

export default function Appointment(props) {
  const EMPTY = 'EMPTY';
  const SHOW = 'SHOW';
  const CREATE = 'CREATE';
  const SAVING = 'SAVING';
  const DELETING = 'DELETING';

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };

    transition(SAVING);

    // handle promise again because transition function is only available in this file
    props.bookInterview(props.id, interview).then(() => transition(SHOW));
    // .catch <-- handle error in case put request fails
  }

  function remove() {
    transition(DELETING);
  
    props.cancelInterview(props.id).then(() => transition(EMPTY))
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={remove}
        />
      )}
      {mode === CREATE && (
        <Form 
        interviewers={props.interviewers} 
        onCancel={back} 
        onSave={save} 
        />
      )}
      {mode === SAVING && <Status message="Saving..." />}
      {mode === DELETING && <Status message="Deleting..." />}
    </article>
  );
}
