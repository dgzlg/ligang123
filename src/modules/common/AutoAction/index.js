import React from 'react';
import PropTypes from 'prop-types';

class AutoAction extends React.Component {
  componentDidMount () {
    const { action, timeInterval } = this.props;
    this.timer = setInterval(action, timeInterval);
  }
  componentWillUnmount () {
    clearInterval(this.timer);
  }
  render () {
    return '';
  }
}

AutoAction.propTypes = {
  action: PropTypes.func.isRequired,
  timeInterval: PropTypes.number.isRequired,
};

export default AutoAction;
