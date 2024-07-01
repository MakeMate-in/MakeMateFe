import React from 'react'
import { Popover, Avatar, Flex } from 'antd';
import { getRole, getUserEmail, getUserName } from '../../../utils/helper';

const Profile = () => {

  const USER_DETAIL = {
    name: getUserName() ? getUserName() : "",
    email: getUserEmail() ? getUserEmail() : "",
    role: getRole() ? getRole() : ""
  };

  const ColorList = ['#f56a00', '#7265e6', '#00a2ae'];
  const nameParts = USER_DETAIL.name.split(" ");
  const firstNameInitial = nameParts[0] ? nameParts[0][0] : "";

  const content = (
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
