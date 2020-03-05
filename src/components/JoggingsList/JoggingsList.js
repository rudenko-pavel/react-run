import "./JoggingsList.scss";

import React from "react";
import { connect } from "react-redux";

import joggingsListItems from "../../configs/joggingsListConfig";
import JoggingLogic from "./JoggingLogic";

const JoggingsList = () => {
  console.log("JoggingsList")
  const { joggings } = joggingsListItems;
  return <JoggingLogic joggings={joggings} />;
};

const mapStateToProps = state => {
  return {
    state: state.state
  };
};

export default connect(mapStateToProps)(JoggingsList);
