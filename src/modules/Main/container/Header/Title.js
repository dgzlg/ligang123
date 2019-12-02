import React from 'react';
import PropTypes from 'prop-types';

const Title = ({activeMenuItems}) => {
  return (
    <div className="app-page-title">
      <span className="rect-1"/>
      <span className="rect-2"/>
      {(() => {
        let nodes = [];
        for (let l = activeMenuItems.length, i = 0; i < l; i++) {
          if (nodes.length === 0) {
            nodes.push(<span key={i}>{activeMenuItems[i].name}</span>);
            continue;
          }
          nodes.unshift(<span key={`$line{i}`}>&nbsp;/&nbsp;</span>);
          nodes.unshift(<span key={i}>{activeMenuItems[i].name}</span>);
        }
        return nodes;
      })()}
    </div>
  );
};

Title.propTypes = {
  activeMenuItems: PropTypes.array.isRequired,
};

export default Title;
