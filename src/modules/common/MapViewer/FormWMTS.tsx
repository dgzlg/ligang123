import * as React from 'react';
import {Form, Input, Select} from 'antd';
import {Layer} from './parseWMTSMetadata';

export interface Props{
    name: string;
    provider: string;
    version: string;
    layers: Layer[];
    selectedLayer: Layer;
    style: string;
    format: string;
    handleLayerChange: (v: string) => void;
    handleFormatChange: (v: string) => void;
    handleStyleChange: (v: string) => void;
    [key: string]: any;
}

export default function FormWMTS({
    name, provider, version, layers, selectedLayer, style, format,
    handleLayerChange, handleFormatChange, handleStyleChange,
}: Props) {
    const itemLayout = {labelCol: {span: 6}, wrapperCol: {span: 18}};
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
            <Form.Item label="提供者" {...itemLayout}>
                <Input
                    name="provider"
                    type="text"
                    value={provider}
                    placeholder="提供者"
                />
            </Form.Item>
            <Form.Item label="类型" {...itemLayout}>
                <Input
                    name="serviceType"
                    type="text"
                    value={'OGC WMTS'}
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
            <Form.Item label="图层"
                {...itemLayout}
                validateStatus={selectedLayer ? '' : 'warning'}
                help={selectedLayer ? '' : '选择一个图层以生成地图'}
            >
                <Select value={selectedLayer && selectedLayer.id} onChange={handleLayerChange}>
                    {layers.map(({title, id}) => (
                        <Select.Option
                            key={id}
                            value={id}
                        >
                            {title || id}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            {selectedLayer ?
                <Form.Item label="格式" {...itemLayout}>
                    <Select value={format} onChange={handleFormatChange}>
                        {selectedLayer && selectedLayer.formats.map((f, index) => (
                            <Select.Option
                                key={index}
                                value={f}
                            >
                                {f}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                : ''
            }
            {selectedLayer ?
                <Form.Item label="样式" {...itemLayout}>
                    <Select value={style} onChange={handleStyleChange}>
                        {selectedLayer && selectedLayer.styles.map((s, index) => (
                            <Select.Option
                                key={index}
                                value={s}
                            >
                                {s}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                : ''
            }
        </Form>
    );
}