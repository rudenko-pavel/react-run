import "./scss/App.scss";

import React from "react";
import { HashRouter, Route } from "react-router-dom";

import About from "./About/About";
import HeaderMenu from "./HeaderMenu/HeaderMenu";
import JoggingsList from "./JoggingsList/JoggingsList";
import Strava from "./Strava/Strava";

const App = () => {
  return (
    <div className="ui container App">
      <HashRouter>
        <div>
          <HeaderMenu />
          <Route path="/" exact component={About} />
          <Route path="/joggings" component={JoggingsList} />
          <Route path="/strava" component={Strava} />
        </div>
      </HashRouter>
    </div>
  );
};

export default App;
