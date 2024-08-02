import React, { useState, useRef } from 'react'
import { Layout } from 'antd';
import { useNavigate } from 'react-router-dom'
import "./../../../../node_modules/react-image-gallery/styles/css/image-gallery.css";
import CustomerHeader from './Header';
import CustomerSideBar from './SideBar';
import CustomerContent from './Content';
import { getAllUserDetails, getFilteredResults, getSearchedProducts } from '../../../apis/commonFunctions';
import './index.css';


const CustomerDashboard = () => {

  const [data, setData] = useState(undefined)
  const [filtersData, setfiltersData] = useState({
    "experience": 0,
    "certificate_type": "",
    "machine_types": [],
    "plant_area": 0,
    "inhouse_services": [],
    "outsource_services": []
  })

  const handleChange = (id,value) => {
    console.log(id)
    console.log(value)
    setfiltersData({[id]:value})
  }

  const handleFilter = async () => {
    try{
      let params = {
        exp: filtersData["experience"],
        certificate_type: filtersData["certificate_type"],
        machine_type: filtersData["machine_types"],
        plant_area: filtersData["plant_area"]
      }
      const res = await getFilteredResults(params) 
      if(res.success){
        setData(res.data)
      }
      setfiltersData({}) 
      console.log(res)
    }
    catch(err){
      console.log(err)
    }
  }

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
        <CustomerSideBar filtersData={filtersData} handleChange={handleChange} handleFilter={handleFilter}/>

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
