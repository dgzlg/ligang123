import React from 'react';
import PropTypes from 'prop-types';
import ThemedContainer from '../../../common/ThemedContainer';
import DirectoryTree from '../../../common/DirectoryTree';
import Explorer from '../../../common/Explorer';

const RequestInfo = (
  {
    type, style, directoryTree, demand, fileList, response, request,
  }
) => {
  switch (type) {
    case 'directoryProcess':
      return (
        <DirectoryTree
          style={style}
          tree={directoryTree}
          title="发布的目录"
          loading={false}
        />
      );
    case 'publishResource':
      return (
        <ThemedContainer
          style={style}
          title="发布的文件"
        >
          <Explorer
            list={fileList}
            pathArray={[]}
            noDrag={true}
            loading={false}
          />
        </ThemedContainer>
      );
    case 'publishNeed':
      return (
        <ThemedContainer
          style={style}
          className="demand-container"
          title="需求详情"
        >
          <h1>{demand.name}</h1>
          <p>{demand.description}</p>
          <p>申请人：{demand.creator}</p>
        </ThemedContainer>
      );
    case 'responseNeed':
      return ([
        <ThemedContainer
          key="0"
          style={{...style, height: style.height / 2 - 94}}
          title="需求详情"
        >
          <h1>{response.demandTitle}</h1>
          <p>{response.demandDescription}</p>
          <p>申请人：{response.demandCreator}</p>
        </ThemedContainer>,
        <ThemedContainer
          key="1"
          style={{...style, height: style.height / 2 + 80, marginTop: 14}}
          title="响应详情"
        >
          <p>响应人：{response.creator}</p>
          <p>响应描述：{response.description}</p>
          <Explorer
            list={response.resources || []}
            pathArray={[]}
            noDrag={true}
            loading={false}
          />
        </ThemedContainer>,
      ]);
    case 'applyResource':
      return (
        <ThemedContainer
          key="1"
          className="request-container"
          style={style}
          title="资源申请详情"
        >
          <p>申请人：{request.creator}</p>
          <p>申请描述：{request.description}</p>
          <Explorer
            list={request.resources || []}
            pathArray={[]}
            noDrag={true}
            loading={false}
          />
        </ThemedContainer>
      );
    default:
      return '';
  }
};

RequestInfo.propTypes = {
  type: PropTypes.string,
  directoryTree: PropTypes.array,
  demand: PropTypes.object,
  fileList: PropTypes.array,
  response: PropTypes.object,
  request: PropTypes.object,
};

export default RequestInfo;