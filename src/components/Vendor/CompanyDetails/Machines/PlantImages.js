import React,{useState, useEffect  } from 'react'
import { COMPANY_ID } from '../../../../utils/constants';
import { Upload, Button, Card } from 'antd';
import { uploadPlantImages, getPlantImages, deletePlantImages } from '../../../../apis/Vendor/CompanyDetails';
import { convertBufferToBinary } from '../../../../utils/helper';
import ImageUpload from '../../../ImageUpload/ImageUpload';


const PlantImages = () => {
  
  return (
    <div>
    <h2>Plant Images</h2>
    <ImageUpload />
    </div>
  )
}

export default PlantImages
