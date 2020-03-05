import "./HeaderMenu.scss";

import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

import { setValue } from "../../actions";
import headerMenuItems from "../../configs/headerMenuConfig";
import joggingsListItems from "../../configs/joggingsListConfig";

const HeaderMenu = () => {
  const { headermenu } = headerMenuItems;
  const dispatch = useDispatch();
  dispatch(setValue("joggings", joggingsListItems.joggings));

  /**
   * Returns hed menu.
   * @param {Object[]} headermenu - array of objects (e.g. { id: 1, name: "about", link: "/" }).
   */
  function renderList() {
    return headermenu.map(headerMenuItem => {
      return (
        <NavLink
          exact
          to={headerMenuItem.link}
          className="ui button"
          key={headerMenuItem.id}
          activeClassName="blue basic"
        >
          {headerMenuItem.name}
        </NavLink>
      );
    });
  }

  return (
    <div className="row">
      <div className="column HeaderMenu">
        <div className="ui basic buttons">{renderList()}</div>
      </div>
    </div>
  );
};

export default HeaderMenu;
