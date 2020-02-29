/* eslint-disable react/prop-types */
import "./HeaderMenu.scss";

import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

class HeaderMenu extends Component {
  renderList() {
    const { state } = this.props;
    return state.headermenu.map(headermenu => {
      return (
        <NavLink
          exact
          to={headermenu.link}
          className="ui button"
          key={headermenu.id}
          activeClassName="blue basic"
        >
          {headermenu.name}
        </NavLink>
      );
    });
  }

  render() {
    return (
      <div className="row">
        <div className="column HeaderMenu">
          <div className="ui basic buttons">{this.renderList()}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  // see to `src/reducers/index.js`
  return {
    state: state.state
  };
};

export default connect(mapStateToProps)(HeaderMenu);
