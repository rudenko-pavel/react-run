import PropTypes from "prop-types";
import React from "react";

const OneItem = props => {
  const { id, date, distance, time, city } = props;
  return (
    <tr className="one-item">
      <td>
        <p>#{id}</p>
      </td>
      <td>
        <p>{date}</p>
      </td>
      <td>
        <p>{distance}</p>
      </td>
      <td>
        <p>{time}</p>
      </td>
      <td>
        <p>{city}</p>
      </td>
    </tr>
  );
};

export default OneItem;

OneItem.propTypes = {
  id: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  distance: PropTypes.number.isRequired,
  time: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired
};
