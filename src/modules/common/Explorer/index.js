import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {Spin} from 'antd';
import DragSource from '../DragAndDrop/Source';
import withContextMenu from '../ContextMenu/withContextMenu';
import './index.less';

class Explorer extends Component {

  constructor(props) {
    super(props);
    this.handleUpperLevel = this.handleUpperLevel.bind(this);
    this.handleNextLevel = this.handleNextLevel.bind(this);
  }

  handleUpperLevel() {
    const {navTo, pathArray = []} = this.props;
    if (navTo) {
      const newPathArray = [...pathArray];
      newPathArray.pop();
      navTo(newPathArray);
      console.log(13);
    }
  }

  handleNextLevel(target) {
    if (target.type !== 'directory') {
      return;
    }
    const {navTo, pathArray = []} = this.props;
    if (navTo) {
      navTo([...pathArray, target]);
    }
  }

  render() {
    const {className, style, loading, pathArray, list, handleShowContextMenu, draggable} = this.props;
    return (
      <Spin
        delay={500}
        spinning={loading}
      >
        <div
          className={classnames('file-explorer clear-fix', className)}
          style={style}
        >
          {pathArray.length > 0 ?
            <div className="explorer-item" onDoubleClick={this.handleUpperLevel}>
              <div className={`icon back`}/>
              <div className="name">返回上一级</div>
            </div>
            : ''
          }
          {list.map(({name, type, status}, index) => {
            if (type === 'directory' || !draggable) {
              return (
                <div
                  key={index}
                  className="explorer-item"
                  onDoubleClick={() => this.handleNextLevel(list[index])}
                  onContextMenu={(e) => handleShowContextMenu(e, list[index])}
                >
                  <div className={`icon ${type} ${status}`}/>
                  <div className="name">{name}</div>
                </div>
              );
            }
            return (
              <DragSource key={index} payload={list[index]}>
                <div
                  className="explorer-item"
                  onContextMenu={(e) => handleShowContextMenu(e, list[index])}
                >
                  <div className={`icon ${type} ${status}`}/>
                  <div className="name">{name}</div>
                </div>
              </DragSource>
            );
          })}
        </div>
      </Spin>
    );
  }
}

Explorer.propTypes = {
  className: PropTypes.string,
  draggable: PropTypes.bool,
  style: PropTypes.object,
  loading: PropTypes.bool,
  pathArray: PropTypes.array,
  navTo: PropTypes.func,
  list: PropTypes.array.isRequired,
  handleShowContextMenu: PropTypes.func,
};

export default withContextMenu(Explorer);
