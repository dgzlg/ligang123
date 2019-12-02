import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Button} from 'antd';

/* action */
import {searchRole, addRole} from '../action';
import Search from "../../../common/Search/Container";

const Operation = ({ search, add }) => {
    return (
        <div className="operation-container">
            <div className="operation-item">
                <Button type="primary" onClick={add} icon="plus">新增</Button>
            </div>
            <Search
                enhancedSearch={true}
                optionsIndex={[{ title: '名称', type: 'keyword', key: 'name', value: '' }]}
                defaultSearchOptions={[{ title: '名称', type: 'keyword', key: 'name', value: '' }]}
                onSearch={search}
            />
        </div>
    );
};

Operation.propTypes = {
    search: PropTypes.func.isRequired,
    add: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => {
    return {
        add: () => dispatch(addRole()),
        search: (value) => dispatch(searchRole(value))
    };
};

export default connect(undefined, mapDispatchToProps)(Operation);
