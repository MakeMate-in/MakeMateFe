import React, { useState, useRef } from 'react'
import { Layout } from 'antd';
import "./../../../../node_modules/react-image-gallery/styles/css/image-gallery.css";
import CustomerHeader from './Header';
import CustomerSideBar from './SideBar';
import CustomerContent from './Content';
import { getAllUserDetails, getFilteredResults, getSearchedProducts } from '../../../apis/commonFunctions';
import './index.css';


const CustomerDashboard = () => {

  const [data, setData] = useState(undefined)
  const [loading, setLoading] = useState(false)
  const [filtersData, setfiltersData] = useState({
    "experience": 0,
    "certificate_type": "",
    "machine_types": [],
    "plant_area": 0,
  })

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };


  const onClose = () => {
    setOpen(false);
  };


  const handleChange = (id,value) => {
    setfiltersData({[id]:value})
  }

  const handleFilter = async () => {
    try{
      setOpen(false);
      setLoading(true)
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
      setfiltersData({
        "experience": 0,
        "certificate_type": "",
        "machine_types": [],
        "plant_area": 0,
      }) 
      setLoading(false)
      console.log(res)
    }
    catch(err){
     setLoading(false)
      console.log(err)
    }
  }

  const handleSearch = async (value) => {
    try{
      setLoading(true)
      let params ={
        search: value
      }
      let res = await getSearchedProducts(params)
      if (res.success) {
        
        setData(res.results)
      }
      setLoading(false)
    }
    catch (err) {
      setLoading(false)
      console.log(err)
    }

  };


  const fetchDetails = async (pageIndex, pageSize) => {
    let param = {
      companyId: null,
      pageIndex: pageIndex,
      pageSize: pageSize
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

    <Layout style={{ height: '100vh', position:'relative' }}>

      {/* Header */}
      <CustomerHeader  handleSearch={handleSearch} fetchDetails={fetchDetails} showDrawer={showDrawer} setLoading={setLoading}/>

      <Layout>

        {/* Side Bar */}
        <CustomerSideBar filtersData={filtersData} handleChange={handleChange} handleFilter={handleFilter} open={open} onClose={onClose} setLoading={setLoading}/>
          <Layout
            style={{
              padding: '0 20px 20px',
            }}
          >
            <CustomerContent data={data} fetchDetails={fetchDetails} loading={loading} />

          </Layout>
      </Layout>
    </Layout>
  )
}

export default CustomerDashboard
