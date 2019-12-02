import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Table, Button} from 'antd';
import {createHandleTableChange} from "../../../../modules/common/utils/handles";
import InitialCallback from "../../../common/InitialCallback";
/* action */
import {prefix, getList, approve} from "../action";
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
          title="申请人"
          dataIndex="creator"
        />
        <Column
          title="申请时间"
          key="createTime"
          sorter={true}
          render={(_, record) => new Date(record.createTime).toLocaleString()}
        />
        <Column
          title="操作"
          key="operation"
          width={168}
          render={(_, record) => {
            return (
              <Button.Group>
                <Button icon="message" size="small" onClick={() => dispatch(contactWith(record.creator))}>联系</Button>
                <Button icon="file-done" size="small" onClick={() => dispatch(approve(record))}>处理</Button>
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
