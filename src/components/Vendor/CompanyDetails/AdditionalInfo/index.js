import { Button, Flex, Modal, Form, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import Contact from './Contact';
import Projects from './Projects';


const AdditionalInfo = (props) => {



  return (
    <div style={{ overflow: 'auto', scrollbarWidth: 'thin' }}>
      <section style={{ height: '12rem' }}>
        <Contact {...props}  />
      </section>
      <hr />
      <section>
      <Projects {...props} />
      </section>
    </div>
  )
}

export default AdditionalInfo