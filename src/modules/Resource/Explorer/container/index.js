import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Button, Icon} from 'antd';
import {HEADER_HEIGHT, FOOTER_HEIGHT} from "../../../Main/container/uiConfig";
import ThemedContainer from '../../../common/ThemedContainer';
import Explorer from '../../../common/Explorer';
import resourceTypeIndex from './resourceTypeIndex';
import {prefix, initialize, navTo} from "../action";
import InitialCallback from "../../../common/InitialCallback";
import contextMenuProviderProvider from "./contextMenuProviderProvider";
import APIResourceViewer from "./APIResourceViewer";
import APIResourceTesting from './APIResourceTesting';
import MapResourceViewer from './MapResourceViewer';
import AddSVG from '../../../common/icons/Add';
import './index.less';

const ResourceExplorer = (
  {
    editable, draggable, contextMenuExtends, style,
    dispatch, winHeight, resourceLoading, pathArray, resourceList,
  }
) => {

  const footer = () => (
    <div style={{paddingTop: '16px', textAlign: 'right'}}>
      {resourceTypeIndex.map(({type, action}, index) => (
        <Button
          key={index}
          type="primary"
          htmlType="button"
          style={{marginRight: 16}}
          onClick={() => dispatch(action())}
        >
          <Icon component={AddSVG} style={{color: '#fff'}} />
        {type}
        </Button>
      ))}
      <Link to="/resource/publish">
        <Button type="default" htmlType="button">发布资源</Button>
      </Link>
    </div>
  );

  const contextMenuProvider = contextMenuProviderProvider(dispatch, editable, contextMenuExtends);

  return (
    <ThemedContainer
      className="my-source"
      style={style || {minHeight: `${winHeight - HEADER_HEIGHT - FOOTER_HEIGHT - 32}px`}}
      title="我的资源"
      headerLeftText={pathArray.map(_ => _.name).join('/')}
      footer={editable ? footer : undefined}
    >
      <InitialCallback
        actions={() => dispatch(initialize())}
      />
      <Explorer
        style={{minHeight: `${winHeight - HEADER_HEIGHT - FOOTER_HEIGHT - 168}px`}}
        list={resourceList}
        loading={resourceLoading}
        pathArray={pathArray}
        navTo={(array) => dispatch(navTo(array))}
        contextProvider={contextMenuProvider}
        draggable={draggable}
      />
      {(() => {
        if (!editable) {
          return '';
        }
        return resourceTypeIndex.map(({editor: Editor}, index) => (<Editor key={index}/>));
      })()}
      <APIResourceViewer editable={editable}/>
      <APIResourceTesting/>
      <MapResourceViewer/>
    </ThemedContainer>
  );
};

ResourceExplorer.propTypes = {
  editable: PropTypes.bool,
  draggable: PropTypes.bool,
  style: PropTypes.object,
  contextMenuExtends: PropTypes.array,
  dispatch: PropTypes.func,
  winHeight: PropTypes.number,
  pathArray: PropTypes.array,
  resourceLoading: PropTypes.bool,
  resourceList: PropTypes.array,
};

const mapStateToProps = (
  {
    Main: {winHeight},
    [prefix]: {
      pathArray, resourceLoading, resourceList,
    },
  }
) => ({
  winHeight, pathArray, resourceLoading, resourceList,
});

export default connect(mapStateToProps)(ResourceExplorer);
