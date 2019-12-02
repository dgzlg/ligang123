import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import DropTarget from '../DragAndDrop/Target';
import withContextMenu from "../ContextMenu/withContextMenu";
import './index.less';

const Collector = withContextMenu((
  {style, className, list, handleShowContextMenu, handleDropIn}
) => {
  return (
    <DropTarget
      style={style}
      className={classnames('my-item-collector clear-fix', className)}
      handleDropIn={handleDropIn}
    >
      {list.map(({name, type}, index) => {
        return (
          <div
            key={index}
            className="collector-item"
            onContextMenu={(e) => handleShowContextMenu(e, list[index])}
          >
            <div className={`icon ${type}`}/>
            <div className="name">{name}</div>
          </div>
        );
      })}
    </DropTarget>
  );
});

Collector.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  list: PropTypes.array,
  handleDropIn: PropTypes.func,
};

export default withContextMenu(Collector);
