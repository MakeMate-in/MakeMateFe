import { useEffect } from 'react'
import { Empty, Flex, Layout, theme } from 'antd';
import "./../../../../node_modules/react-image-gallery/styles/css/image-gallery.css";
import ProductCard from './Component/ProductCard';
import './Header.css'
import { LinearProgress } from '@material-ui/core';

const { Content } = Layout;

const CustomerContent = (props) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    props.fetchDetails()
  }, [])

  return (
    <Content
      style={{
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
        padding: '16px',
        overflow: 'auto',
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center'
      }}
    >
     {props.data && props.data.length!=0 && props.loading==false? <div className='grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-12'>
        {props.data && props.data.length!=0 && props.loading==false? 
        props.data.map((card, index) => (
          <ProductCard
            key={index}
            data={card}
          />
        )):''
        // : 
        //  (
        //   <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '84vh', marginLeft:'40rem' }}>
        //     <div class="spinner-squarea">
        //       <div class="squarea-1 squarea"></div>
        //       <div class="squarea-2 squarea"></div>
        //       <div class="squarea-3 squarea"></div>
        //     </div>
        //   </div>
        // )
       }
      </div>:      
          <LinearProgress style={{width:'30%'}}/>
      }  
        
    </Content>
  )
}

export default CustomerContent
