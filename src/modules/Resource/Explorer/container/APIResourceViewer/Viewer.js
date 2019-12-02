import React from 'react';
import PropTypes from 'prop-types';
import {Modal, Spin, Button, Row, Col, Table} from 'antd';
import './Viewer.less';

const {Column} = Table;

const APIResourceViewer = ({
  editable, state, resource, close, edit, test,
}) => {
  return (
    <Modal
      className="api-resource-viewer"
      visible={state !== 0}
      title="API资源详情"
      width={500}
      destroyOnClose={true}
      onCancel={close}
      footer={[
        editable && resource.status === 'DRAFT' ?
          <Button key="edit" htmlType="button" type="primary" disabled={state !== 2} onClick={edit}>编辑</Button>
          : '',
        <Button key="test" htmlType="button" type="defualt" onClick={test}>测试</Button>,
        <Button key="close" htmlType="button" type="default" onClick={close}>关闭</Button>,
      ]}
    >
      <Spin spinning={state === 1}>
        <Row>
          <Col span={8}>资源名：</Col>
          <Col span={16}>{resource.name}</Col>
        </Row>
        <Row>
          <Col span={8}>资源描述：</Col>
          <Col span={16}>{resource.description}</Col>
        </Row>
        <Row>
          <Col span={8}>接口名：</Col>
          <Col span={16}>{resource.interface.name}</Col>
        </Row>
        <Row>
          <Col span={8}>请求URL：</Col>
          <Col span={16}>{resource.interface.url}</Col>
        </Row>
        <Row>
          <Col span={8}>请求方式：</Col>
          <Col span={16}>{resource.interface.method}</Col>
        </Row>
        <Row>
          <Col span={8}>返回类型：</Col>
          <Col span={16}>{resource.interface.responseType}</Col>
        </Row>
        <Row>
          <Col span={8}>前置接口：</Col>
          <Col span={16}>{resource.interface.preInterface || '无'}</Col>
        </Row>
        <Row>
          <Col span={24}>参数：</Col>
        </Row>
        <Table
          dataSource={resource.interface.params}
          size="small"
          rowKey={(param) => param.name}
          pagination={false}
        >
          <Column title="键名" dataIndex="name" key="name" width={100}/>
          <Column
            title="&nbsp;&nbsp;&nbsp;&nbsp;"
            dataIndex="required"
            key="required"
            width={80}
            render={(r) => (r ? '必填' : '可选')}
          />
          <Column title="类型" dataIndex="in" key="position"/>
          <Column
            title="测试值"
            dataIndex="testValueSource"
            key="test"
            render={(type, param) => {
              if (type === 'static') {
                return param.testValue;
              }
              return `来自接口${param.from}`;
            }}
          />
        </Table>
      </Spin>
    </Modal>
  );
};

APIResourceViewer.propTypes = {
  editable: PropTypes.bool,
  state: PropTypes.number.isRequired,
  resource: PropTypes.object,
  close: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  test: PropTypes.func.isRequired,
};

export default APIResourceViewer;
