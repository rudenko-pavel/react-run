import "./About.scss";

import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";

import SummaryTable from "./SummaryTable";

const About = props => {
  const { joggings } = props.state;
  return <SummaryTable joggings={joggings} />;
};

const mapStateToProps = state => {
  return {
    state: state.state
  };
};

export default connect(mapStateToProps)(About);

About.propTypes = {
  joggings: PropTypes.instanceOf(Array)
};

About.defaultProps = {
  joggings: []
};
