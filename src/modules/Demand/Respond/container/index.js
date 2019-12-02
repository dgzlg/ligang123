import React from 'react';
import PropTypes from 'prop-types';
import {Col, Row} from "antd";
import DragContainer from "../../../common/DragAndDrop/Context";
import SourceExplorer from "../../../Resource/Explorer/container";
import SourceCollector from "../../../Resource/Collector/container";
import {BlockPage} from "../../../common/Page";
import {addResourceToList} from "../../../Resource/Collector/action";

const Respond = ({match: {params: {isModify, demandid: demandId}}}) => {
  return (
    <BlockPage>
      <DragContainer>
        <Row gutter={14}>
          <Col span={14}>
            <SourceExplorer
              editable={false}
              draggable={true}
              contextMenuExtends={[
                {name: '添加至申请列表', action: addResourceToList}
              ]}
            />
          </Col>
          <Col span={10}>
            <SourceCollector
              title="响应需求"
              submitType="respond"
              payload={{
                isModify: isModify !== undefined,
                demandId,
              }}
            />
          </Col>
        </Row>
      </DragContainer>
    </BlockPage>
  );
};

Respond.propTypes = {
  match: PropTypes.object,
};

export default Respond;
