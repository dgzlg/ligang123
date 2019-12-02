import React from 'react';
import {Modal, Button} from 'antd';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ElementList from './ElementList';
import {Cancel} from "../action";
import ElementEdit from "./ElementEdit";
import {prefix, addElement} from '../action';

const ElementModal = ({ elementVisible,record, dispatch }) => {
    const handleAdd = () => {
        dispatch(addElement(record));
    };
    const handleCancel = () => {
        dispatch(Cancel());
    };
    return (
        <Modal
            title='资源管理'
            visible={elementVisible}
            maskClosable={false}
            onCancel={handleCancel}
            width={900}
            footer={[
                <Button key='1' type='default' onClick={handleAdd} icon='plus'>新增资源</Button>,
                <Button key='0' type='default' onClick={handleCancel}>取消</Button>
            ]}
        >
            <ElementEdit/>
            <ElementList/>
        </Modal>
    );
};

ElementModal.propTypes = {
    elementVisible: PropTypes.bool.isRequired,
    dispatch:PropTypes.func.isRequired,
    record:PropTypes.object.isRequired
};

const mapStateToProps = ({[prefix]: {addElement,elementVisible,cancel,record}}) => {
    return {addElement,elementVisible,cancel,record};
};

export default connect(mapStateToProps)(ElementModal);
