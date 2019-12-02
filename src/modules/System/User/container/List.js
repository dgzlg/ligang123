import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal, Table , Select, message} from 'antd';
import {createHandleTableChange} from "../../../../modules/common/utils/handles";
import InitialCallback from "../../../common/InitialCallback";

/* action */
import {prefix, getOrgList, getList, deleteRecord, showModal, activate} from "../action";

const { Column } = Table;
const List = ({
                   records, listLoading, pageNumber, pageSize, total, dispatch
              }) => {
    const init = () => {
        dispatch(getOrgList());
        dispatch(getList({pageSize, pageNumber: 1}));
    };

    const handleOperate = (key, record) => {
        switch (key) {
            case 'edit':
                openModal(key,record);
                break;
            case 'allocate':
                openModal(key,record);
                break;
            case 'delete':
                deleteTheRecord(record);
                break;
            case 'activate':
                activateAndInactivate(key,record);
                break;
            case 'inactivate':
                activateAndInactivate(key,record);
                break;
            default :
                message.error('意料之外的Select.Option属性值!');
        }
    };

    const updateList = (params) => {dispatch(getList(params))};
    const deleteTheRecord = (record) => {
            Modal.confirm({
                title: `你确定要删除此用户吗？`,
                content: `删除的用户：${record.username}`,
                onOk: () => {
                    dispatch(deleteRecord(record));
                    updateList({pageNumber: 1});
                }
            });
        };
    const openModal = (key, record) => {dispatch(showModal(key, record));
        };
    const activateAndInactivate = (key, record) => {
            dispatch(activate(key, record));
        };
    return (
        <div>
            <InitialCallback key="init" actions={init}/>
            <Table
                bordered={true}
                dataSource={records}
                loading={listLoading}
                pagination={{current: pageNumber, pageSize, total, onChange: updateList}}
                rowKey={(r, index) => index}
                onChange={createHandleTableChange(updateList)}
            >
                <Column
                    title="所属机构"
                    dataIndex="orgName"
                />
                <Column
                    title="名称"
                    dataIndex="username"
                    sorter={true}
                />
                <Column
                    title="邮箱"
                    dataIndex="email"
                />
                <Column
                    title="描述"
                    dataIndex="description"
                />
                <Column
                    title="状态"
                    dataIndex="enabled"
                    render={(text, record) => {
                        return record.enabled ? <span className="mark-color-green">已激活</span> :
                            <span className="mark-color-grey">未激活</span>;
                    }}
                />
                <Column
                    title="操作"
                    key="operation"
                    width={100}
                    render={(_, record, index) => {
                        return (
                            <Select key={index} value={'操作'} onChange={(value) => handleOperate(value, record)}
                                    style={{width: 100}}>
                                <Select.Option value='edit'>修改</Select.Option>
                                <Select.Option value='allocate'>分配角色</Select.Option>
                                <Select.Option value='delete'>删除</Select.Option>
                                <Select.Option
                                    value={record.enabled ? 'inactivate' : 'activate'}>{record.enabled ? '禁用' : '激活'}</Select.Option>
                            </Select>
                        );
                    }}
                />
            </Table>
        </div>
    );
};

List.propTypes = {
    records: PropTypes.array.isRequired,
    listLoading: PropTypes.bool.isRequired,
    pageNumber: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,

    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = ({ [prefix]: { list: { records, listLoading, pageNumber, pageSize, total } } }) => {
    return { records, listLoading, pageNumber, pageSize, total };
};

export default connect(mapStateToProps)(List);
