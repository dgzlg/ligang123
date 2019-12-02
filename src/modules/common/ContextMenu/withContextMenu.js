import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ContextMenu from './index';
import './index.less';

const withContextMenu = (WrappedComponent) => {
  class MiddleComponent extends Component {
    constructor(props) {
      super(props);
      this.handleShowContextMenu = this.handleShowContextMenu.bind(this);
      this.handleCloseContextMenu = this.handleCloseContextMenu.bind(this);
      this.handleContextAction = this.handleContextAction.bind(this);
      this.state = {
        menu: [],
        contextMenuShow: false,
        contextMenuX: 0,
        contextMenuY: 0,
        contextTarget: undefined,
      };
    }

    handleShowContextMenu(e, target) {
      if (!this.props.contextProvider) {
        return;
      }
      let menu = this.props.contextProvider(target);
      if (menu) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({
          menu,
          contextMenuShow: true,
          contextMenuX: e.clientX,
          contextMenuY: e.clientY,
          contextTarget: target,
        });
      }
    }

    handleCloseContextMenu() {
      this.setState({contextMenuShow: false});
    }

    handleContextAction(index, action) {
      this.setState({contextMenuShow: false});
      action(this.state.contextTarget);
    }

    render() {
      const {contextMenuX, contextMenuY, contextMenuShow, menu} = this.state;
      if (!contextMenuShow) {
        return (
          <WrappedComponent
            {...this.props}
            handleShowContextMenu={this.handleShowContextMenu}
            handleCloseContextMenu={this.handleCloseContextMenu}
          />
        );
      }
      return [
        <WrappedComponent
          key="c"
          {...this.props}
          handleShowContextMenu={this.handleShowContextMenu}
          handleCloseContextMenu={this.handleCloseContextMenu}
        />,
        <ContextMenu
          key="m"
          x={contextMenuX}
          y={contextMenuY}
          menu={menu}
          handleClose={this.handleCloseContextMenu}
          handleItemClick={this.handleContextAction}
        />
      ];
    }
  }

  MiddleComponent.propTypes = {
    contextProvider: PropTypes.func,
  };

  return MiddleComponent;
};

export default withContextMenu;
