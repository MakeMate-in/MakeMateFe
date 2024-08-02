import { Select, Button, Flex, Input, DatePicker, Typography } from 'antd';
import React, { useState, useEffect, useMemo } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { getCopanyId, CERTIFIATE_TYPES } from '../../../../../utils/helper';
import { uploadCertificate, getCertificates } from '../../../../../apis/Vendor/CompanyDetails';
import { DeleteTwoTone } from '@ant-design/icons';
import './styles.css'
import AttachFileIcon from '@mui/icons-material/AttachFile';
import moment from 'moment';

import { notification } from 'antd';
import dayjs from 'dayjs';

const Context = React.createContext({
  name: 'Default',
});


const Certificates = (props) => {
  const [inputs, setInputs] = useState([{ name: undefined, exp: undefined, file: undefined }]);

  const monthFormat = 'YYYY/MM';

  const handleAddInput = () => {
    setInputs([...inputs, { name: undefined, exp: undefined, file: undefined }]);
  };

  const [api, contextHolder] = notification.useNotification();


  const openNotification = (placement) => {
    api.success({
      message: `Success`,
      description: `Certificates Updated Successfully`,
      placement,
    });
  };
  let contextValue = useMemo(
    () => ({
      name: 'Make Mate',
    }),
    [],
  );

  const openFailedNotification = (placement, msg) => {
    api.error({
      message: `Something went wrong`,
      description: msg,
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
    if (inputs.length > 1) {
      setInputs(newArray);
    }
    else {
      setInputs([{ name: undefined, exp: undefined, file: undefined }]);
    }
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
    try {
      const COMPANY_ID = getCopanyId()
      const res = await getCertificates(COMPANY_ID)
      if (res.success) {
        props.setCertificateCount(res.count)
        if (res.count > 0) {
          let certificates = res.data.certificates.map((item) => {
            const blob = new Blob([item.certificate.data], { type: item.type });
            const imageUrl = URL.createObjectURL(blob);
            let data = {}
            const date = dayjs(item.expiration_date, monthFormat);

            data.name = item.fileName
            data.file = {}
            data.file = item
            data.file.certificate = imageUrl
            data.exp = date
            return data
          })
          setInputs([...certificates])

        }
      }
    }
    catch (err) {
      openFailedNotification('topRight', 'Unable to Fetch Certificates')
    }

  }

  useEffect(() => {
    fetchCertificates()
  }, [])


  const uploadFiles = async () => {
    try {
      const COMPANY_ID = getCopanyId()
      const res = await uploadCertificate(COMPANY_ID, inputs)
      if (res.success) {
        fetchCertificates()
        openNotification('topRight');
      }
    }
    catch (err) {
      openFailedNotification('topRight', `Unable to upload Certificate `);
      console.log(err)
    }
  }

  const onChangeYear = (dateString, index) => {
    let x = dateString
    console.log(dateString)

    let onChangeValue = [...inputs];
    onChangeValue[index]["exp"] = x;
    setInputs(onChangeValue);
  };

  return (
    <Context.Provider value={contextValue}>
      {contextHolder}
      <div>
        <div style={{
          height: '50%',
          overflow: 'auto',
          scrollbarWidth: 'none'
        }}>
          <Typography style={{ marginBottom: '10px', fontSize: '25px', fontWeight: '600' }}><u>Certificates</u></Typography>
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
                      options={CERTIFIATE_TYPES}
                    />

                    <DatePicker
                      format={monthFormat}
                      picker="month"
                      onChange={(e) => { onChangeYear(e, index) }}
                      id="year"
                      placeholder='Select Expiration'
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
                      size='large'
                      onClick={() => document.getElementById(index).click()}
                    >
                      Upload Certificate</Button>
                    {item.file && <span style={{ marginLeft: '10px' }}><AttachFileIcon /> {item.file.name}</span>}

                    {inputs.length >= 1 && (
                      <DeleteTwoTone onClick={() => handleDeleteInput(index)} twoToneColor="#F5222D" style={{ fontSize: '20px' }} />
                    )}

                  </Flex>
                  {index === inputs.length - 1 && (
                    <div style={{ width: '25%' }}>
                      <a onClick={() => handleAddInput()} style={{ fontSize: '16px' }}>+ Add Certificate</a>
                    </div>
                  )}
                </Flex>
              )
            })

            }
          </Flex>
          <Button
            onClick={uploadFiles}
            style={{ marginTop: '20px', fontWeight: '500px', color: 'white', background: '#1677ff' }}
          >Save</Button>
        </div>
      </div>
    </Context.Provider>
  );
};

export default Certificates;
