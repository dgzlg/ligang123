import HTML5Backend from 'react-dnd-html5-backend';
import {DragDropContext} from 'react-dnd';
import PropTypes from 'prop-types';

const Context = ({children}) => {
  return children;
};

Context.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
};

export default DragDropContext(HTML5Backend)(Context);
