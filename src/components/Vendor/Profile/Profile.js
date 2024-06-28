import React from 'react'
import { Popover, Avatar } from 'antd';
import { USER_DETAIL } from '../../../utils/constants';

const Profile = () => {

  const ColorList = ['#f56a00', '#7265e6',  '#00a2ae'];

  const content = (
    <div>
      <p><strong>{USER_DETAIL.name}</strong></p>
      <p>Email: {USER_DETAIL.email}</p>
      <p>Role:  {USER_DETAIL.role}</p>
    </div>
  );

  const nameParts = USER_DETAIL.name.split(" ");
  const firstNameInitial = nameParts[0] ? nameParts[0][0] : "";
  const lastNameInitial = nameParts[1] ? nameParts[1][0] : "";
  return (
<Popover content={content} trigger="click">
<Avatar
  alt="User"
  size={45}
  style={{ cursor: 'pointer', fontSize:'28px' ,background:ColorList[firstNameInitial.charCodeAt(0)%3] }}
>
{firstNameInitial}
{/* {lastNameInitial} */}
</Avatar>
</Popover>
  );
}

export default Profile
