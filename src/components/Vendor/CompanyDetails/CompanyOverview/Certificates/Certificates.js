import { Select, Button, Flex, Input } from 'antd';
import { useState, useEffect } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { options } from '../../../../../utils/helper';
import { COMPANY_ID } from '../../../../../utils/constants';
import { uploadCertificate, getCertificates, deleteCertificates } from '../../../../../apis/Vendor/CompanyDetails';
import { DeleteTwoTone } from '@ant-design/icons';
import './styles.css'
import AttachFileIcon from '@mui/icons-material/AttachFile';

const Certificates = () => {
  const [certificates, setCertificates] = useState('');
  const [inputs, setInputs] = useState([{ name: undefined, file: undefined }]);

  const handleAddInput = () => {
    setInputs([...inputs, { name: undefined, file: undefined }]);
  };

  const handleSelectValue = (event, index, id) => {
    let onChangeValue = [...inputs];
    onChangeValue[index][id] = event;
    setInputs(onChangeValue);
  };


  const handleDeleteInput = (index) => {
    const newArray = [...inputs];
    newArray.splice(index, 1);
    setInputs(newArray);
  };


  const handleImageChange = (e, index, id) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      let onChangeValue = [...inputs];
      onChangeValue[index][id] = uploadedFile;
      setInputs(onChangeValue);
    }
  };

  console.log(inputs)


  const fetchCertificates = async () => {
    const res = await getCertificates(COMPANY_ID)
    if (res.success){
        if(res.count>0){
          console.log(res)
          let certificates  = res.data.certificates.map((item) => {
            let data = {}
            data.name = item.fileName
            data.file = item
            return data
          })
          setInputs([...certificates])

        }
    }
      
  }

  useEffect(() => {
    fetchCertificates()
  }, [])


  const uploadFiles = async () => {
    try {
      const res = await uploadCertificate(COMPANY_ID, inputs)
      if (res.success) {
        fetchCertificates()

      }
      console.log(res)
    }
    catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <div style={{
        height: '50%',
        overflow: 'auto',
        // overflow:'hidden', 
        scrollbarWidth: 'none'
      }}>
        <h2 style={{ margin: '0px' }}>Certificates</h2>
        <Flex vertical gap="large">
          {inputs.map((item, index) => {
            console.log(item)
            return (
              <Flex vertical gap="large">
                <Flex gap="large">
                  <Select style={{ width: '40%' }}
                    id="name"
                    placeholder="Select Certificate"
                    size='large' variant="filled"
                    value={item.name}
                    allowClear
                    onChange={(event) => handleSelectValue(event, index, "name")}
                    options={options}
                  />

                  <Input type="file"
                    id={index}
                    style={{ display: 'none' }}
                    onChange={(e) => { handleImageChange(e, index, "file") }}
                  />
                  <Button
                    icon={<UploadOutlined />}
                    onClick={() => document.getElementById(index).click()}
                  >
                    Upload Certificate</Button>
                  {item.file && <span style={{ marginLeft: '10px' }}><AttachFileIcon /> {item.file.name}</span>}

                  {inputs.length > 1 && (
                    <DeleteTwoTone onClick={() => handleDeleteInput(index)} twoToneColor="#F5222D" style={{ fontSize: '20px' }} />
                  )}

                </Flex>
                {index === inputs.length - 1 && (
                  <a onClick={() => handleAddInput()} style={{ fontSize: '16px' }}>+ Add Certificate</a>
                )}
              </Flex>
            )
          })

          }
        </Flex>
        <Button onClick={uploadFiles}>Save</Button>
        {/* <Button onClick={deleteFiles}>Delete</Button> */}
      </div>
    </div>
  );
};

export default Certificates;
