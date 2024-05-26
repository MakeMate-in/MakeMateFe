import { Space, Select, Button, message, Upload } from 'antd';
import { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { options } from '../../../utils/helper';
import { USER_ID } from '../../../utils/constants';
import { uploadCertificate } from '../../../apis/Vendor/CompanyDetails';



const Certificates = () => {
  const [showFields, setShowFields] = useState(false);
  const [name, setName] = useState('');
  const [certificate, setCertificate] = useState(null);
  const [fileList, setFileList] = useState([]);


  const handleChange = (value) => {
      setCertificate(value)
  };

  const onChange = ({ fileList: newFileList }) => setFileList(newFileList);

  
  const uploadImage = async options => {
    const { onSuccess, onError, file, onProgress } = options;
    try {
      const res = await uploadCertificate(USER_ID, file, certificate) 
      onSuccess("Ok");
      console.log("server res: ", res);
    } catch (err) {
      console.log("Eroor: ", err);
      const error = new Error("Some error");
      // onError({ err });
    }
  };


  const props= {
    listType: 'picture',
    onChange: onChange,
    customRequest: uploadImage,
    
  };



  return (
    <div>
      <h2>Certificates</h2>
      
      <Select
            onChange={handleChange}
            options={options}
            placeholder="Select Certificate"
            value={certificate}
            style={{ width: '75%', height:'40px' }}
          />
           <Upload {...props}>
            <Button icon={<UploadOutlined />}>Upload Certificate</Button>
          </Upload>
   
    </div>
  );
};

export default Certificates;
