import ImageUpload from '../../../ImageUpload/ImageUpload';
import { getPlantImages, uploadPlantImages } from '../../../../apis/Vendor/CompanyDetails';
import { convertBufferToBinary, getCopanyId } from '../../../../utils/helper';
import { ConfigProvider, Typography } from 'antd';


const PlantImages = (props) => {


  const uploadImages = async (files) => {
    try{
      const  COMPANY_ID = getCopanyId()
      const res = await uploadPlantImages(COMPANY_ID, files)
      return res;
    }
    catch(err){
      console.log(err)
    }
  }
  
  const getImages = async () => {
    try{
      const  COMPANY_ID = getCopanyId()
      const res = await getPlantImages(COMPANY_ID)
      if (res.success) {
        props.setPlantImagesCount(res.count)
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
    <ConfigProvider
    theme={{
      components: {
        Carousel: {
          arrowSize: 35,
        },
      },
    }}
  >
    <div style={{ flexDirection:'column', alignItems:'center'}}>
   <Typography style={{ marginBottom: '10px', fontSize:'25px', fontWeight:'620' }}>Plant Images</Typography>
    <ImageUpload 
    uploadImages={uploadImages} 
    getImages={getImages} 
    
    />
    </div>
    </ConfigProvider>
  )
}

export default PlantImages
