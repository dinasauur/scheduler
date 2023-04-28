export function getAppointmentsForDay(state, specifiedDay) {
  const selectedDay = state.days.find((day) => day.name === specifiedDay);

  if (!selectedDay) {
    return [];
  }

  const appointmentForTheDay = selectedDay.appointments.map((appointmentId) => {
    return state.appointments[appointmentId];
  });

  return appointmentForTheDay;
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
