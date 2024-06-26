import { Select, Button, Flex, Input, DatePicker } from 'antd';
import React,{ useState, useEffect, useMemo } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { options } from '../../../../../utils/helper';
import { COMPANY_ID } from '../../../../../utils/constants';
import { uploadCertificate, getCertificates } from '../../../../../apis/Vendor/CompanyDetails';
import { DeleteTwoTone } from '@ant-design/icons';
import './styles.css'
import AttachFileIcon from '@mui/icons-material/AttachFile';

import { notification} from 'antd';
const Context = React.createContext({
  name: 'Default',
});


const Certificates = () => {
  const [inputs, setInputs] = useState([{ name: undefined,exp: undefined, file: undefined }]);

  const handleAddInput = () => {
    setInputs([...inputs, { name: undefined,exp: undefined, file: undefined }]);
  };

  const [api, contextHolder] = notification.useNotification();


  const openNotification = (placement) => {
    api.success({
    message: `Success`,
    description: <Context.Consumer>{({ name }) => `Basic Details Updated Successfully`}</Context.Consumer>,
    placement,
    });
};
let contextValue = useMemo(
    () => ({
    name: 'Make Mate',
    }),
    [],
);

const openFailedNotification = (placement) => {
    api.error({
    message: `Something went wrong`,
    description: <Context.Consumer>{({ name }) => `Unable to add detail `}</Context.Consumer>,
    placement,
    });
};
    contextValue = useMemo(
    () => ({
    name: 'Make Mate',
    }),
    [],
);



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


  const fetchCertificates = async () => {
    const res = await getCertificates(COMPANY_ID)
    if (res.success){
        if(res.count>0){
          console.log(res)
          let certificates  = res.data.certificates.map((item) => {
            const blob = new Blob([item.certificate.data], { type: item.type });
            const imageUrl = URL.createObjectURL(blob);
            let data = {}
            data.name = item.fileName
            data.file={}
            data.file = item
            data.file.certificate = imageUrl
            return data
          })
          console.log(certificates)
          setInputs([...certificates])

        }
    }
      
  }

  useEffect(() => {
    fetchCertificates()
  }, [])


  const uploadFiles = async () => {
    try {
      console.log(inputs)
      const res = await uploadCertificate(COMPANY_ID, inputs)
      if (res.success) {
        fetchCertificates()
        openNotification('topRight');
      } 
      console.log(res)
    }
    catch (err) {
      openFailedNotification('topRight');
      console.log(err)
    }
  }

  const onChangeYear = (dateString,index) => {
    // setMachine({ ...Machine, ["manufacturing_year"]: dateString.$y })

    let onChangeValue = [...inputs];
    onChangeValue[index]["exp"] = dateString.$y;
    setInputs(onChangeValue);
};

  return (
    <Context.Provider value={contextValue}>
                {contextHolder}
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

                                            <DatePicker
                                                onChange={(e) => {onChangeYear(e,index)}}
                                                
                                                id="year"
                                                picker="year"
                                                placeholder='Select Expiration Year'
                                                size="large"
                                                variant="filled"
                                                value={item.exp}
                                                style={{ width: '40%' }}
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

                  {inputs.length == 1 && (
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
    </Context.Provider>
  );
};

export default Certificates;
