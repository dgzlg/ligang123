import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Popover, Icon } from 'antd';
import { loginOut } from '../../action';

const User = ({ loginOut: handleLoginOut, name }) => {
    const content = (
        <div className="header-user-pop">
            <div onClick={handleLoginOut}>退出</div>
            <div>设置</div>
        </div>
    );
    return (
        <Popover content={content} placement="bottom">
            <div className="app-user">
                <Icon type="user" />
                <span className="name">{name}</span>
            </div>
        </Popover>
    );
};

User.propTypes = {
    loginOut: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    role: PropTypes.string
};

const mapStateToProps = ({ Main: { userName: name, userRole: role } }) => {
    return { name, role };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loginOut: () => dispatch(loginOut())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
