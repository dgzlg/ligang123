import {deleteResource, viewAR, modifyAR, modifyFR} from "../action";
import {Modal} from "antd";
import {modifyMR} from "../actions/MapResourceEditor";
import {viewMR} from '../actions/MapResourceViewer';

const deleteConfirm = (target, onOk) => {
  Modal.confirm({
    title: '确定删除此资源吗？',
    content: target.name,
    onOk,
    onCancel: () => {},
  });
};

/**
 * 定义不同类型资源的右键菜单
 * @param dispatch
 * @param editable {boolean} - Explorer主模块被引用时定义的参数
 * 为false时，说明使用的是不具有编辑功能的Explorer组件，相应的，右键菜单里也不应该有修改、删除等功能
 * 为true时，说明使用的是有编辑功能的Explorer组件，相应的，右键菜单里应该视具体逻辑增加修改、删除等功能
 * @param contextMenuExtends {array} 由Explorer组件被引用时指定附加的菜单
 * @return {Function} - contextMenuProvider
 */
export default (dispatch, editable, contextMenuExtends) => {
  /**
   * 返回的函数即为contextMenuProvider
   * @param target {object} - 触发右键的目标资源对象
   * @param target.type {string} - 资源的类型
   * @param target.status {string} - 资源当前的状态
   */
  return (target) => {
    const menu = [];

    /* 文件夹 */
    if (target.type === 'directory') {
      return;
    }

    /* 预定义的菜单 */
    if (contextMenuExtends) {
      for (const value of contextMenuExtends) {
        menu.push({name: value.name, action: () => dispatch(value.action(target))});
      }
    }

    if (!editable) {
      return menu;
    }

    /* 文件类资源 */
    if (target.type === 'file') {
      if (target.status !== 'DRAFT') {
        return menu;
      }
      menu.push(
        {name: '修改', action: (t) => dispatch(modifyFR(t))},
        {name: '删除', action: (t) => deleteConfirm(t, () => dispatch(deleteResource(t)))},
      );
      return menu;
    }

    /* api类资源 */
    if (target.type === 'api') {
      menu.push(
        {name: '查看', action: (t) => dispatch(viewAR(t))},
      );
      if (target.status !== 'DRAFT') {
        return menu;
      }
      menu.push(
        {name: '修改', action: (t) => dispatch(modifyAR(t))},
        {name: '删除', action: (t) => deleteConfirm(t, () => dispatch(deleteResource(t)))},
      );
      return menu;
    }

    /* map类资源 */
    if (target.type === 'map') {
      menu.push(
        {name: '查看', action: (t) => dispatch(viewMR(t))},
      );
      if (target.status !== 'DRAFT') {
        return menu;
      }
      menu.push(
        {name: '修改', action: (t) => dispatch(modifyMR(t))},
        {name: '删除', action: (t) => deleteConfirm(t, () => dispatch(deleteResource(t)))},
      );
      return menu;
    }
  };
};
