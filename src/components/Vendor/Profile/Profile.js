import React from 'react'
import { Popover, Avatar, Flex, Divider, Typography, Button } from 'antd';
import { getRole, getUserEmail, getUserName } from '../../../utils/helper';
import Logout from '@mui/icons-material/Logout';
import { logOut } from '../../../apis/authentication.';
import { OPEN_ROUTES } from '../../../utils/constants';
import { useNavigate } from 'react-router-dom';


const Profile = () => {

  const navigate= useNavigate()

  const USER_DETAIL = {
    name: getUserName() ? getUserName() : "",
    email: getUserEmail() ? getUserEmail() : "",
    role: getRole() ? getRole() : ""
  };

  const ColorList = ['#f56a00', '#7265e6', '#00a2ae'];
  const nameParts = USER_DETAIL.name.split(" ");
  const firstNameInitial = nameParts[0] ? nameParts[0][0] : "";

  const getLogout = async () => {
    try{
      await logOut()
      sessionStorage.clear();
      navigate(OPEN_ROUTES.PARENT_ROUTE)
    }
    catch(err){
      console.log(err)
    }
  }

  const content = (
    <Flex vertical gap={10}>
      <Flex gap={10} align='center' style={{ background: 'aliceblue' }}>
        <Avatar
          alt="User"
          size={45}
          style={{ cursor: 'pointer', fontSize: '28px', background: ColorList[firstNameInitial.charCodeAt(0) % 3] }}
        >
          {firstNameInitial}
        </Avatar>
        <Flex vertical>
          <p style={{ margin: '0px' }}><strong>{USER_DETAIL.name}</strong></p>
          <p style={{ margin: '0px' }}> {USER_DETAIL.email}</p>
          <p style={{ margin: '0px' }}> {USER_DETAIL.role}</p>
        </Flex>

      </Flex>
      <Flex  align='center' gap={10} style={{cursor:'pointer' }}>
      <Button
                        onClick={getLogout}
                        size="large"
                        style={{
                            background: 'transparent',
                            border: 'transparent',
                            color: 'black'
                        }}
                    >
        <Logout />
        <Typography style={{ fontSize: '20px', color: 'grey', fontWeight:'500' }} >Logout</Typography>
        </Button>
      </Flex>
    </Flex>
  );

  return (

    <Popover content={content} trigger="click">
      <Avatar
        alt="User"
        size={45}
        style={{ cursor: 'pointer', fontSize: '28px', background: ColorList[firstNameInitial.charCodeAt(0) % 3] }}
      >
        {firstNameInitial}
      </Avatar>

    </Popover>

  );
}

export default Profile
