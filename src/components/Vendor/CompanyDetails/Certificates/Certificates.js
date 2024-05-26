import { Select, Button, Upload, Divider } from 'antd';
import { useState, useEffect } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { convertBufferToBinary, options } from '../../../../utils/helper';
import { COMPANY_ID } from '../../../../utils/constants';
import { uploadCertificate, getCertificates } from '../../../../apis/Vendor/CompanyDetails';
import './styles.css'
import PlantImages from './PlantImages';


const Certificates = () => {
  const [certificates, setCertificates] = useState('');
  const [certificate, setCertificate] = useState("");
  const [fileList, setFileList] = useState([]);
  
  useEffect(() => {

    const fetchCertificates = async () => {
      const res = await getCertificates(COMPANY_ID)
      console.log(res)
      if(res.success)
      setCertificates(res.data)
    }
    fetchCertificates()
  }, [])

  useEffect(() => {
    
    if(certificates.certificates!=undefined){
    const files =  certificates!=undefined && certificates.certificates!=undefined? certificates.certificates.map( (item) => {

    // let url =  convertBufferToBinary(item.certificate)
    //   console.log(url)
    let data = {
      uid: item._id,
      name: item.name,
      status: 'done',
      // url: url,
   }
   return data
    }) :'' 
    setFileList(files)
  }
  }, [certificates])

  const handleChange = (value) => {
      setCertificate(value)
  };

  const onChange = ({ fileList: newFileList }) => {
    let len = newFileList.length
    newFileList[len-1].name = certificate
    setFileList(newFileList);
  }

  const uploadFiles =async () => {
    try{
      const res = await uploadCertificate(COMPANY_ID, fileList) 
      if(res.success){
        const resp = await getCertificates(COMPANY_ID)
        if(resp.success){
        setCertificates(resp.data)
        }
        
      }
      console.log(res)
    }
    catch(err){
      console.log(err)
    }
  }


  const props= {
    listType: 'picture',
    onChange: onChange,
    // customRequest: uploadImage,
    fileList: fileList,
    multiple: true,
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
           <Button onClick={uploadFiles}>Save</Button>
           <Upload {...props}>
            <Button icon={<UploadOutlined />}>Upload Certificate</Button>
          </Upload>
       
    <hr/>
    <PlantImages/>


    </div>
  );
};

export default Certificates;
