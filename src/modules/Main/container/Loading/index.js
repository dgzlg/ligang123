import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Spin } from 'antd';

const Loading = ({ loading }) => {
    if (!loading) return '';
    return (
        <div id="app-loading">
            <Spin size="large" spinning={true}>{''}</Spin>
        </div>
    );
};

Loading.propTypes = {
    loading: PropTypes.bool.isRequired
};

const mapStateToProps = ({ Main: { loading } }) => {
    return { loading };
};

export default connect(mapStateToProps)(Loading);
