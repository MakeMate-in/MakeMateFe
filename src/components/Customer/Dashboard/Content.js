import { useEffect, useState } from 'react'
import { Empty, Flex, Layout, Pagination, theme } from 'antd';
import "./../../../../node_modules/react-image-gallery/styles/css/image-gallery.css";
import ProductCard from './Component/ProductCard';
import './Header.css'
import { LinearProgress } from '@material-ui/core';

const { Content } = Layout;

const CustomerContent = (props) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [totalCount, setTotalCount] = useState(0)
  const [data, setData] = useState()


  // useEffect(() => {
  //   props.fetchDetails(pageIndex, pageSize)
  // }, [])

  useEffect(() => {
    props.fetchDetails(pageIndex, pageSize)
    if(props.data){
      setData(props.data)
    }
  }, [])

  useEffect(() => {
    props.fetchDetails(pageIndex, pageSize)
    if(props.data){
      setData(props.data)
    }
  }, [pageIndex])

  console.log(props.data)

  return (
    <Content
      style={{
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
        padding: '16px',
        // paddingTop:'10rem',
        overflow: 'auto',
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        // marginTop:'10rem'
      }}
    >

     {props.data && props.data.length!=0 && props.loading==false?
     <Flex vertical style={{marginTop:'45rem'}} justify='center' align='center'>
          <Pagination
        defaultCurrent={1}
        responsive
        current={pageIndex}
        pageSize={pageSize}
        // total={props.totalCount}
        total={72}
        onChange={(value) => setPageIndex(value)}
      />
     <div className='grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'>
        {data && data.length!=0 && props.loading==false? 
        props.data.map((card, index) => (
          <ProductCard
            key={index}
            data={card}
          />
        )):''
       }
      </div>
      </Flex>
      :      
          <LinearProgress style={{width:'30%'}}/>
      }  
        
    </Content>
  )
}

export default CustomerContent
