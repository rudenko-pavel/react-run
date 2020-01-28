import "./HeaderMenu.scss";

import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { fetchHeaderMenu, selectItemMenu } from "../../actions";

class HeaderMenu extends Component {
  componentDidMount() {
    this.props.fetchHeaderMenu();
  }

  renderList() {
    let currentItemMenu = "";
    return this.props.headermenu.map(headermenu => {
      // eslint-disable-next-line no-unused-expressions
      headermenu.id === this.props.menuselected
        ? (currentItemMenu = "blue basic")
        : (currentItemMenu = "");
      return (
        <Link
          to={headermenu.link}
          className={`ui button ${currentItemMenu}`}
          key={headermenu.id}
          onClick={() => this.props.selectItemMenu(headermenu.id)}
        >
          {headermenu.name}
        </Link>
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
    headermenu: state.headermenu,
    menuselected: state.menuselected
  };
};

export default connect(mapStateToProps, {
  fetchHeaderMenu,
  selectItemMenu // see to `src/actions/index.js`
})(HeaderMenu);
