import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {

  return (
    <ul>
      {props.days.map(day => {
    return <DayListItem key={day.id} spots={day.spots} name={day.name} selected={day.name === props.day} setDay={props.setDay}/>
  })}
    </ul>
  );
}