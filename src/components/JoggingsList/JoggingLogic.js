import PropTypes from "prop-types";
import React from "react";

import joggingConfig from "../../configs/joggingConfig";
import OneItem from "./OneItem";

const JoggingLogic = props => {
  const { joggings } = props;
  const { arrayMonth, theadTable, nameTable, cities } = joggingConfig;

  /**
   * Returns the time, which was get from timeInSeconds.
   * @param  timeInSeconds - count of seconds (e.g. 2119).
   */
  function secondsToFullTime(timeInSeconds) {
    const hours = `00${Math.floor(timeInSeconds / 60 / 60)}`.slice(-2);
    const minutes = `00${Math.floor(timeInSeconds / 60) % 60}`.slice(-2);
    const seconds = `00${Math.floor(timeInSeconds - minutes * 60)}`.slice(-2);
    return `${hours}:${minutes}:${seconds}`;
  }

  /**
   * Returns the date, which was get from timestamp.
   * @param {number} timestamp - UNIX timestamp (e.g. 1506891600).
   */
  function timestampToDate(timestamp) {
    const fullDate = new Date(timestamp * 1000);
    const year = fullDate.getFullYear();
    const month = arrayMonth[fullDate.getMonth()];
    const date = `0${fullDate.getDate()}`.slice(-2);
    return `${date} ${month} ${year}`;
  }

  /**
   * Returns head to table.
   * @param {Object[]} thead - array of objects (e.g. { id: 1, name: "#" }).
   */
  function showTableHead(thead) {
    return thead.map(item => {
      return <th key={item.id}>{item.name}</th>;
    });
  }

  /**
   * Returns name of City .
   * @param {number} val - number, which is key in Array[{Object}]. ({ id: 1, name: "Kyiv" })
   */
  function showCityName(val) {
    const result = cities.find(city => city.id === val);
    return result.name;
  }

  function renderList() {
    const reverceJoggings = joggings.reverse();
    return reverceJoggings.map(jogging => {
      return (
        <OneItem
          key={jogging.id}
          id={jogging.id}
          date={timestampToDate(jogging.date)}
          distance={jogging.distance}
          time={secondsToFullTime(jogging.time)}
          city={showCityName(jogging.cityId)}
        />
      );
    });
  }

  return (
    <table className="ui celled striped table">
      <thead>
        <tr className="one-item">
          <th colSpan="5">{nameTable}</th>
        </tr>
        <tr className="one-item">{showTableHead(theadTable)}</tr>
      </thead>
      <tbody>{renderList()}</tbody>
    </table>
  );
};

export default JoggingLogic;

JoggingLogic.propTypes = {
  joggings: PropTypes.instanceOf(Array)
};

JoggingLogic.defaultProps = {
  joggings: []
};
