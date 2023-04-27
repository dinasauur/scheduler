import React, { useState } from 'react';
import InterviewerList from 'components/InterviewerList';
import Button from 'components/Button';

export default function Form(props) {
  const [student, setStudent] = useState(props.student || '');
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState('');

  const reset = () => {
    setStudent('');
    setInterviewer(null);
  };

  const cancel = () => {
    reset();
    props.onCancel();
  };

  function validate() {

    // code for checking student's name
    if (student === '') {
      setError('Student name cannot be blank');
      return;
    }

    // code for checking if interviewer is null
    if (interviewer === null) {
      setError('Please select an interviewer');
      return;
    }

    setError('');
    props.onSave(student, interviewer) // compass shows to use name instead of student
  };

  const onSubmit = (event) => event.preventDefault();

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form onSubmit={onSubmit} autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(event) => setStudent(event.target.value)}
            data-testid="student-name-input"
          />
          <section className="appointment__validation">{error}</section>
          <InterviewerList
            interviewers={props.interviewers}
            value={interviewer}
            onChange={setInterviewer}
          />
        </form>
      </section>

      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={cancel} danger>
            Cancel
          </Button>
          <Button onSubmit={onSubmit} onClick={validate} confirm>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
