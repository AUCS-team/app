import { Button, Col, Form, Row, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import { useEffect, useState } from "react";
import { useLoaderData } from "react-router";

import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";


const MyUpload = () => {
  let data = useLoaderData();
  let token = data.token;
  let action = "http://upload-z2.qiniup.com";

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("token", token);
    fileList.forEach((file) => {
      formData.append("file", file as RcFile);
      formData.append("key", file.name);
    });
    setUploading(true);
    // You can use any AJAX library you like
    fetch(action, {
      method: "POST",

      body: formData,
    })
      .then((res) => res.json())
      .then(() => {
        setFileList([]);
        message.success("upload successfully.");
      })
      .catch(() => {
        message.error("upload failed.");
      })
      .finally(() => {
        setUploading(false);
      });
  };
  const props: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      
      if (file.type !== "video/mp4"){
        message.error("仅支持MP4");
        return Upload.LIST_IGNORE
      }
      setFileList([file,...fileList]);
      console.log(file.size);
      return false;
    },
    fileList,
  };
  return (
    <>
      <Row justify={"center"} align={"middle"} className=" h-96">
        <Col>
          <Upload {...props} multiple>
            <Button icon={<UploadOutlined />}>Select File</Button>
          </Upload>
          <Button
            type="default"
            onClick={handleUpload}
            disabled={fileList.length === 0}
            loading={uploading}
            style={{ marginTop: 16 }}
          >
            {uploading ? "Uploading" : "Start Upload"}
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default MyUpload;
