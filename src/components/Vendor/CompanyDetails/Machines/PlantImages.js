import React,{useState, useEffect  } from 'react'
import { COMPANY_ID } from '../../../../utils/constants';
import { Upload, Button, Card } from 'antd';
import { uploadPlantImages, getPlantImages, deletePlantImages } from '../../../../apis/Vendor/CompanyDetails';
import { convertBufferToBinary } from '../../../../utils/helper';
import ImageUpload from '../../../ImageUpload/ImageUpload';


const PlantImages = () => {
  
    const [fileList, setFileLsit] = useState()
    const [plantImages, setPlantImages] = useState()
    const [filesData,setfileData] = useState([]);
    const [delfilesData,setdelfileData] = useState([]);

      
  useEffect(() => {

    const fetchPlantImages = async () => {
      const res = await getPlantImages(COMPANY_ID)
      if(res.success)
      setPlantImages(res.data)
    }
    fetchPlantImages()
  }, [])

  useEffect(() => {
    
    if(plantImages!=undefined){
    const files =  plantImages!=undefined && plantImages.company_Images!=undefined? plantImages.company_Images.map( (item) => {
    let url =  convertBufferToBinary(item.image)
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
<div>
    <h2>Plant Images</h2>
    <ImageUpload />
    {/* <Button onClick={uploadFiles}>Save</Button>
    <Button onClick={deleteFiles}>Delete</Button> */}
    </div>
  )
}

export default PlantImages
