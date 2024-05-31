import React from 'react'
import { ROW_COLUMNS } from '../../../../utils/helper'
import { Flex, Select, Input } from 'antd'
import TextArea from 'antd/es/input/TextArea'


const Services = () => {
  return (
    <div>
        {ROW_COLUMNS.map((item) => {
            return(
             <Flex>
                <p>{item}</p>
                <Select style={{width:'500px'}}/>
                <TextArea/>
             </Flex>   
            )
        })}
    </div>
  )
}

export default Services
