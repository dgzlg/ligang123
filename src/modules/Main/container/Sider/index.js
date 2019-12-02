import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {push} from 'connected-react-router';
import Logo from './Logo';
import {appName, logo} from '../../../../config/info';
import {SIDER_MENU_WIDTH} from "../uiConfig";
import Menu from "./Menu";


const Sider = ({menus, activeMenuKeys, dispatch}) => {
  const handleMenuClick = (e) => {
    dispatch(push(`/${e.key}`));
  };
  const handleLogoClick = () => {
    dispatch(push('/home'));
  };
  return (
    <div id="mainSider" style={{width: SIDER_MENU_WIDTH}}>
      <Logo appName={appName} logo={logo} handleClick={handleLogoClick}/>
      <Menu menus={menus} activeMenuKeys={activeMenuKeys} handleMenuClick={handleMenuClick}/>
    </div>
  );
};

Sider.propTypes = {
  menus: PropTypes.array.isRequired,
  activeMenuKeys: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = ({Main: {menusTree, activeMenuItems}}) => {
  return {
    menus: menusTree,
    activeMenuKeys: activeMenuItems.map(_ => _.rmodule),
  };
};

export default connect(mapStateToProps)(Sider);
