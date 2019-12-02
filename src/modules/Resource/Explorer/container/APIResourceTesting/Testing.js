import React from 'react';
import PropTypes from 'prop-types';
import {Modal, Spin, Button} from 'antd';

const APIResourceTesting = ({state, result, close}) => {
  return (
    <Modal
     align={{}}
     title="接口测试"
     width={600}
     zIndex={1001}
     mask={false}
     visible={state !== 0}
     maskClosable={false}
     onCancel={close}
     footer={[
       <Button key="close" htmlType="button" type="default" onClick={close}>关闭</Button>
     ]}
    >
      <Spin spinning={state === 1}>
        <pre width={552}>{result}</pre>
      </Spin>
    </Modal>
  );
};

APIResourceTesting.propTypes = {
  state: PropTypes.number.isRequired,
  result: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
};

export default APIResourceTesting;