import React from 'react';
import classNames from 'classnames';
import './InterviewerListItem.scss';

function InterviewerListItem(props) {
  const interviewerClass = classNames('interviewers__item', {
    'interviewers__item--selected': props.selected,
  });

  const imageClass = classNames('interviewers__item-image', {
    'interviewers__item--selected-image': props.selected,
  });

  return (
    <li className={interviewerClass} onClick={props.setInterviewer}>
      <img className={imageClass} src={props.avatar} alt={props.name} />
      {props.selected && props.name}
    </li>
  );
}

export default InterviewerListItem;
