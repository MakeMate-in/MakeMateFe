import { useEffect } from 'react'
import { Layout, theme } from 'antd';
import "./../../../../node_modules/react-image-gallery/styles/css/image-gallery.css";
import ProductCard from './Component/ProductCard';

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
        overflow: 'auto',
        scrollbarWidth: 'thin'
      }}
    >
      <div className='ml-8 mt-8 gap-20 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 '>
        {props.data && props.data.map((card, index) => (
          <ProductCard
            key={index}
            data={card}
          />
        ))}
      </div>
    </Content>
  )
}

export default CustomerContent
