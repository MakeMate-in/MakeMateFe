import React,{useState, useEffect  } from 'react'
import { Flex } from 'antd';
import ImageUpload from '../../../ImageUpload/ImageUpload';
import { getPlantImages, uploadPlantImages } from '../../../../apis/Vendor/CompanyDetails';


const PlantImages = () => {


  const uploadImages = async (COMPANY_ID,files) => {
    try{
      const res = await uploadPlantImages(COMPANY_ID, files)
      return res;
    }
    catch(err){
      console.log(err)
    }
  }
  
  const getImages = async (COMPANY_ID) => {
    try{
      const res = await getPlantImages(COMPANY_ID)
      return res;
    }
    catch(err){
      console.log(err)
    }
  }

  return (
    <div>
    <h2>Plant Images</h2>
    <ImageUpload 
    uploadImages={uploadImages} 
    getImages={getImages} 
    
    />
    </div>
  )
}

export default PlantImages
