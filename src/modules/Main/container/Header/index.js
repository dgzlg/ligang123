import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import Title from './Title';
import Message from './Message';
import User from './User';

const Header = ({activeMenuItems, moduleMessage}) => {
  return (
    <div id="appHeader">
      {activeMenuItems.length > 0 ?
        <Title activeMenuItems={activeMenuItems}/>
        : ''
      }
      <User/>
      {moduleMessage ?
        <Message/>
        :
        ''
      }
    </div>
  );
};

const mapStateToProps = ({Main: {activeMenuItems, moduleMessage}}) => {
  return {
    activeMenuItems,
    moduleMessage,
  };
};

Header.propTypes = {
  activeMenuItems: PropTypes.array.isRequired,
  moduleMessage: PropTypes.bool
};

export default connect(mapStateToProps)(Header);
