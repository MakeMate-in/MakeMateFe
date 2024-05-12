import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Toolbar,
  List,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import digitalFactory from './digitalFactory.js';
import { AppBar, Drawer, DrawerHeader } from './Drawer.tsx';
import { VENDOR_DRAWER_LIST } from '../../../utils/constants';
import { Card, Col, Row, Steps, Form, Input, Button, Menu, Dropdown } from 'antd';
import './Dashboard.css';
import { DownOutlined } from "@ant-design/icons";


const Dashboard = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [tab, setTab] = useState(0)

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const selectTab = (e) => {
    console.log(e.target.key);
    setTab(e.target.key);
  };






  const [selectedOption, setSelectedOption] = useState(null);
  const [buttonLabels, setButtonLabels] = useState(['Basic Details', 'Addresses & Contacts', 'C', 'D']); // Initial button labels

  const forms = [
    {
      label: 'Form for A',
      content: (
        <Form
      layout="vertical"
    >
      <Row gutter={16}>
        <Col span={24}>
          <Row gutter={16} align="middle">
            <Col span={8}>
              <Form.Item label="Company Logo">
                <div className="company-logo">
                  <img src="https://via.placeholder.com/150" alt="Company Logo" />
                </div>
              </Form.Item>
            </Col>
            <Col span={16}>
              <Form.Item label="About Us" name="aboutUs">
                <Input.TextArea rows={4}  placeholder='Provide your company description and an overview of your company'/>
              </Form.Item>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Field 1"
            name="field1"
            rules={[{ required: true, message: 'Field 1 is required' }]}
          >
            <Input className="custom-input" variant="filled"/>
          </Form.Item>
          <Form.Item
            label="Field 2"
            name="field2"
            rules={[{ required: true, message: 'Field 2 is required' }]}
          >
            <Input className="custom-input" variant="filled"/>
          </Form.Item>
          <Form.Item
            label="Field 3"
            name="field3"
            rules={[{ required: true, message: 'Field 3 is required' }]}
          >
            <Input className="custom-input" variant="filled"/>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Field 4"
            name="field4"
            rules={[{ required: true, message: 'Field 4 is required' }]}
          >
            <Input className="custom-input" variant="filled"/>
          </Form.Item>
          <Form.Item
            label="Field 5"
            name="field5"
            rules={[{ required: true, message: 'Field 5 is required' }]}
          >
            <Input className="custom-input" variant="filled"/>
          </Form.Item>
          <Form.Item
            label="Field 6"
            name="field6"
            rules={[{ required: true, message: 'Field 6 is required' }]}
          >
            <Input className="custom-input" variant="filled"/>
          </Form.Item>
        </Col>
      </Row>
      
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
      )
    },
    {
      label: 'Form for B',
      content: (
        <Form>
          <Form.Item label="Field B">
            <Input />
          </Form.Item>
          {/* Add more form fields as needed */}
        </Form>
      )
    },
    {
      label: 'Form for C',
      content: (
        <Form>
          <Form.Item label="Field C">
            <Input />
          </Form.Item>
          {/* Add more form fields as needed */}
        </Form>
      )
    },
    // Add more form configurations as needed
  ];

  const handleOptionChange = (index) => {
    setSelectedOption(index);
  };

  const renderForm = () => {
    if (selectedOption !== null && forms[selectedOption]) {
      return forms[selectedOption].content;
    }
    return null;
  };

  const handleButtonNameChange = () => {
    // Example function to change button labels
    setButtonLabels(['E', 'F', 'G', 'H']); // Change button labels to E, F, G, H
  };



  const [current, setCurrent] = useState(0);
  const onChange = (value) => {
    console.log('onChange:', value);
    setCurrent(value);
  };


  const [currentSub, setCurrentSub] = useState(0);
  const onChangeSub = (value) => {
    console.log('onChangeSub:', value);
    setCurrentSub(value);
  };
  const description = 'This is a description.';

  const { Step } = Steps;
  

  const StepDropdown = () => {
    return (
      <Steps
      progressDot
      direction='vertical'
      current={currentSub}
        onChange={onChangeSub}
      items={[
        {
          title: 'Finished'
        },
        {
          title: 'In Progress'
        },
        {
          title: 'Waiting'
        },
      ]}
    />
    );
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginLeft: 10,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {tab ? VENDOR_DRAWER_LIST[tab].name : VENDOR_DRAWER_LIST[0].name}
          </Typography>
        </Toolbar>
      </AppBar>


      <Drawer variant="permanent" open={open} elevation="16">
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {VENDOR_DRAWER_LIST.map((item, index) => (
            <ListItem key={index} disablePadding sx={{ display: 'block' }} onClick={selectTab}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}

              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.name} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }} style={{ backgroundColor: '#f0f2f5' }}>
        <DrawerHeader />

        <div>
      <Row gutter={16}>
        <Col span={6}>
          <Card title="Card title" bordered hoverable style={{ height: '39rem' }}>
            {/* Button to change button names */}
            <Button onClick={handleButtonNameChange}>Change Button Names</Button>

            <div>
            

      <Divider />

      <Steps direction="vertical" current={current}
        onChange={onChange}>
      <Step title='Step 1' description={<StepDropdown />} />
      <Step title="In Progress" description="This is a description." />
      <Step title="Waiting" description="This is a description." />
    </Steps>
            </div>

          </Card>
        </Col>
        <Col span={18}>
          <Card bordered hoverable style={{ height: '39rem', overflow: 'auto', scrollbarWidth: 'thin'}}>
            <div>
              <h2 style={{ marginTop: '0' }}>Company Overview</h2>
              <hr />
              <Row style={{ justifyContent: 'center', alignItems: 'center', marginBottom: '16px' }}>
                {/* Render buttons dynamically */}
                {buttonLabels.map((label, index) => (
                  <Button key={index} type={selectedOption == index ? 'primary' : 'default'} onClick={() => handleOptionChange(index)}>
                    {label}
                  </Button>
                ))}
              </Row>
              <div>
              {renderForm()}
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>

      </Box>
    </Box>
  );
}

export default Dashboard
