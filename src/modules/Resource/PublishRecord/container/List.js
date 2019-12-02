import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Table, Button} from 'antd';
import {prefix, getList, handleDetails} from '../action';
import {createHandleTableChange} from '../../../common/utils/handles';
import InitialCallback from "../../../common/InitialCallback";

const {Column} = Table;

const statusIndex = {
  '审批中': 'orange',
  '被拒绝': 'red',
  '已结束': 'grey',
};

const List = ({
    pubList, listLoading, pageNumber, pageSize, total, dispatch,
}) => {
    const init = () => {
        dispatch(getList({pageSize, pageNumber: 1}));
    };
    const updateList = (params) => {
        dispatch(getList(params));
    };
    const onClickDetails = (record) => {
        dispatch(handleDetails(record));
    };
    return [
        <InitialCallback key="init" actions={init}/>,
        <Table
            key="content"
            bordered={true}
            dataSource={pubList}
            loading={listLoading}
            pagination={{current: pageNumber, pageSize, total}}
            rowKey={(r, index) => index}
            onChange={createHandleTableChange(updateList)}
        >
            <Column
                title="发布人"
                dataIndex="creator"
                width={200}
            />
            <Column
                title="发布时间"
                dataIndex="startTime"
                width={160}
                render={(date) => new Date(date).toLocaleString()}
            />
            <Column
                title="审批时间"
                dataIndex="endTime"
                width={160}
                render={(date) => date ? new Date(date).toLocaleString() : '无'}
            />
            <Column
                title="状态"
                dataIndex="status"
                width={160}
                render={(status) => {
                    return (
                        <span className={`mark-color-${statusIndex[status]}`}>
                            {status}
                        </span>
                    );
                }}
            />
            <Column
                title="操作"
                key="operation"
                width={100}
                render={(_, record) => {
                    return (
                        <Button.Group size="small">
                            <Button icon="profile" onClick={() => onClickDetails(record)}>详情</Button>
                        </Button.Group>
                    );
                }}
            />
        </Table>
    ];
};

List.propTypes = {
    pubList: PropTypes.array.isRequired,
    listLoading: PropTypes.bool.isRequired,
    pageNumber: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = ({[prefix]: {pubList, listLoading, pageNumber, pageSize, total}}) => {
    return {pubList, listLoading, pageNumber, pageSize, total};
};

export default connect(mapStateToProps)(List);
