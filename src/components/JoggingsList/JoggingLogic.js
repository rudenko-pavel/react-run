import { Table } from "antd";
import PropTypes from "prop-types";
import React from "react";

import joggingConfig from "../../configs/joggingConfig";

const JoggingLogic = props => {
  const { joggings } = props;
  const { arrayMonth, theadTable, cities } = joggingConfig;

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
   * Returns name of City .
   * @param {number} val - number, which is key in Array[{Object}]. ({ id: 1, name: "Kyiv" })
   */
  function showCityName(val) {
    const result = cities.find(city => city.id === val);
    return result.name;
  }

  /**
   * Returns formatted distance .
   * @param {number} val - number
   */
  function formattedDistance(val) {
    return new Intl.NumberFormat("en-EN").format(val);
  }

  function renderList() {
    return joggings
      .map(jogging => {
        return {
          id: `# ${jogging.id}`,
          date: timestampToDate(jogging.date),
          distance: formattedDistance(jogging.distance),
          time: secondsToFullTime(jogging.time),
          cityId: showCityName(jogging.cityId)
        };
      })
      .reverse();
  }

  return (
    <Table
      className="joggings"
      columns={theadTable}
      dataSource={renderList()}
      rowKey={record => record.id}
      pagination={{
        defaultPageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "50", "100", `${joggings.length}`]
      }}
    />
  );
};

export default JoggingLogic;

JoggingLogic.propTypes = {
  joggings: PropTypes.instanceOf(Array)
};

JoggingLogic.defaultProps = {
  joggings: []
};
