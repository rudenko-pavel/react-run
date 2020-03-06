import "./HeaderMenu.scss";

import { Menu } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

import { setValue } from "../../actions";
import headerMenuItems from "../../configs/headerMenuConfig";
import joggingsListItems from "../../configs/joggingsListConfig";

const HeaderMenu = () => {
  const { headermenu } = headerMenuItems;
  const dispatch = useDispatch();
  dispatch(setValue("joggings", joggingsListItems.joggings));

  const [current, setCurrent] = useState(window.location.hash);

  function handleClick() {
    setCurrent(window.location.hash);
  }

  /**
   * Returns hed menu.
   * @param {Object[]} headermenu - array of objects (e.g. { id: 1, name: "about", link: "/" }).
   */
  function renderList() {
    return headermenu.map(headerMenuItem => {
      return (
        <Menu.Item key={headerMenuItem.link}>
          <NavLink to={headerMenuItem.link}>{headerMenuItem.name}</NavLink>
        </Menu.Item>
      );
    });
  }

  return (
    <Menu
      onClick={() => handleClick()}
      selectedKeys={current}
      mode="horizontal"
    >
      {renderList()}
    </Menu>
  );
};

export default HeaderMenu;
