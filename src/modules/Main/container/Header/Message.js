import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import {sumBy} from 'lodash';
import {prefix, openWin} from "../../../MyMessage/action";

const Message = ({dispatch, contacts}) => {
    const msgNum = sumBy(contacts, 'unread');
    return (
        <div className="app-message" onClick={() => dispatch(openWin())}>
            <Icon type="message" />
            {msgNum > 0 ?
                <div className="num">{msgNum}</div>
                :
                ''
            }
        </div>
    );
};

Message.propTypes = {
    dispatch: PropTypes.func,
    contacts: PropTypes.array.isRequired
};

const mapStateToProps = ({[prefix]: {contacts} }) => {
    return {contacts};
};

export default connect(mapStateToProps)(Message);
