import "./JoggingsList.scss";

import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";

import JoggingLogic from "./JoggingLogic";

const JoggingsList = props => {
  const { joggings } = props.state;
  return <JoggingLogic joggings={joggings} />;
};

const mapStateToProps = state => {
  return {
    state: state.state
  };
};

export default connect(mapStateToProps)(JoggingsList);

JoggingsList.propTypes = {
  joggings: PropTypes.instanceOf(Array)
};

JoggingsList.defaultProps = {
  joggings: []
};
