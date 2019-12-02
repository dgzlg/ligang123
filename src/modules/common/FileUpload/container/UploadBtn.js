import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Menu, Dropdown, Button } from 'antd';
import { uploadFiles } from '../actions';

class FileUploadBtn extends Component {
    constructor (props) {
        super(props);
        this.state = {
            currentGroupKey: null,
            filesList: [],
            lastSelectedFile: null,
            uploading: false
        };
    }
    UNSAFE_componentWillReceiveProps (newProps) {
        const { currentGroupKey, uploading } = this.state;
        if (currentGroupKey !== null && uploading) {
            if (newProps.finishedGroups.filter(_ => _ === currentGroupKey).length !== 0) {
                const { onUploadFinish } = this.props;
                /* 上传任务完成 */
                this.setState({
                    currentGroupKey: null,
                    filesList: [],
                    lastSelectedFile: null,
                    uploading: false
                });
                if (onUploadFinish) {
                    onUploadFinish(currentGroupKey);
                }
            }
        }
    }
    handleFileChange (e) {
        const file = e.target.files[0];
        if (!file) return;
        this.setState(({ filesList }) => {
            filesList.unshift(file);
            return { filesList, lastSelectedFile: file };
        });
    }
    selectFile () {
        this.fileInput.click();
    }
    handleUploadAll () {
        const { uploadStart, url, formDataKey } = this.props;
        const { filesList } = this.state;
        if (uploadStart) {
            const groupKey = new Date().getTime();
            this.setState({ uploading: true, currentGroupKey: groupKey });
            uploadStart({ groupKey, url, formDataKey, files: filesList });
        }
    }
    handleUploadOne ({ key }) {
        const { uploadStart, url, formDataKey } = this.props;
        const { filesList } = this.state;
        if (uploadStart) {
            const groupKey = new Date().getTime();
            this.setState({ uploading: true, currentGroupKey: groupKey });
            uploadStart([filesList[key]], groupKey);
            uploadStart({ groupKey, url, formDataKey, files: [filesList[key]] });
        }
    }
    render () {
        const { textSelectBtn } = this.props;
        const { filesList, uploading } = this.state;
        const filesNum = filesList.length;
        const selectedFiles = (
            <Menu onClick={this.handleUploadOne.bind(this)}>
                {filesList.map((file, index) => (
                    <Menu.Item key={index}>上传 {file.name}</Menu.Item>
                ))}
            </Menu>
        );
        return (
            <div>
                <input
                    id="file"
                    ref={(ele) => { this.fileInput = ele }}
                    style={{ display: 'none' }}
                    type={'file'}
                    onChange={this.handleFileChange.bind(this)}
                />
                <Button.Group>
                    <Button type={'default'} icon={'link'} htmlType={'button'} onClick={this.selectFile.bind(this)}>{textSelectBtn || '添加文件'}</Button>
                    {filesNum > 0 ?
                        <Dropdown overlay={selectedFiles} placement={'bottomCenter'}>
                            <Button disabled={uploading} type={'default'} icon={'upload'} htmlType={'button'} onClick={this.handleUploadAll.bind(this)}>上传{filesNum > 1 ? '所有' : ''}</Button>
                        </Dropdown>
                        :
                        <Button disabled type={'default'} icon={'upload'} htmlType={'button'}>上传</Button>
                    }
                </Button.Group>
            </div>
        );
    }
}

FileUploadBtn.propTypes = {
    textSelectBtn: PropTypes.string,
    url: PropTypes.string,
    formDataKey: PropTypes.string,
    finishedGroups: PropTypes.array,
    uploadStart: PropTypes.func,
    onUploadFinish: PropTypes.func
};

const mapStateToProps = ({ FileUpload: { finishedGroups } }) => {
    return { finishedGroups };
};

const mapDispatchToProps = (dispatch) => {
    return {
        uploadStart: ({ url, formDataKey, files, groupKey }) => {
            dispatch(uploadFiles({ url, formDataKey, files, groupKey, async: false }));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FileUploadBtn);
