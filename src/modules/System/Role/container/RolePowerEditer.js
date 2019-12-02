import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal, Spin, Tree, Button } from 'antd';

const { TreeNode } = Tree;

/* action */
import {prefix, cancelPowerRole, powerUpdate, savePowerRole} from '../action';

/**
 * 生成节点树
 * @param tree 树型数据
 * @param deep 深度
 * @returns {any[]}
 */
const createTreeNodes = (tree, deep = 0) => {
    const nodesNum = tree.length;
    const nodes = new Array(nodesNum);
    let i = 0;
    while (i < nodesNum) {
        if (!tree[i].children || tree[i].children.length === 0) {
            nodes[i] = <TreeNode key={tree[i].code} title={tree[i].name} />;
        } else {
            nodes[i] = (
                <TreeNode key={tree[i].code} title={tree[i].name}>
                    {createTreeNodes(tree[i].children, deep + 1)}
                </TreeNode>
            );
        }
        i++;
    }
    return nodes;
};

const RolePowerEditer = ({
    visible, loading, saving, menusTree, menusPower, cancel, save, handleOnCheck
}) => {
    return (
        <Modal
            title="角色赋权"
            visible={visible}
            maskClosable={false}
            onCancel={cancel}
            footer={[
                <Button key="0" type="default" onClick={cancel}>取消</Button>,
                <Button key="1" type="primary" onClick={save} loading={saving}>保存</Button>
            ]}
        >
            <Spin spinning={loading}>
                <Tree
                    checkable
                    checkStrictly
                    checkedKeys={{checked: menusPower}}
                    onCheck={handleOnCheck}
                >
                    {createTreeNodes(menusTree)}
                </Tree>
            </Spin>
        </Modal>
    );
};

RolePowerEditer.propTypes = {
    visible: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    saving: PropTypes.bool.isRequired,
    menusTree: PropTypes.array.isRequired,
    menusPower: PropTypes.array.isRequired,
    cancel: PropTypes.func.isRequired,
    save: PropTypes.func.isRequired,
    handleOnCheck: PropTypes.func.isRequired
};

const mapStateToProps = ({
    [prefix]: {
        powerIng, menusLoading, menusTree, menusPower, powerSaving
    }
}) => {
    return { visible: powerIng, loading: menusLoading, menusTree, menusPower, saving: powerSaving };
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleOnCheck: (keys) => {
            dispatch(powerUpdate(keys.checked));
        },
        cancel: () => { dispatch(cancelPowerRole()) },
        save: () => dispatch(savePowerRole())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RolePowerEditer);
