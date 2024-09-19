import { Typography, Flex, Card, Tag, Empty } from 'antd'
import { useEffect, useState } from 'react'

const CustomerDetailsDashboard = (props) => {
    let AllDetails = props.AllDetails
    const colors = ['#3b5999', '#55acee'];

    return (
        <div>
            <Typography style={{ margin: '0', marginTop: '10px', fontSize: '20px', fontWeight: '600' }}>Customer Details</Typography>
            {AllDetails && AllDetails.companyDetails.customer_details && AllDetails.companyDetails.customer_details.length > 0 ? (
                <Card style={{ overflow: 'auto' }}>
                    <Flex gap="5px 2px" wrap>
                        {AllDetails.companyDetails.customer_details.map((customer, index) => (
                            <Tag size='large' key={customer._id} style={{ fontSize: '18px', fontFamily: 'none' }} color={colors[index % 2]}>
                                {customer.name}
                            </Tag>
                        ))}
                    </Flex>
                </Card>
            ) : (
                <Card><Empty /></Card>
            )}
        </div>
    )
}

export default CustomerDetailsDashboard
