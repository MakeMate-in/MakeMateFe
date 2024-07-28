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
        padding: '16px',
        overflow: 'auto',
      }}
    >
      <div className='grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
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
