import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Input, Button} from 'antd';
import {HEADER_HEIGHT, FOOTER_HEIGHT} from "../../../Main/container/uiConfig";
import ThemedContainer from '../../../common/ThemedContainer/index';
import Collector from '../../../common/Collector/index';
import InitialCallback from '../../../common/InitialCallback';
import {
  addResourceToList, clearList,
  prefix, apply, removeResourceFromList, updateFormValue, dropApply, initialList,
} from "../action";

const ResourceCollector = (
  {
    title, submitType, payload, dispatch, winHeight, submitLoading, list, description,
  }
) => {

  const contextProvider = () => {
    return [
      {name: '移除', action: target => dispatch(removeResourceFromList(target))}
    ];
  };

  return (
    <ThemedContainer
      className="my-publish"
      style={{minHeight: `${winHeight - HEADER_HEIGHT - FOOTER_HEIGHT - 32}px`}}
      title={`${title}${payload.isModify ? '（重提）' : ''}`}
    >
      <InitialCallback
        actions={() => dispatch(initialList(submitType, payload))}
      />
      <Collector
        style={{minHeight: `${winHeight - HEADER_HEIGHT - FOOTER_HEIGHT - 288}px`}}
        list={list}
        handleDropIn={(target) => dispatch(addResourceToList(target))}
        contextProvider={contextProvider}
      />
      <Input.TextArea
        style={{marginTop: 24}}
        rows={4}
        placeholder={'填写说明'}
        value={description}
        onChange={(e) => dispatch(updateFormValue({description: e.currentTarget.value}))}
      />
      <div style={{marginTop: '16px', textAlign: 'right'}}>
        <Button type="default" htmlType="button" onClick={() => dispatch(clearList())}>清空</Button>
        {payload.isModify ?
          <Button type="danger" htmlType="button" style={{marginLeft: 16}} onClick={() => dispatch(dropApply(submitType, payload))}>作废</Button>
          : ''
        }
        <Button
          type="primary"
          htmlType="button"
          style={{marginLeft: 16}}
          disabled={submitLoading || list.length === 0}
          onClick={() => dispatch(apply(submitType, payload))}
        >提交</Button>
      </div>
    </ThemedContainer>
  );
};

ResourceCollector.propTypes = {
  title: PropTypes.string,
  submitType: PropTypes.string,
  payload: PropTypes.object,
  dispatch: PropTypes.func,
  winHeight: PropTypes.number,
  submitLoading: PropTypes.bool,
  list: PropTypes.array,
  description: PropTypes.string,
};

const mapStateToProps = (
  {
    Main: {winHeight},
    [prefix]: {submitLoading, list, description},
  }
) => ({winHeight, submitLoading, list, description});

export default connect(mapStateToProps)(ResourceCollector);
