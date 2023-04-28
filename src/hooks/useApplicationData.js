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

  function spotsRemaining(appointmentId, appointments) {
    const dayWithAppointmentId = state.days.find((day) =>
      day.appointments.includes(appointmentId)
    );

    const nullAppointments = dayWithAppointmentId.appointments.filter((id) => {
      return !appointments[id].interview;
    });

    const spotsAvailable = nullAppointments.length;

    return state.days.map((day) =>
      day.appointments.includes(appointmentId)
        ? { ...day, spots: spotsAvailable }
        : day
    );
  }

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    /** Use axios to make request to  API to update the appontment with the interview. 2 things to happen:
     * (promise handle in application.js) 1. save the new info to the database and setState for storing the new object for front end
     * (promise handle in appointments/index.js) 2. Update the UI using transition function where it's calling props.bookInterview
     */
    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      setState({
        ...state,
        appointments,
        days: spotsRemaining(id, appointments),
      });
    });
  }

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
