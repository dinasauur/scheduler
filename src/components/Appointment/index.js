import React from 'react';

import 'components/Appointment/styles.scss';

import useVisualMode from 'hooks/useVisualMode';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';

const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const SAVING = 'SAVING';
const DELETING = 'DELETING';
const CONFIRM = 'CONFIRM';
const EDIT = 'EDIT';

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    // handle promise again because transition function is only available in this file
    props.bookInterview(props.id, interview).then(() => transition(SHOW));
    // .catch <-- handle error in case put request fails
  }

  function remove() {
    transition(DELETING);
    
    props.cancelInterview(props.id).then(() => transition(EMPTY));
  }

  //////////////// crazy error.... if i save an appointment with zero input, it crashes
  // In show mode, if user clicks on edit button, render the form component but with default student and interviewer
  // the default state would be the selected interviewer and student
  //// new mode? DONE
  //// return edit mode in component? DONE
  //// default state 
  //// pass onEdit to show component

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={()=> transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
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
      {mode === CONFIRM && 
        <Confirm 
        message='Are you sure you would like to delete?' 
        onCancel={back} 
        onConfirm={remove} 
        />}
      {mode === EDIT &&
        <Form 
        student={props.interview.student}
        interviewer={props.interview.interviewer.id}
        interviewers={props.interviewers} 
        onCancel={back} 
        onSave={save} 
        />
      }
    </article>
  );
}
