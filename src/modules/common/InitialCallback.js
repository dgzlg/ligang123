import {Component} from 'react';
import PropTypes from 'prop-types';

/**
 * 初始回调 - 组件初次渲染后将执行指定的回调
 * 回调可以是单个，也可以是多个
 * @param {object} props - 组件属性
 * @param {(function|array)} actions - 需要执行的方法
 */
class InitialCallback extends Component {
  componentDidMount() {
    const {actions} = this.props;
    if (typeof actions === 'function') {
      actions();
      return;
    }
    if (typeof actions === 'object' && actions.constructor === Array) {
      for (let i = 0, l = actions.length; i < l; i++) {
        actions[i]();
      }
    }
  }

  render() {
    return '';
  }
}

InitialCallback.propTypes = {
  actions: PropTypes.oneOfType([PropTypes.func, PropTypes.array]),
};

export default InitialCallback;
