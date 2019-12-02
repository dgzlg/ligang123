import {find} from "lodash";
import {matchPath} from 'react-router-dom';
import {appName} from "../../config/info";
import {LOGIN_LOADING, INFO_LOADING, INFO_UPDATE, WIN_RESIZE} from './action';

const defaultState = {
  appName,
  loginLoading: false,
  loading: true,
  /* 用户信息 */
  userName: '未登录',
  userId: '',
  userRoles: [],
  menus: [],
  menusTree: [],
  activeMenuItems: [],
  /* 窗口大小 */
  winWidth: document.documentElement.clientWidth,
  winHeight: document.documentElement.clientHeight,
  /* 应用消息模块 */
  moduleMessage: true,
  /* 导航 */
  navigator: false,
};

/**
 * 递归找到所有父辈菜单
 * @param menus {array} - 菜单集合
 * @param parentCode {string|number} - 父级菜单code
 * @param accumulator {array} - 累加结果
 */
const findAllParents = (menus, parentCode, accumulator = []) => {
  const parent = find(menus, ['code', parentCode]);
  if (parent) {
    accumulator.push(parent);
    if (parent.parentCode !== '-1') {
      return findAllParents(menus, parent.parentCode, accumulator);
    }
  }
  return accumulator;
};

/**
 * 找到目前激活的菜单项（与当前路由地址匹配的）
 * @param menus {array} - 菜单集合
 * @param pathname {string} - 当前路由地址
 * @return {array}
 */
const findActiveMenuItems = (menus, pathname) => {
  let items = [];
  let baseItem = find(menus, ({rmodule}) => {
    return matchPath(pathname, {path: `/${rmodule}`, exact: true});
  });
  if (!baseItem) {
    return [];
  }
  if (baseItem.parentCode === '-1') {
    return [baseItem];
  }

  items.push(baseItem);

  findAllParents(menus, baseItem.parentCode, items);

  return items;
};


export default (state = defaultState, action) => {
  switch (action.type) {
    // 路由地址发生变化时，更新激活菜单项数据
    case '@@router/LOCATION_CHANGE':
      return {...state, activeMenuItems: findActiveMenuItems(state.menus, action.payload.location.pathname)};
    case WIN_RESIZE:
      return {
        ...state,
        winWidth: action.winWidth,
        winHeight: action.winHeight
      };
    case LOGIN_LOADING:
      return {
        ...state,
        loginLoading: action.loginLoading
      };
    case INFO_LOADING:
      return {
        ...state,
        loading: action.loading
      };
    case INFO_UPDATE:
      return {
        ...state,
        loading: false,
        userName: action.userName,
        userId: action.userId,
        userRoles: action.userRoles,
        menus: action.menus,
        menusTree: action.menusTree,
      };
    default:
      return state;
  }
};
