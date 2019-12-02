import * as React from 'react';
import {Form, Input, Select, TreeSelect} from 'antd';
import {Layer} from './parseWMSMetadata';

const {TreeNode} = TreeSelect;

export interface Props{
    name: string;
    version: string;
    layersTree: Layer[];
    formats: string[];
    format: string;
    transparent: boolean;
    selectedLayer: Layer;
    style: string;
    handleLayerChange: (v: string) => void;
    handleFormatChange: (v: string) => void;
    handleTransChange: (v: string) => void;
    handleStyleChange: (v: string) => void;
    [key: string]: any;
}

function createLayerTree(layers: Layer[]): React.ReactElement[] {
    const nodes: React.ReactElement[] = [];

    for (let i = 0, l = layers.length; i < l; i++) {
        if (layers[i].children) {
            nodes.push(
                <TreeNode key={i} title={layers[i].title} value={layers[i].name}>
                    {createLayerTree(layers[i].children)}
                </TreeNode>
            );
            continue;
        }
        nodes.push(
            <TreeNode key={i} title={layers[i].title} value={layers[i].name}/>
        );
    }

    return nodes;
}

export default function FormWMS({
    name, version, layersTree, formats, selectedLayer, style, format, transparent,
    handleLayerChange, handleFormatChange, handleTransChange, handleStyleChange,
}: Props) {
    const itemLayout = {labelCol: {span: 6}, wrapperCol: {span: 18}};
    // remove the top unavailable layer
    if (layersTree.length === 1) {
        layersTree = [...layersTree[0].children];
    }
    return (
        <Form layout="horizontal">
            <Form.Item label="名称" {...itemLayout}>
                <Input
                    name="serviceName"
                    type="text"
                    value={name}
                    placeholder="名称"
                />
            </Form.Item>
            <Form.Item label="类型" {...itemLayout}>
                <Input
                    name="serviceType"
                    type="text"
                    value={'OGC WMS'}
                    placeholder="类型"
                />
            </Form.Item>
            <Form.Item label="版本" {...itemLayout}>
                <Input
                    name="serviceVersion"
                    type="text"
                    value={version}
                    placeholder="版本"
                />
            </Form.Item>
            <Form.Item label="格式" {...itemLayout}>
                <Select value={format} onChange={handleFormatChange}>
                    {formats.map((f, index) => (
                        <Select.Option
                            key={index}
                            value={f}
                        >
                            {f}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item label="透明" {...itemLayout}>
                <Select value={transparent.toString()} onChange={handleTransChange}>
                    <Select.Option value="true">是</Select.Option>
                    <Select.Option value="false">否</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item
                label="图层"
                validateStatus={selectedLayer ? '' : 'warning'}
                help={selectedLayer ? '' : '选择一个图层以生成地图'}
                {...itemLayout}
            >
                <TreeSelect onChange={handleLayerChange} value={selectedLayer && selectedLayer.name}>
                    {createLayerTree(layersTree)}
                </TreeSelect>
            </Form.Item>
            {selectedLayer ?
                <Form.Item label="样式" {...itemLayout}>
                    <Select value={style} onChange={handleStyleChange}>
                        {selectedLayer.styles.map((s, index) => (
                            <Select.Option
                                key={index}
                                value={s.name}
                            >
                                {s.title || s.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                : ''
            }
        </Form>
    );
}