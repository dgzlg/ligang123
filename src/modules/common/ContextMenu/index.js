import React from 'react';
import PropTypes from 'prop-types';
import './index.less';

const ContextMenu = ({
  x, y, menu, handleClose, handleItemClick,
}) => {
  const maskWidth = document.documentElement.clientWidth;
  const maskHeight = document.documentElement.clientHeight;
  return (
    <div className={'context-menu'} onContextMenu={(e) => {e.preventDefault()}}>
      <div className="context-menu-mask" style={{width: maskWidth, height: maskHeight}} onClick={handleClose} />
      <div className="context-menu-content" style={{ left: x, top: y }}>
        {menu.map((item, index) => {
          return (
            <div
              key={index}
              className="context-menu-item"
              onClick={() => {handleItemClick(index, item.action)}}
            >
              {item.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

ContextMenu.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  handleClose: PropTypes.func,
  handleItemClick: PropTypes.func,
  menu: PropTypes.array,
};

export default ContextMenu;
