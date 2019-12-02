import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Table, Button} from 'antd';
import {prefix, getList, handleResponse} from '../action';
import {createHandleTableChange} from '../../../common/utils/handles';
import InitialCallback from "../../../common/InitialCallback";
import {contactWith} from "../../../MyMessage/action";

const {Column} = Table;

const statusIndex = {
    'RESPONSED': ['已响应', 'green'],
    'UN_RESPONSED': ['待响应', 'blue'],
    'RESPONDING': ['响应中', 'orange'],
};

const List = ({
    records, listLoading, pageNumber, pageSize, total, dispatch,
}) => {
    const init = () => {
        dispatch(getList({pageSize, pageNumber: 1}));
    };
    const updateList = (params) => {
        dispatch(getList(params));
    };
    const responseRecord = (record) => {
        dispatch(handleResponse(record));
    };
    const contact = (targetName) => {
        dispatch(contactWith(targetName));
    };
    return [
        <InitialCallback key="init" actions={init}/>,
        <Table
            key="content"
            bordered={true}
            dataSource={records}
            loading={listLoading}
            pagination={{current: pageNumber, pageSize, total}}
            rowKey={(r, index) => index}
            onChange={createHandleTableChange(updateList)}
            expandedRowRender={(record) => <p style={{opacity: 0.7}}>需求描述：{record.description || '无'}</p>}
            expandRowByClick={true}
        >
            <Column
                title="标题"
                dataIndex="name"
                width={160}
            />
            <Column
                title="发布机构"
                dataIndex="orgName"
                width={160}
            />
            <Column
                title="发布人"
                dataIndex="creator"
                width={144}
            />
            <Column
                title="发布时间"
                dataIndex="createDate"
                width={130}
            />
            <Column
                title="状态"
                key="status"
                width={100}
                render={(_, record) => <span className={`mark-color-${statusIndex[record.status][1]}`}>{statusIndex[record.status][0]}</span>}
            />
            <Column
                title="操作"
                key="operation"
                width={100}
                render={(_, record) => {
                    if(record.status === 'UN_RESPONSED') {
                        return (
                            <Button.Group size="small">
                                <Button icon="message" onClick={() => contact(record.creator)}>联系</Button>
                                <Button icon="check" onClick={() => responseRecord(record)}>响应</Button>
                            </Button.Group>
                        );
                    }
                    return '';

                }}
            />
        </Table>
    ];
};

List.propTypes = {
    records: PropTypes.array.isRequired,
    listLoading: PropTypes.bool.isRequired,
    pageNumber: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = ({[prefix]: {list: {records, listLoading, pageNumber, pageSize, total}}}) => {
    return {records, listLoading, pageNumber, pageSize, total};
};

export default connect(mapStateToProps)(List);
