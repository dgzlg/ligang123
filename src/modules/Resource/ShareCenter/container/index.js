import React from 'react';
import {connect} from 'react-redux';
import {Row, Col, Input, TreeSelect, Button} from 'antd';
import PropTypes from 'prop-types';
import {BlockPage} from "../../../common/Page";
import DragContainer from '../../../common/DragAndDrop/Context';
import ResourceCollector from "../../Collector/container";
import {FOOTER_HEIGHT, HEADER_HEIGHT} from "../../../Main/container/uiConfig";
import ThemedContainer from "../../../common/ThemedContainer";
import Explorer from "../../../common/Explorer";
import {
  prefix,
  selectOrganization,
  updateOrganizationList,
  showSourceList,
  updateSourceList,
  showOrganizationSelect,
  navTo,
} from "../action";
import InitialCallback from "../../../common/InitialCallback";
import './index.less';
import {addResourceToList, clearList} from "../../Collector/action";

const InputGroup = Input.Group;
const TreeNode = TreeSelect.TreeNode;

/**
 * 根据数组数据生成节点树
 * @param {array} data - 树数组
 * @return {array|undefined}
 */
const createTreeNode = (data) => {
  if (!data) {
    return;
  }
  if (typeof data === 'object' && data.constructor === Array) {
    const childNodes = [];
    for (let i = 0, l = data.length; i < l; i++) {
      childNodes.push(createTreeNode(data[i]));
    }
    return childNodes;
  }
  return (
    <TreeNode value={`${data.name},${data.id}`} title={data.name} key={data.id}>
      {createTreeNode(data.children)}
    </TreeNode>
  );
};

const mapStateToProps = (
  {
    'Main': {winHeight},
    [prefix]: {
      organizationLoading, organizationTree, organizationSelected,
      currentOrganization, sourceLoading, sourceList, pathArray
    },
  }
) => (
  {
    winHeight, organizationLoading, organizationTree, organizationSelected,
    currentOrganization, sourceLoading, sourceList, pathArray,
  }
);

const ShareCenter = (
  {
    dispatch, winHeight, organizationLoading, organizationTree, organizationSelected,
    currentOrganization, sourceLoading, sourceList, pathArray,
  }
) => {
  /* 选择组织 */
  if (!currentOrganization) {
    const contentHeight = winHeight - HEADER_HEIGHT - FOOTER_HEIGHT - 32;
    return (
      <BlockPage
        className="share-center"
        style={{height: contentHeight, paddingTop: contentHeight * 0.25}}
      >
        <InitialCallback
          actions={() => dispatch(updateOrganizationList())}
        />
        <h1>请选择一个要浏览的组织机构</h1>
        <InputGroup>
          <TreeSelect
            disabled={organizationLoading}
            placeholder={organizationLoading ? '数据加载中' : ''}
            showSearch
            style={{width: 300}}
            dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
            treeDefaultExpandAll
            value={organizationSelected}
            onChange={(id) => dispatch(selectOrganization(id))}
          >
            {createTreeNode(organizationTree)}
          </TreeSelect>
          <Button type="primary" disabled={!organizationSelected} onClick={() => dispatch(showSourceList())}>确认</Button>
        </InputGroup>
      </BlockPage>
    );
  }
  /* 资源列表 */
  const contextProvider = (target) => {
    if (target.type !== 'file') {
      return false;
    }
    return [
      {name: '添加至申请列表', action: (target) => dispatch(addResourceToList(target))},
    ];
  };
  return (
    <BlockPage>
      <DragContainer>
        <InitialCallback
          actions={() => dispatch(updateSourceList())}
        />
        <Row gutter={24}>
          <Col span={14}>
            <ThemedContainer
              className="my-source"
              style={{minHeight: `${winHeight - HEADER_HEIGHT - FOOTER_HEIGHT - 32}px`}}
              title={currentOrganization.name || '未选择部门'}
              headerLeftText={pathArray.map(_ => _.name).join('/')}
              headerRightText="切换部门"
              headerRightCallback={() => {dispatch(showOrganizationSelect());dispatch(clearList())}}
            >
              <Explorer
                style={{minHeight: `${winHeight - HEADER_HEIGHT - FOOTER_HEIGHT - 168}px`}}
                list={sourceList}
                loading={sourceLoading}
                pathArray={pathArray}
                navTo={(pathArray) => dispatch(navTo(pathArray))}
                contextProvider={contextProvider}
                draggable={true}
              />
            </ThemedContainer>
          </Col>
          <Col span={10}>
            <ResourceCollector
              title="申请资源使用"
              submitType="request"
              payload={{}}
            />
          </Col>
        </Row>
      </DragContainer>
    </BlockPage>
  );
};

ShareCenter.propTypes = {
  dispatch: PropTypes.func,
  winHeight: PropTypes.number,
  organizationLoading: PropTypes.bool,
  organizationTree: PropTypes.array,
  organizationSelected: PropTypes.string,
  currentOrganization: PropTypes.object,
  sourceLoading: PropTypes.bool,
  sourceList: PropTypes.array,
  pathArray: PropTypes.array,
};

export default connect(mapStateToProps)(ShareCenter);