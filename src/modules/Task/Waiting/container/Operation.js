import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Search from "../../../common/Search/Container";

/* action */
import {search} from '../action';

const Operation = ({ search }) => {
    return (
        <div className="operation-container">
            {/*<div className="operation-item">*/}
                {/*<Button type="primary" onClick={add} icon="plus">新增</Button>*/}
            {/*</div>*/}
            <Search
                enhancedSearch={false}
                optionsIndex={[{ title: '单号', type: 'keyword', key: 'businessKey', value: '' },{ title: '申请时间', type: 'keyword', key: 'createTime', value: '' }]}
                defaultSearchOptions={[{ title: '单号', type: 'keyword', key: 'businessKey', value: '' }]}
                onSearch={search}
            />
        </div>
    );
};

Operation.propTypes = {
    // add: PropTypes.func.isRequired,
    search: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => {
    return {
        // add: () => {dispatch(showModal('add'))},
        search: (value) => dispatch(search(value))
    };
};

export default connect(undefined, mapDispatchToProps)(Operation);
