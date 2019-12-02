import React from 'react';
import UploadBtn from '../common/FileUpload/container/UploadBtn';

const Upload = () => {
    /* 上传完成后回调 */
    const handleUploadFinish = (groupKey) => {
        /* groupKey为上一次上传任务组的唯一标识 */
        console.log(groupKey);
    };
    return (
        <div>
            <p>选择文件，点击上传</p>
            <UploadBtn
                url={'/uploadFile'}
                formDataKey={'file'}
                onUploadFinish={handleUploadFinish}
                textSelectBtn={'选择文件'}
            />
        </div>
    );
};

export default Upload;
