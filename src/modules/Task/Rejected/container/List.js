import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Table, Button} from 'antd';
import {createHandleTableChange} from "../../../../modules/common/utils/handles";
import InitialCallback from "../../../common/InitialCallback";
/* action */
import {prefix, getList, scanDetail, settle, drop} from "../action";
import typeIndex from '../../typeIndex';
import {contactWith} from "../../../MyMessage/action";

const {Column} = Table;

const List = (
  {
    records, listLoading, pageNumber, pageSize, total, dispatch
  }
) => {
  const init = () => {
    dispatch(getList({pageSize, pageNumber: 1}));
  };
  const updateList = (params) => {
    dispatch(getList(params));
  };

  return (
    <div>
      <InitialCallback key="init" actions={init}/>
      <Table
        bordered={true}
        dataSource={records}
        loading={listLoading}
        pagination={{current: pageNumber, pageSize, total}}
        rowKey={(r) => r.id}
        onChange={createHandleTableChange(updateList)}
      >
        <Column
          title="标题"
          dataIndex="title"
        />
        <Column
          title="类型"
          dataIndex="processDefinitionId"
          render={(type) => typeIndex[type]}
        />
        <Column
          title="审批人"
          dataIndex="approver"
        />
        <Column
          title="申请时间"
          dataIndex="createTime"
          sorter={true}
          render={(date) => new Date(date).toLocaleString()}
        />
        <Column
          title="操作"
          key="operation"
          width={300}
          render={(_, record) => {
            return (
              <Button.Group size="small">
                <Button icon="message" size="small" onClick={() => dispatch(contactWith(record.approver))}>联系</Button>
                <Button icon="profile" size="small" onClick={() => dispatch(scanDetail(record))}>详情</Button>
                <Button icon="delete" size="small" onClick={() => dispatch(drop(record.id))}>作废</Button>
                <Button icon="file-done" size="small" onClick={() => dispatch(settle(record))}>处理</Button>
              </Button.Group>
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

const mapStateToProps = ({[prefix]: {list: {records, listLoading, pageNumber, pageSize, total}}}) => {
  return {records, listLoading, pageNumber, pageSize, total};
};

export default connect(mapStateToProps)(List);
