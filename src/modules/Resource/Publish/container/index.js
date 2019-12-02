import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col} from 'antd';
import {BlockPage} from "../../../common/Page";
import DragContainer from '../../../common/DragAndDrop/Context';
import ResourceExplorer from '../../Explorer/container/index';
import ResourceCollector from '../../Collector/container/index';
import {addResourceToList} from "../../Collector/action";

const ResourcePublish = ({match: {params: {ismodify: isModify, taskid: taskId}}}) => {
  return (
    <BlockPage>
      <DragContainer>
        <Row gutter={14}>
          <Col span={14}>
            <ResourceExplorer
              editable={false}
              draggable={true}
              contextMenuExtends={[
                {name: '添加至发布列表', action: addResourceToList}
              ]}
            />
          </Col>
          <Col span={10}>
            <ResourceCollector
              title="申请发布资源"
              submitType="publish"
              payload={{
                isModify: isModify !== undefined,
                taskId: taskId || null,
              }}
            />
          </Col>
        </Row>
      </DragContainer>
    </BlockPage>
  );
};

ResourcePublish.propTypes = {
  match: PropTypes.object,
  ismodify: PropTypes.bool,
  taskid: PropTypes.string,
};

export default ResourcePublish;
