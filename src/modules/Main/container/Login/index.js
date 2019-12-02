import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Form, Input, Button, Icon} from 'antd';
import {login as loginAction} from '../../action';
import {appName, logoSVG, copyRight} from '../../../../config/info';
import './index.less';

const Index = ({form: {getFieldDecorator, validateFields}, login, loginLoading, winWidth, winHeight}) => {
  const handleLogin = () => {
    validateFields((err, values) => {
      if (!err) {
        login(values);
      }
    });
  };
  return (
    <div id="app-login">
      <div className="block-left"/>
      <div className="block-right">
        <div className="app-logo">
          <img src={logoSVG} alt="logo"/>
        </div>
        <div className="app-name">{appName}</div>
        <div className="welcome">欢迎回来！</div>
        <div className="login-form">
          <Form>
            <Form.Item>
              {getFieldDecorator('username', {rules: [{required: true, message: '请输入用户名'}]})(
                <Input placeholder="用户名" prefix={<Icon type="user"/>} onPressEnter={handleLogin}/>
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {rules: [{required: true, message: '请输入密码'}]})(
                <Input placeholder="密码" type="password" prefix={<Icon type="lock"/>} onPressEnter={handleLogin}/>
              )}
            </Form.Item>
          </Form>
          <Button className="btn-login" style={{width: '100%'}} type="default" loading={loginLoading}
                  onClick={handleLogin}>登录</Button>
        </div>
        <div className="copy-right">{copyRight}</div>
      </div>
    </div>
  );
};

Index.propTypes = {
  form: PropTypes.object,
  login: PropTypes.func.isRequired,
  loginLoading: PropTypes.bool.isRequired,
  winWidth: PropTypes.number.isRequired,
  winHeight: PropTypes.number.isRequired
};

const mapStateToProps = ({Main: {loginLoading, winWidth, winHeight}}) => {
  return {loginLoading, winWidth, winHeight};
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (data) => {
      dispatch(loginAction(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  Form.create()(Index)
);
