export function getAppointmentsForDay(state, specifiedDay) {
  // returns an array of appointments for that day

  // OPTION 1

  const selectedDay = state.days.find((day) => day.name === specifiedDay);

  if (!selectedDay) {
    return [];
  }

  const appointmentForTheDay = selectedDay.appointments.map((appointmentId) => {
    return state.appointments[appointmentId];
  });

  return appointmentForTheDay;

  //// IS THERE A BETTER WAY TO DO THIS. ASK MENTOR TO REVIEW OTHER OPTIONS.

  // OPTION 2
  // state.days.map(resultDay => {

  //   if(resultDay.name !== day || !resultDay.name) {
  //     return [];
  //   }

  //   if (resultDay.name === day) {
  //     resultDay.appointments.map(appointmentId => {
  //       return state.appointments[appointmentId]
  //     })
  //   }
  // });

  // OPTION 3
  // const selectedDayAppointments = state.days.map(day => {
  //   if (!day.name || day.name !== specifiedDay) {
  //     return [];
  //   }

  //   if (day.name === specifiedDay) {
  //     return day.appointments;
  //   }
  // });

  // const appointments = selectedDayAppointments.map(appointmentId => state.appointments[appointmentId]);
  // return appointments;

  // OPTION 4
  // const selectedDayAppointment = state.days.forEach(day => {
  //   if (day.name === specifiedDay) {
  //     return day.appointments;
  //   }

  //   return null;
  // })

  // console.log(selectedDayAppointment)
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  const interviewData = state.interviewers[interview.interviewer];

  return {
    student: interview.student,
    interviewer: interviewData,
  };
}

export function getInterviewersForDay(state, specifiedDay) {
  const selectedDay = state.days.find((day) => day.name === specifiedDay);

  if (!selectedDay) {
    return [];
  }

  const interviewerForTheDay = selectedDay.interviewers.map((interviewerId) => {
    return state.interviewers[interviewerId];
  });

  return interviewerForTheDay;
}
