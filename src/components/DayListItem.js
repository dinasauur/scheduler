import React from 'react';
import 'components/DayListItem.scss';
import classNames from 'classnames';

export default function DayListItem(props) {
  const dayClass = classNames('day-list__item', {
    'day-list__item--selected': props.selected,
    'day-list__item--full': props.spots === 0,
  });

  const formatSpots = function (spots) {
    if (!spots) {
      return 'No spots remaining';
    }

    if (spots === 1) {
      return '1 spot remaining';
    }

    return `${spots} spots remaining`;
  };

  return (
    <li
      className={dayClass}
      onClick={props.setDay}
      selected={props.selected}
      data-testid="day"
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}
