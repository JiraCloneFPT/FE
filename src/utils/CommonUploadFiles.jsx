import { React } from 'react';
import { Button, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

const CommonUploadFiles = (props) => {
    const uploadProps = {
        name: 'file',
        multiple: true,
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    const handleChange = ({ fileList: newFileList }) => {
        props.setFileList(newFileList);
        handleUploadImage(newFileList);
    };

    const beforeUpload = () => {
        return false;
    };

    const handleUploadImage = (newFileList) => {
        const formData = new FormData();

        if (newFileList.length > 0) {
            newFileList.map(file => {
                uploadFileToCloudinary(file);
            })
        }
    };

    const uploadFileToCloudinary = (file) => {
        formData.append("file", file.originFileObj);
        formData.append("upload_preset", "ml_default");

        try {
            //Upload image to cloutdinary
            axios.post("https://api.cloudinary.com/v1_1/dfb1bpw8c/image/upload", formData)
                .then((response) => {
                    var tempImage = [{
                        uid: response.data.public_id,
                        name: response.data.original_filename,
                        status: 'done',
                        url: response.data.url,
                    }];
                    props.setFileList([...tempImage]);
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        // <Upload
        //     listType="picture"
        //     fileList={props.fileList}
        //     onChange={handleChange}
        //     beforeUpload={beforeUpload}
        // >
        //     <Button icon={<UploadOutlined />}>Upload</Button>
        // </Upload>


        <Dragger {...uploadProps}>
            <p className="ant-upload-drag-icon">
                <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                banned files.
            </p>
        </Dragger>
    )
}

export default CommonUploadFiles;