import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem({ name, setDay, selected, spots }) {

  const formatSpots = (spots) => {
    if (spots !== 0 && spots !== 1) {
      return `${spots} spots remaining`
    }
    if (spots === 1) {
      return '1 spot remaining'
    }
    if (spots === 0) {
      return 'no spots remaining'
    }
  };

  const dayClass = classNames('day-list__item', {
    'day-list__item--selected': selected,
    'day-list__item--full': spots === 0
  });


  return (
    <li onClick={() => setDay(name)} className={dayClass} selected={selected}>
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{formatSpots(spots)}</h3>
    </li>
  );
}