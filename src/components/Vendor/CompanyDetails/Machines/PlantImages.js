import React,{useState, useEffect  } from 'react'
import { Flex } from 'antd';
import ImageUpload from '../../../ImageUpload/ImageUpload';
import { getPlantImages, uploadPlantImages } from '../../../../apis/Vendor/CompanyDetails';
import { convertBufferToBinary } from '../../../../utils/helper';


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
      if (res.success) {
        if (res.count > 0) {
          let newSrcList = [];
          res.data.company_Images.map(async (item, i) => {
              let data = {
                  uid: item._id,
                  name: item.name,
                  status: 'done',
                  url: convertBufferToBinary(item.image),
              }
              newSrcList.push(data)
              
          })
          return newSrcList;
        }
      }
     
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
