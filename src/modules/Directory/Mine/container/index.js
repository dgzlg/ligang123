import React from 'react';
import {Col, Row} from 'antd';
import {BlockPage} from '../../../common/Page/index';
import DragContainer from '../../../common/DragAndDrop/Context';
import MyDirectory from './MyDirectory';
import PublicDirectory from './PublicDirectory';

const Directory = () => {
  return (
    <BlockPage>
      <DragContainer>
        <Row gutter={14}>
          <Col span={12}>
            <MyDirectory/>
          </Col>
          <Col span={12}>
            <PublicDirectory/>
          </Col>
        </Row>
      </DragContainer>
    </BlockPage>
  );
};

Directory.propTypes = {};

export default Directory;
