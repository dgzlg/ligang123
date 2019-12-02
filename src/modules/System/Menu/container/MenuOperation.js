import React from 'react';
import {Row, Col, Button, Input} from 'antd';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
/*action*/
import {addMenu, searchMenu} from '../action';

const MenuOperation = ({add, search}) => {
    return (
        <Row className='operation-container' gutter={32}>
            <Col span={2}>
                <Button type='primary' onClick={add} icon='plus'>新增</Button>
            </Col>
            <Col span={4}>
                <Input.Search placeholder='输入菜单名称' onSearch={search} enterButton/>
            </Col>
        </Row>
    );
};

MenuOperation.propTypes = {
    add: PropTypes.func.isRequired,
    search: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => {
    return {
        add: () => dispatch(addMenu()),
        search:(value)=>dispatch(searchMenu(value))
    };

};

export default connect(undefined, mapDispatchToProps)(MenuOperation);
