import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Table, Button} from 'antd';

/* action */
import {prefix, getList, downloadFile} from "../action";
import {createHandleTableChange} from '../../../common/utils/handles';
import InitialCallback from "../../../common/InitialCallback";

const {Column} = Table;

const typeIndex = {
  'FILE': '文件',
};

const List = ({
  records, listLoading, pageNumber, pageSize, total,
  dispatch,
}) => {
  const updateList = (params) => {
    dispatch(getList(params));
  };
  return [
    <InitialCallback key="init" actions={() => dispatch(getList({pageNumber: 1}))}/>,
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
        title="类型"
        key="type"
        width={200}
        render={(_, record) => typeIndex[record.resourceType]}
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
              <Button icon="solution" onClick={() => downloadFile(record.id)}>下载</Button>
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
