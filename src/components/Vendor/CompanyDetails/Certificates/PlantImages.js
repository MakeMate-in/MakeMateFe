import React,{useState, useEffect  } from 'react'
import { COMPANY_ID } from './../../../../utils/constants';
import { Upload, Button, Card } from 'antd';
import { uploadPlantImages, getPlantImages, deletePlantImages } from '../../../../apis/Vendor/CompanyDetails';
import { uploadButton, convertBufferToBinary } from '../../../../utils/helper';


const PlantImages = () => {
  
    const [fileList, setFileLsit] = useState()
    const [plantImages, setPlantImages] = useState()
    const [filesData,setfileData] = useState([]);
    const [delfilesData,setdelfileData] = useState([]);

      
  useEffect(() => {

    const fetchPlantImages = async () => {
      const res = await getPlantImages(COMPANY_ID)
      console.log(res)
      if(res.success)
      setPlantImages(res.data)
    }
    fetchPlantImages()
  }, [])

  useEffect(() => {
    
    if(plantImages!=undefined){
    const files =  plantImages!=undefined && plantImages.company_Images!=undefined? plantImages.company_Images.map( (item) => {
        console.log(item)
    let url =  convertBufferToBinary(item.image)
      console.log(url)
    let data = {
      uid: item._id,
      name: item.name,
      status: 'done',
      url: url,
   }
   return data
    }) :'' 
    setFileLsit(files)
  }
  }, [plantImages])

  console.log(fileList)

    const onChange = ({ fileList: newFileList }) => {
        setFileLsit(newFileList);
      }

      const uploadFiles =async () => {
        try{
          const res = await uploadPlantImages(COMPANY_ID, filesData) 
          if(res.success){
            const resp = await getPlantImages(COMPANY_ID)
            if(resp.success){
                setPlantImages(resp.data)
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
          onSuccess("Ok");
        } catch (err) {
          console.log("Eroor: ", err);
          const error = new Error("Some error");
          // onError({ err });
        }
      };


      const deleteFiles =async () => {
        try{
          console.log(filesData)
          const res = await deletePlantImages(COMPANY_ID, delfilesData) 
          console.log(res)
          if(res.success){
            const resp = await getPlantImages(COMPANY_ID)
            if(resp.success){
            setPlantImages(resp.data)
            setfileData([])
            }
            
          }
          console.log(res)
        }
        catch(err){
          console.log(err)
        }
      }
    
      const deleteFileData = async (file) => {
        setdelfileData([...delfilesData,file.uid])
      }

    const props= {
        listType: 'picture-card',
        name: "file",
        onChange: onChange,
        fileList: fileList,
        customRequest: uploadImage,
        onRemove: deleteFileData
      };
    
  return (
<Card style={{ 
            height: '50%', 
            overflow: 'auto', 
            // overflow:'hidden', 
            scrollbarWidth: 'none' }}>
    <h2>Plant Images</h2>
    <Button onClick={uploadFiles}>Save</Button>
    <Button onClick={deleteFiles}>Delete</Button>
    <Upload {...props}>
    {fileList && fileList.length>0? null : uploadButton}
    </Upload>
    </Card>
  )
}

export default PlantImages
