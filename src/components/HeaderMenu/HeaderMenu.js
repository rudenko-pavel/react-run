import "./HeaderMenu.scss";

import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

import { fetchHeaderMenu } from "../../actions";

class HeaderMenu extends Component {
  componentDidMount() {
    this.props.fetchHeaderMenu();
  }

  renderList() {
    return this.props.headermenu.map(headermenu => {
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
    // console.log("HeaderMenu(fetchHeaderMenu)", this.props.headermenu);
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
    headermenu: state.headermenu
  };
};

export default connect(mapStateToProps, {
  fetchHeaderMenu // see to `src/actions/index.js`
})(HeaderMenu);
