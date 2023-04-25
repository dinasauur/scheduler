import React, { useState, useEffect } from 'react';
import axios from 'axios';

import 'components/Application.scss';
import DayList from './DayList';
import Appointment from './Appointment';
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from 'helpers/selectors';

export default function Application(props) {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
  });

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day);

  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);
  // when a component does not have any dependencies but we only want it to run once, we have to pass an empty array

  function bookInterview(id, interview) {
    console.log(id, interview);
    // interview object is passed from the save function in the Appointments component, which gets the info from Form component
    // this is when a user submits the form with their name and interviewer they selected
    // const newAppointment = {...state.appointments[id]}
    // newAppointment.interview = interview

    // what line 43 does is in line 39-40 broken down
    const appointment = {
      ...state.appointments[id], // create shallow copy of appointment with the id that user selected and adding in the interview object
      interview: { ...interview },
    };

    // what we want to do is now update the appointments object by replacing the existing record with our new appointment object
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    // make data persistent so that when we refresh browser, the saved data is not lost (it gets lost because we are only updating the state locally).
    // Use axios to make request to  API to update the appontment with the interview
    //// Two things to happen: 
    //// (promise handle in application.js) 1. save the new info to the database and setState for storing the new object for front end
    //// (promise handle in appointments/index.js) 2. Update the UI using transition function where it's calling props.bookInterview  
    return axios
    .put(`/api/appointments/${id}`, { interview }) // object notation because interview IS an object
    .then(() => {
        // save the new appointments object back into state
        setState({ ...state, appointments });
      });
  }

  // use appointment id to find the right appointment and set it's interview data to null
  function cancelInterview(id) {

   const appointment = {
    ...state.appointments[id],
    interview: null
   };

   const appointments = {
    ...state.appointments,
    [id]: appointment
   };

   setState({...state, appointments});
   // axios
  
  }

  const appointmentsArray = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
        key={appointment.id}
        {...appointment}
        interview={interview}
        interviewers={dailyInterviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

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
          <DayList days={state.days} value={state.day} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">{appointmentsArray}</section>
    </main>
  );
}
