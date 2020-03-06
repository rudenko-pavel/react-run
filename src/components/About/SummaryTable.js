import { Table, Typography } from "antd";
import PropTypes from "prop-types";
import React from "react";

import joggingConfig from "../../configs/joggingConfig";

const SummaryTable = props => {
  const { joggings } = props;
  const { summaryTable, theadTableSummary } = joggingConfig;
  const { Text } = Typography;

  /**
   * Returns Overcomed Distance .
   * @param {array[Object]} (joggings: [
   * {id: 1,   cityId: 1,  date: 1506891600, distance: 2260,  time:1079, slides: 0 ,
   *  isCompetition: false , parts: [473,483]})...
   * return formatted value
   */
  function overcomedDistance(data) {
    let result = 0;
    data.map(item => {
      result += item.distance;
      return result;
    });
    return `${new Intl.NumberFormat("en-EN").format(result / 1000)} km`;
  }

  /**
   * Returns Used time .
   * @param {array[Object]} (joggings: [
   * {id: 1,   cityId: 1,  date: 1506891600, distance: 2260,  time:1079, slides: 0 ,
   *  isCompetition: false , parts: [473,483]})...
   * return formatted value
   */
  function usedTime(data) {
    let result = 0;
    data.map(item => {
      result += item.time;
      return result;
    });

    const days = Math.floor(result / 60 / 60 / 24);
    const hours = `00${Math.floor(
      (result - days * 60 * 60 * 24) / 60 / 60
    )}`.slice(-2);
    const minutes = `00${Math.floor(result / 60) % 60}`.slice(-2);
    const seconds = `00${Math.floor(result - minutes * 60)}`.slice(-2);
    return `${days} days ${hours}:${minutes}:${seconds}`;
  }

  function renderList() {
    return summaryTable.map(oneString => {
      let returnValue = "";
      if (oneString.id === 1) returnValue = joggings.length;
      if (oneString.id === 2) returnValue = overcomedDistance(joggings);
      if (oneString.id === 3) returnValue = usedTime(joggings);
      return {
        id: oneString.id,
        title: oneString.title,
        value: <Text className="green-label">{returnValue}</Text>
      };
    });
  }

  return (
    <Table
      className="summaryTable"
      columns={theadTableSummary}
      dataSource={renderList()}
      rowKey={record => record.id}
    />
  );
};

export default SummaryTable;

SummaryTable.propTypes = {
  joggings: PropTypes.instanceOf(Array)
};

SummaryTable.defaultProps = {
  joggings: []
};
