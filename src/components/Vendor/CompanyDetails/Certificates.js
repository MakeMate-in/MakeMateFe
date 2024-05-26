import { Space, Select, Button, message, Upload, Image } from 'antd'
import { useState } from 'react';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const Certificates = () => {
  const [showFields, setShowFields] = useState(false);
  const [name, setName] = useState('');
  const [certificate, setCertificate] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState([
  ]);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  const handleIMGChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: 'none',
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  const handleAddNewCertificate = () => {
    setShowFields(!showFields); // Toggle showFields state
    // Reset fields if toggling to showFields
    if (!showFields) {
      setName('');
      setCertificate(null);
    }
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleCertificateChange = (e) => {
    setCertificate(e.target.files[0]);
  };

  const handleUploadCertificate = (e) => {
    // Upload certificate logic here
    const file = e.target.files[0];
    setUploadedFile(file);
  };

  const handleDeleteCertificate = () => {
    setUploadedFile(null);
  };

  const props = {
    name: 'file',
    action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    headers: {
      authorization: 'authorization-text',
    },

  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }
};

  const options = [
    {
      value: 'jack',
      label: 'Jack',
    },
    {
      value: 'lucy',
      label: 'Lucy',
    },
    {
      value: 'Yiminghe',
      label: 'yiminghe',
    },
    {
      value: 'disabled',
      label: 'Disabled',
      disabled: true,
    }
  ];

  return (
    <div>
      <h2>Certificates</h2>
      {showFields && (
        <Space wrap>
          <Select
            defaultValue="lucy"
            style={{
              width: 120,
            }}
            onChange={handleChange}
            options={options}
          />
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
          
        </Space>
      )}

      

      <h3
        style={{ margin: 0, cursor: 'pointer', color: 'rgba(22, 119, 255)' }}
        onClick={handleAddNewCertificate}
      >
        + Add New Certificate
      </h3>

      <Upload
        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
        listType="picture-circle"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleIMGChange}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      {previewImage && (
        <Image
          wrapperStyle={{
            display: 'none',
          }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(''),
          }}
          src={previewImage}
        />
      )}

    </div>
  );
};

export default Certificates;
