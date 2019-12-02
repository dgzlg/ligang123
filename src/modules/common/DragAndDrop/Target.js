import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {DropTarget} from 'react-dnd';

const type = 'item';

const spec = {
  drop: (props, monitor) => {
    const source = monitor.getItem();
    if (source.payload) {
      props.handleDropIn(source.payload);
    }
  },
};

const collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
  };
};

class Target extends Component {
  render() {
    const {connectDropTarget, style, className, children} = this.props;
    return connectDropTarget(
      <div className={className} style={style}>
        {children}
      </div>
    );
  }
}

Target.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  handleDropIn: PropTypes.func.isRequired,
};

export default DropTarget(type, spec, collect)(Target);
