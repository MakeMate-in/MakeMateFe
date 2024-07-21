import React, { useState, useRef,useEffect } from 'react'
import { Layout, theme, Carousel, Card} from 'antd';
import "./../../../../node_modules/react-image-gallery/styles/css/image-gallery.css";
import ProductCard from './Component/ProductCard';
import Login1 from './../../../assets/Login.jpg'
import Login2 from './../../../assets/Login.jpg'
import Login3 from './../../../assets/Login.jpg'
import Login4 from './../../../assets/Login.jpg'
import { getAllDetails } from '../../../apis/Vendor/CompanyDetails';
import { getAllUserDetails } from '../../../apis/commonFunctions';
import { convertBufferToBinary } from '../../../utils/helper';

const { Header, Content, Sider } = Layout;

const cardsData = [
  {
    title: 'Card Title 1'
  },
  {
    title: 'Card Title 2'
  }
];


const CustomerContent = () => {

    const {
        token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken();

  const [data, setData] = useState(undefined)
  const [srcList, setSrcList] = useState([]);

  const fetchDetails = async () => {
    const COMPANY_ID = "667db48e42b5be5e507c4b37"
    let param = {
      companyId: COMPANY_ID,
    };
    try {
      const resp = await getAllUserDetails(param);
      console.log(resp)
      if(resp.success){
        setData(resp.data)
        }
    }
    catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
    fetchDetails()
  },[])
  
      return (
    <Content
            style={{
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              overflow: 'auto',
              scrollbarWidth: 'thin'
            }}
          >
            <div className='ml-8 mt-8 gap-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 '>
       {data && data.map((card, index) => (
        <ProductCard
          key={index}
          data = {card}
        />
      ))}
      </div>
          </Content>
  )
}

export default CustomerContent
