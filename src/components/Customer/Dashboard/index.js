import React, { useState, useRef } from 'react'
import { Layout } from 'antd';
import { useNavigate } from 'react-router-dom'
import "./../../../../node_modules/react-image-gallery/styles/css/image-gallery.css";
import CustomerHeader from './Header';
import CustomerSideBar from './SideBar';
import CustomerContent from './Content';
import { getAllUserDetails } from '../../../apis/commonFunctions';


const CustomerDashboard = () => {


  const handleSearch = (value) => {
    console.log(value)
    

  };

  const [data, setData] = useState(undefined)

  const fetchDetails = async () => {
    let param = {
      companyId: null,
    };
    try {
      const resp = await getAllUserDetails(param);
      if (resp.success) {
        setData(resp.data)
      }
    }
    catch (err) {
      console.log(err)
    }
  }


  return (
    <Layout style={{ height: '100vh' }}>

      {/* Header */}
      <CustomerHeader  handleSearch={handleSearch}/>

      <Layout>

        {/* Side Bar */}
        <CustomerSideBar />

        <Layout
          style={{
            padding: '0 20px 20px',
          }}
        >
          <CustomerContent data={data} fetchDetails={fetchDetails} />

        </Layout>
      </Layout>
    </Layout>
  )
}

export default CustomerDashboard
