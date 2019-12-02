import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table , Button } from 'antd';
import {createHandleTableChange} from "../../../../modules/common/utils/handles";
import InitialCallback from "../../../common/InitialCallback";
/* action */
import {prefix, getList, scan} from "../action";
import typeIndex from '../../typeIndex';

const { Column } = Table;

const List = ({
                 records, listLoading, pageNumber, pageSize, total, dispatch
              }) => {
    const init = () => {
        dispatch(getList({pageSize, pageNumber: 1}));
    };
    const updateList = (params) => {dispatch(getList(params))};

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
                  title="审批人"
                  dataIndex="approver"
                />
                <Column
                  title="审批时间"
                  dataIndex="endTime"
                  sorter={true}
                  render={(date) => new Date(date).toLocaleString()}
                />
                <Column
                    title="审批环节"
                    dataIndex="taskName"

                />
                <Column
                    title="操作"
                    key="operation"
                    width={100}
                    render={(_, record) => {
                        return (
                           <Button icon="eye" size="small" onClick={() => dispatch(scan(record))}>查看</Button>
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
