import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Spin, Tree} from "antd";
import ThemedContainer from "../ThemedContainer";

const {DirectoryTree, TreeNode} = Tree;

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
    <TreeNode title={data.name} key={data.id}>
      {createTreeNode(data.children)}
    </TreeNode>
  );
};

class ThemedDirectoryTree extends Component {

  componentDidMount() {
    if (this.props.initialCallback) {
      this.props.initialCallback();
    }
  }


  render() {
    const {style, loading, tree, title} = this.props;
    return (
      <ThemedContainer
        style={style}
        title={title || '目录树'}
      >
        <Spin
          delay={500}
          spinning={loading}
        >
          <DirectoryTree defaultExpandAll={true}>
            {createTreeNode(tree)}
          </DirectoryTree>
        </Spin>
      </ThemedContainer>
    );
  }
}

ThemedDirectoryTree.propTypes = {
  style: PropTypes.object,
  loading: PropTypes.bool,
  tree: PropTypes.array,
  title: PropTypes.string,
  initialCallback: PropTypes.func,
};

export default ThemedDirectoryTree;