import React from 'react';
import {Row, Col, Input, Button} from 'antd';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addOrg, searchOrg} from '../action';

const Operation = ({dispatch}) => {
    const handleSearch = (value) => {
        dispatch(searchOrg(value));
    }
    const handleAdd = () => {
        dispatch(addOrg());
    }
    return (
        <Row className='operation-container' gutter={32}>
            <Col span={2}>
                <Button type='primary' onClick={handleAdd} icon='plus'>新增</Button>
            </Col>
            <Col span={4}>
                <Input.Search placeholder='输入机构名称' onSearch={handleSearch} enterButton/>
            </Col>
        </Row>
    );
};

Operation.propTypes = {
    dispatch: PropTypes.func.isRequired
};

export default connect()(Operation);
