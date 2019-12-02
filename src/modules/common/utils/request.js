/* global Promise, window */
import axios from 'axios/index';
import {message} from 'antd';
import {stringify} from 'query-string';
import {push} from 'connected-react-router';

let HAS_REQUESTS_ACCESS = false;

const request = (option, dispatch) => {
    const accessToken = localStorage.getItem('access-token');
    option.headers = option.headers || {};
    option.headers._token = option.headers._token || accessToken;
    option.params = option.params || {};
    option.params._token = option.params._token || accessToken;
    option.params._from = 'ajax';
    return new Promise((resolve, reject) => {
        axios(option)
        .then((res) => {
            /* 登录失效 */
            if (res.data && res.data.status === 40101) {
                const {pathname, search} = window.location;
                if (HAS_REQUESTS_ACCESS) {
                    HAS_REQUESTS_ACCESS = false;
                    message.warning('登录已失效，请重新登录');
                }
                if (pathname === '/login') {
                    return;
                }
                dispatch(push(`/login?${stringify({ from: `${pathname}${search}` })}`));
                return;
            }
            if (res.data && res.data.ok === false) {
                reject({message: res.data.msg});
                return;
            }
            HAS_REQUESTS_ACCESS = true;
            resolve(res.data);
        })
        .catch((err) => {
            reject(err);
        });
    });
};

export {
    request
};
