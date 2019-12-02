import * as React from 'react';
import {Modal, Spin, Form, Input, Button, Select} from 'antd';
import {EditState, EditTarget, MapType, MapVersions} from "../../types/MapResourceEditor";

export interface Props {
    editState: EditState,
    target: EditTarget | null,
    name: string,
    description: string,
    url: string,
    mapType: MapType,
    version: string,
    close: () => {},
    save: () => {},
    view: () => {},
    updateFormValue: (key: string, value: string | number) => {}
}

function MapResourceEditor({
    editState, target, name, description, url, mapType, version,
    close, save, view, updateFormValue,
}: Props) {
    const footer = [
        <Button key="cancel" htmlType="button" type="default" disabled={editState === EditState.saving} onClick={close}>取消</Button>,
        <Button key="view" htmlType="button" type="default" disabled={!url} onClick={view}>地图预览</Button>,
        <Button key="save" htmlType="button" type="primary" disabled={editState === EditState.saving || editState === EditState.loading} onClick={save}>保存</Button>,
    ];
    return (
        <Modal
            visible={editState !== EditState.closed}
            title={`${target === null ? '创建' : '修改'}地图资源`}
            width={600}
            closable={editState !== EditState.saving}
            maskClosable={false}
            destroyOnClose={true}
            onCancel={close}
            footer={footer}
        >
            <Spin spinning={editState === EditState.saving || editState === EditState.loading}>
                <Form layout="vertical">
                    <Form.Item label="服务类型" required={true}>
                        <Select value={mapType} onChange={(value: string) => updateFormValue('mapType', value)}>
                            {Object.keys(MapType).map((key) => (
                                <Select.Option key={key} value={MapType[key]}>{MapType[key]}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="版本" required={true}>
                        <Select value={version} onChange={(value: string) => updateFormValue('version', value)}>
                            {MapVersions[mapType].map((key) => (
                                <Select.Option key={key} value={key}>{key}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="地图服务地址(OGC)" required={true}>
                        <Input
                            name="serviceUrl"
                            value={url}
                            type="text"
                            placeholder="request=GetCapabilities"
                            onChange={(e) => updateFormValue('url', e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item label="资源名称" required={true}>
                        <Input
                            name="resourceName"
                            type="text"
                            value={name}
                            onChange={(e) => updateFormValue('name', e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item label="描述">
                        <Input.TextArea
                            name="description"
                            value={description}
                            onChange={(e) => updateFormValue('description', e.target.value)}
                        />
                    </Form.Item>
                </Form>
            </Spin>
        </Modal>
    )
}

export default MapResourceEditor;
