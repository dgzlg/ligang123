import {Component} from 'react';
import {DragSource} from 'react-dnd';
import PropTypes from 'prop-types';

const types = 'item';

const spec = {
  beginDrag: (props) => {
    return props;
  },
};

const collect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
};

class Source extends Component {
  render() {
    const {children, connectDragSource} = this.props;
    return connectDragSource(children);
  }
}


Source.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
  isDragging: PropTypes.bool,
  connectDragSource: PropTypes.func,
};

export default DragSource(types, spec, collect)(Source);
