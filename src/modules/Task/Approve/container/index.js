import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Row, Col, Input, Button} from 'antd';
import {BlockPage} from "../../../common/Page";
import ThemedContainer from '../../../common/ThemedContainer';
import RequestInfo from './RequestInfo';
import History from './History';
import {approve, prefix, updateData, updateFormValue} from '../action';
import {FOOTER_HEIGHT, HEADER_HEIGHT} from "../../../Main/container/uiConfig";
import InitialCallback from "../../../common/InitialCallback";

const TextArea = Input.TextArea;

const mapStateToProps = (
  {
    'Main': {winHeight},
    [prefix]: {history, comment, approveLoading, directoryTree, demand, fileList, response, request}
  }
) => (
  {winHeight, history, comment, approveLoading, directoryTree, demand, fileList, response, request}
);

const Approve = (
  {
    match: {params: {type, id, processid}, path},
    dispatch, winHeight, history, comment, approveLoading,
    directoryTree, demand, fileList, response, request,
  }
) => {
  const contentHeight = winHeight - HEADER_HEIGHT - FOOTER_HEIGHT - 32;
  let mode = 'scan';
  if (path.indexOf('approve') >= 0) {
    mode = 'approve';
  }
  return (
    <BlockPage>
      <InitialCallback
        actions={() => dispatch(updateData(type, id, processid))}
      />
      <Row gutter={14}>
        <Col span={12}>
          <RequestInfo
            type={type}
            style={{height: contentHeight}}
            directoryTree={directoryTree}
            demand={demand}
            fileList={fileList}
            response={response}
            request={request}
          />
        </Col>
        <Col span={12}>
          <ThemedContainer
            title="审批历史"
            style={{height: mode === 'approve' ? contentHeight - 286 : contentHeight}}
          >
            <History
              style={{
                paddingTop: mode === 'approve' ? (contentHeight - 286) / 2 - 80 : contentHeight / 2 - 80,
                paddingLeft: 24,
                paddingRight: 24,
              }}
              list={history}
              mode={mode}
              type={type}
            />
          </ThemedContainer>
          {mode === 'approve' ?
            <ThemedContainer
              title="审批意见"
              style={{height: 272, marginTop: 14}}
            >
            <TextArea
              placeholder="审批意见"
              rows={5}
              value={comment}
              onChange={(e) => dispatch(updateFormValue({comment: e.currentTarget.value}))}
            />
              <div style={{marginTop: 24, textAlign: 'right'}}>
                <Button htmlType="button" type="default" style={{marginRight: 14}} disabled={approveLoading} onClick={() => dispatch(approve(false))}>不通过</Button>
                <Button htmlType="button" type="primary" disabled={approveLoading} onClick={() => dispatch(approve(true))}>通过</Button>
              </div>
            </ThemedContainer>
            : ''
          }
        </Col>
      </Row>
    </BlockPage>
  );
};

Approve.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string,
  processid: PropTypes.string,
  dispatch: PropTypes.func,
  winHeight: PropTypes.number,
  history: PropTypes.array,
  comment: PropTypes.string,
  approveLoading: PropTypes.bool,
  directoryTree: PropTypes.array,
  demand: PropTypes.object,
  fileList: PropTypes.array,
  request: PropTypes.object,
  response: PropTypes.object,
};

export default connect(mapStateToProps)(Approve);