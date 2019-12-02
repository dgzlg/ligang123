import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Button} from 'antd';
import Search from "../../../common/Search/Container";

/* action */
import {search, showModal} from '../action';

const Operation = ({ add, search }) => {
    return (
        <div className="operation-container">
            <div className="operation-item">
                <Button type="primary" onClick={add} icon="plus">新增</Button>
            </div>
            <Search
                enhancedSearch={true}
                optionsIndex={[{ title: '名称', type: 'keyword', key: 'username', value: '' },{ title: '所属机构', type: 'keyword', key: 'orgName', value: '' }]}
                defaultSearchOptions={[{ title: '名称', type: 'keyword', key: 'username', value: '' }]}
                onSearch={search}
            />
        </div>
    );
};

Operation.propTypes = {
    add: PropTypes.func.isRequired,
    search: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => {
    return {
        add: () => {
            dispatch(showModal('add'));
            },
        search: (value) => dispatch(search(value))
    };
};

export default connect(undefined, mapDispatchToProps)(Operation);
