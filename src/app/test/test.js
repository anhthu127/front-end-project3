import React from 'react'
import { Select, Typography, Divider } from 'antd';

const { Title } = Typography;

function Selection() {

    const options = [];
    for (let i = 0; i < 100000; i++) {
        const value = `${i.toString(36)}${i}`;
        options.push({
            value,
            disabled: i === 10,
        });
    }

    const handleChange = (value) => {
        console.log(`selected ${value}`);
    }


    return (
        <>
            <Title level={3}>Ant Design 4.0</Title>
            <Title level={4}>{options.length} Items</Title>
            <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="Please select"
                defaultValue={['a10', 'c12']}
                onChange={handleChange()}
                options={options}
            />

            <Divider />
 
        </>
    )
}

export default Selection