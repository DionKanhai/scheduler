import React from "react";
import "components/InterviewerListItem.scss"
import classNames from "classnames";

export default function InterviewerListItem({ id, name, avatar, selected, setInterviewer}) {

  const interviewerSelected = classNames("interviewers__item", {
    "interviewers__item--selected": selected
  });


  return (
    selected ?
    <li onClick={() => setInterviewer(id)} className={interviewerSelected}>
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      />
      {name}
    </li> 
    :
    <li onClick={() => setInterviewer(id)} className={interviewerSelected}>
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      />
    </li>
  )
}