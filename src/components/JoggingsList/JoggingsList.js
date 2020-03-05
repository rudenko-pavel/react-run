import "./JoggingsList.scss";

import React from "react";

import joggingsListItems from "../../configs/joggingsListConfig";
import JoggingLogic from "./JoggingLogic";

const JoggingsList = () => {
  const { joggings } = joggingsListItems;
  return <JoggingLogic joggings={joggings} />;
};

export default JoggingsList;
