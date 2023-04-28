import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useApplicationData() {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
  });

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

  // Where is the value of "spots" stored for each day?
  //// dayList update spots: [length of appointments] --> max 5.

  // How can we calculate how many spots should be available?
  //// 5 - appointments.intervies.length

  // When should that value change?
  //// value should change whenever an appointment is booked, value should add by 1.
  //// condition to add: no more than 5 per day

  // if successfully update database, then I want to update the spots remaining
  // get access to spots remaining

  //// value should change when an appointment is deleted, value should decrease by 1
  //// condition: no less than 0 ??????

  // these props are passed when i call the function somewhere
  function spotsRemaining(appointmentId, appointments) {
    // iterate over the appointments array for that day
    const dayWithAppointmentId = state.days.find((day) =>
      day.appointments.includes(appointmentId)
    );
    // returns day with that appointment id --> day includes appointments object

    const nullAppointments = dayWithAppointmentId.appointments.filter((id) => {
      return !appointments[id].interview;
    }); // returns [nullId, nullId, nullId]

    const spotsAvailable = nullAppointments.length;

    return state.days.map((day) =>
      day.appointments.includes(appointmentId)
        ? { ...day, spots: spotsAvailable }
        : day
    );
    // not returning copy of days array...just updating it with new spots value insiide days
  }

  function bookInterview(id, interview) {
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

   /** Make data persistent so that when we refresh browser, the saved data is not lost (it gets lost because we are only updating the state locally).
     * Use axios to make request to  API to update the appontment with the interview. 2 things to happen:
     * (promise handle in application.js) 1. save the new info to the database and setState for storing the new object for front end
     * (promise handle in appointments/index.js) 2. Update the UI using transition function where it's calling props.bookInterview
     */
    return axios
      .put(`/api/appointments/${id}`, { interview }) // object notation because interview IS an object
      .then(() => {
        // save the new appointments object back into state
        setState({
          ...state,
          appointments,
          days: spotsRemaining(id, appointments),
        });
      });
  }

  // use appointment id to find the right appointment and set it's interview data to null
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.delete(`/api/appointments/${id}`).then(() => {
      setState({
        ...state,
        appointments,
        days: spotsRemaining(id, appointments),
      });
    });
  }

  return { state, setDay, bookInterview, cancelInterview };
}
