import React from 'react';
import PropTypes from 'prop-types';
import {Menu as AntdMenu} from 'antd';

const {SubMenu, ItemGroup, Item} = AntdMenu;

/**
 * 递归创建菜单树
 * @param menus {array} - 菜单树型数组数据
 * @param deep {number|undefined} default: 0 - 当前递归深度
 * @return {*}
 */
const createMenuItems = (menus, deep = 0) => {
  return menus.map(({rmodule, children, ricon, name}) => {
    if (!children || children.length === 0) {
      return (
        <Item className="main-menu" key={rmodule}>
          {deep === 0 ? <span className={`icon ${ricon}`}/> : ''}
          <span className="name">{name}</span>
        </Item>
      );
    }
    if (deep === 0) {
      const node = (
        <span>
          <span className={`icon ${ricon}`}/>
          <span className="name">{name}</span>
        </span>
      );
      return (
        <SubMenu key={rmodule} title={node}>
          {createMenuItems(children, deep + 1)}
        </SubMenu>
      );
    }
    return (
      <ItemGroup key={rmodule} title={name}>
        {createMenuItems(children, deep + 1)}
      </ItemGroup>
    );
  });
};

const Menu = ({menus, activeMenuKeys, handleMenuClick}) => {
  return (
    <AntdMenu
      id="mainMenu"
      style={{width: 200}}
      mode="vertical"
      selectedKeys={activeMenuKeys}
      onClick={handleMenuClick}
    >
      {createMenuItems(menus)}
    </AntdMenu>
  );
};

Menu.propTypes = {
  menus: PropTypes.array.isRequired,
  activeMenuKeys: PropTypes.array.isRequired,
  handleMenuClick: PropTypes.func.isRequired,
};

export default Menu;
