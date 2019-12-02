import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/* action */
import {search} from '../action';
import Search from "../../../common/Search/Container";

const Operation = ({dispatch}) => {
    return (
        <div className="operation-container">
            <Search
                enhancedSearch={true}
                optionsIndex={[{ title: '名称', type: 'keyword', key: 'name', value: '' }]}
                defaultSearchOptions={[{ title: '名称', type: 'keyword', key: 'name', value: '' }]}
                onSearch={(value) => dispatch(search(value))}
            />
        </div>
    );
};

Operation.propTypes = {
    dispatch: PropTypes.func,
};

export default connect()(Operation);
