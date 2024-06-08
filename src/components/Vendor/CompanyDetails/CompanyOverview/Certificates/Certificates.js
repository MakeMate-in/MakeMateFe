import { Select, Button, Upload, Card } from 'antd';
import { useState, useEffect } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { options } from '../../../../../utils/helper';
import { COMPANY_ID } from '../../../../../utils/constants';
import { uploadCertificate, getCertificates, deleteCertificates } from '../../../../../apis/Vendor/CompanyDetails';
import './styles.css'


const Certificates = () => {
  const [certificates, setCertificates] = useState('');
  const [certificate, setCertificate] = useState("");
  const [fileList, setFileList] = useState([]);
  const [filesData,setfileData] = useState([]);
  const [delfilesData,setdelfileData] = useState([]);
  
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
    console.log(fileList)
    console.log(newFileList)
    if(newFileList.length>fileList.length){
      let len = newFileList.length
      newFileList[len-1].name = certificate
      }
    setFileList(newFileList);
  }

  const uploadFiles =async () => {
    try{
      console.log(filesData)
      const res = await uploadCertificate(COMPANY_ID, filesData) 
      if(res.success){
        const resp = await getCertificates(COMPANY_ID)
        if(resp.success){
        setCertificates(resp.data)
        setfileData([])
        }
        
      }
      console.log(res)
    }
    catch(err){
      console.log(err)
    }
  }


  const deleteFiles =async () => {
    try{
      console.log(filesData)
      const res = await deleteCertificates(COMPANY_ID, delfilesData) 
      console.log(res)
      if(res.success){
        const resp = await getCertificates(COMPANY_ID)
        if(resp.success){
        setCertificates(resp.data)
        setfileData([])
        }
        
      }
      console.log(res)
    }
    catch(err){
      console.log(err)
    }
  }

  
  const uploadImage = async options => {
    const { onSuccess, onError, file, onProgress } = options;
    try {
      setfileData([...filesData,file])
      // onSuccess("Ok");
    } catch (err) {
      console.log("Eroor: ", err);
      const error = new Error("Some error");
      // onError({ err });
    }
  };

  const deleteFileData = async (file) => {
    setdelfileData([...delfilesData,file.uid])
  }

  const props= {
    listType: 'picture-card',
    onChange: onChange,
    customRequest: uploadImage,
    fileList: fileList,
    multiple: true,
    onRemove: deleteFileData
  };


  return (
    <div>
      <Card style={{ 
            height: '50%', 
            overflow: 'auto', 
            // overflow:'hidden', 
            scrollbarWidth: 'none' }}>
      <h2 style={{margin:'0px'}}>Certificates</h2>
      
      <Select
            onChange={handleChange}
            options={options}
            placeholder="Select Certificate"
            value={certificate}
            style={{ width: '75%', height:'40px' }}
          />
           <Button onClick={uploadFiles}>Save</Button>
           <Button onClick={deleteFiles}>Delete</Button>
           <Upload {...props}>
            <Button icon={<UploadOutlined />}>Upload Certificate</Button>
          </Upload>
          </Card>
    </div>
  );
};

export default Certificates;
