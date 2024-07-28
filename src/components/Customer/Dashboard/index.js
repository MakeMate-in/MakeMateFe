import React, { useState, useRef } from 'react'
import { Layout } from 'antd';
import { useNavigate } from 'react-router-dom'
import "./../../../../node_modules/react-image-gallery/styles/css/image-gallery.css";
import CustomerHeader from './Header';
import CustomerSideBar from './SideBar';
import CustomerContent from './Content';
import { getAllUserDetails, getSearchedProducts } from '../../../apis/commonFunctions';
import './index.css';


const CustomerDashboard = () => {

  const [data, setData] = useState(undefined)

  const handleSearch = async (value) => {
    try{
      let params ={
        search: value
      }
      let res = await getSearchedProducts(params)
      if (res.success) {
        setData(res.results)
      }
    }
    catch (err) {
      console.log(err)
    }

  };


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
      <CustomerHeader  handleSearch={handleSearch} fetchDetails={fetchDetails}/>

      <Layout>

        {/* Side Bar */}
        <CustomerSideBar />

        {/* {data == undefined ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '84vh' }}>
            <div class="spinner-square">
              <div class="square-1 square"></div>
              <div class="square-2 square"></div>
              <div class="square-3 square"></div>
            </div>
          </div>
        ) : */}
          <Layout
            style={{
              padding: '0 20px 20px',
            }}
          >
            <CustomerContent data={data} fetchDetails={fetchDetails} />

          </Layout>
          {/* } */}
      </Layout>
    </Layout>
  )
}

export default CustomerDashboard
