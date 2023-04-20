import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {

  const days = props.days.map(day => {
    return (
      <DayListItem
        key={day.id}
        spots={day.spots}
        name={day.name}
        selected={day.name === props.value}
        setDay={() => props.onChange(day.name)}
      />
    );
  });

  return (
    <ul>
      {days}
    </ul>
  );
}