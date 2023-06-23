import { UploadOutlined } from "@ant-design/icons";
import { Button, Modal, Upload } from "antd";
import axios from "axios";
import { useState } from "react";
import readXlsxFile from "read-excel-file";
import { CommonNotification } from "../../../utils/CommonNotification";

export default function CreateUserExcel() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState(null);

  const props = {
    name: "file",
    maxCount: 1,
    accept: ".xls, .xlsx",
    fileList: file ? [file] : [],
    beforeUpload: (file) => {
      setFile(file);
      return false;
    },
  };
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setFile();
  };

  // handle the upload file.

  const handleUpload = async () => {
    try {
      if (file) {
        const rows = await readXlsxFile(file);
        console.log(rows);
        await axios.post("https://localhost:7112/api/user/upload2", rows, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer YOUR_AUTH_TOKEN",
          },
        });

        setIsModalOpen(!isModalOpen);
        setFile();
        CommonNotification(
          "Notification",
          "Upload users by Excel file Successfully !",
          "success"
        );
      } else {
        // Handle file not selected error
        console.log("Please select a file to upload.");
      }
    } catch (error) {
      // Handle error
      console.log("Error occurred while uploading:", error);
      CommonNotification(
        "Notification",
        "Error occurred while uploading users!",
        "warning"
      );
    }
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Upload Users
      </Button>
      <Modal
        title="Upload Excel"
        open={isModalOpen}
        onOk={handleUpload}
        okText="Create Users"
        onCancel={handleCancel}
      >
        {/* <div>
          <input type="file" onChange={handleFileUpload} />
        </div> */}
        <Upload {...props}>
          <Button icon={<UploadOutlined />}>Select File</Button>
        </Upload>
      </Modal>
    </>
  );
}
