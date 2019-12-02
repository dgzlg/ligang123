import {push} from 'connected-react-router';
import {message} from 'antd';
import {loginIn as loginInUrl, loginOut as loginOutUrl, getUserMenus as getUserMenusUrl} from '../../config/api';
import createAction from '../common/utils/createAction';
import getMenusTree from '../common/utils/getMenusTree';
import {defaultPagePath} from '../../config/info';
import {parse} from 'query-string';

export const prefix = 'Main';

/* action type */
export const LOGIN_LOADING = `${prefix}/loginLoading`;
export const INFO_LOADING = `${prefix}/infoLoading`;
export const INFO_UPDATE = `${prefix}/infoUpdate`;
export const WIN_RESIZE = `${prefix}/winResize`;

/**
 * 窗口大小变化
 * @type {Function}
 */
export const winResize = createAction(WIN_RESIZE, 'winWidth', 'winHeight');

/**
 * 用户登录
 * @param data 登录数据
 * @returns {function(*, *)}
 */
export const login = (data) => {
  return (request, dispatch, getState) => {
    dispatch({type: LOGIN_LOADING, loginLoading: true});
    const loginData = new FormData();
    loginData.append('username', data.username);
    loginData.append('password', data.password);
    request({
      url: loginInUrl,
      method: 'post',
      data: loginData
    })
      .then((json) => {
        if (json.ok) {
          const {token, username, id, roles} = json.entity;
          const preveUserId = getState()[prefix].userId;
          localStorage.setItem('access-token', token);
          localStorage.setItem('user-name', username);
          localStorage.setItem('user-id', id);
          localStorage.setItem('user-roles', JSON.stringify(roles));
          if (id !== preveUserId) {
            window.location.search = '';
            window.location.reload();
            return;
          }
          dispatch(getUserMenus());
          dispatch({
            type: LOGIN_LOADING,
            loginLoading: false
          });
        } else {
          message.error(json.msg);
          dispatch({type: LOGIN_LOADING, loginLoading: false});
        }
      })
      .catch((err) => {
        message.error(err.message);
        dispatch({type: LOGIN_LOADING, loginLoading: false});
      });
  };
};

/**
 * 退出登录
 * @returns {function(*, *)} chunk
 */
export const loginOut = () => {
  return (request, dispatch) => {
    request({
      url: loginOutUrl,
      method: 'get'
    })
      .then(() => {
        localStorage.setItem('access-token', '');
        dispatch(push('/login'));
      })
      .catch((err) => {
        message.error(err.message);
      });
  };
};

/**
 * 请求用户菜单
 * @returns {function(*, *, *)} chunk
 */
export const getUserMenus = () => {
  return (request, dispatch, getState) => {
    const {router} = getState();
    const {pathname} = router.location;
    const search = parse(router.location.search);
    dispatch({type: INFO_LOADING, loading: true});
    request({
      url: getUserMenusUrl,
      method: 'get'
    })
      .then((json) => {
        if (json) {
          const userName = localStorage.getItem('user-name');
          const userId = localStorage.getItem('user-id');
          const userRoles = JSON.parse(localStorage.getItem('user-roles'));
          const menusTree = getMenusTree(json.filter(_ => _.display), {id: 'code', parentId: 'parentCode'}, '-1');
          dispatch({
            type: INFO_UPDATE,
            menus: json,
            menusTree,
            userName,
            userId,
            userRoles
          });
          if (pathname === '/login') {
            if (search.from) {
              dispatch(push(search.from));
            } else {
              dispatch(push(defaultPagePath));
            }
          }
        }
      })
      .catch((err) => {
        if (err) {
          message.error(err.message);
        }
      });
  };
};

