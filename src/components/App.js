import "./scss/App.scss";

import { Layout } from "antd";
import React from "react";
import { HashRouter, Route } from "react-router-dom";

import About from "./About/About";
import HeaderMenu from "./HeaderMenu/HeaderMenu";
import JoggingsList from "./JoggingsList/JoggingsList";
import Strava from "./Strava/Strava";

const { Header, Content, Footer } = Layout;

const App = () => {
  return (
    <div className="App">
      <HashRouter>
        <Layout className="container">
          <Header className="header">
            <HeaderMenu />
          </Header>
          <Content className="site-layout">
            <Route path="/" exact component={About} />
            <Route path="/joggings" exact component={JoggingsList} />
            <Route path="/strava" exact component={Strava} />
          </Content>
          <Footer className="footer">Joggings: Rudenko Pavel</Footer>
        </Layout>
      </HashRouter>
    </div>
  );
};

export default App;
