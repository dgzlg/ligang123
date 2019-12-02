import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Modal, Table, Button} from 'antd';

/* action */
import {prefix, getList, deleteRole, powerRole} from "../action";
import {createHandleTableChange} from '../../../common/utils/handles';
import InitialCallback from "../../../common/InitialCallback";

const {Column} = Table;

const List = ({
  records, listLoading, pageNumber, pageSize, total,
  dispatch,
}) => {
  const init = () => {
    dispatch(getList({pageSize, pageNumber: 1}));
  };
  const updateList = (params) => {
    dispatch(getList(params));
  };
  const deleteRecord = (record) => {
    Modal.confirm({
      title: '你确定要删除此角色吗？',
      content: `删除的角色：${record.name}`,
      onOk: () => dispatch(deleteRole(record))
    });
  };
  const editRecord = (record) => {
    dispatch(powerRole(record));
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
    >
      <Column
        title="名称"
        dataIndex="name"
        width={200}
        sorter={true}
      />
      <Column
        title="描述"
        dataIndex="description"
        width={600}
      />
      <Column
        title="操作"
        key="operation"
        width={160}
        render={(_, record) => {
          return (
            <Button.Group size="small">
              <Button icon="solution" onClick={() => editRecord(record)}>赋权</Button>
              <Button icon="delete" onClick={() => deleteRecord(record)}>删除</Button>
            </Button.Group>
          );
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
