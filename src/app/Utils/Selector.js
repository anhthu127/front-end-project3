import { Select } from "antd";
import React, { useEffect, useState } from 'react'
const { Option } = Select;

function Selector(props) {
    const [multiple, setMultiple] = useState((props.multiple) ? (props.multiple) : "")
    const [data, setData] = useState(props.data)
    const handleChange = (value) => {
        props.getData(value)
    }
    const [defaultValue, setDefault] = useState(null)
    useEffect(() => {
        setData(props.data)
    }, [props.data])
    useEffect(() => {
        console.log(data);
    }, [data])
    return (
        <>
            <Select defaultValue={props.title} mode={multiple}
                showSearch
                optionFilterProp="children"
                placeholder={props.placeholder}
                filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                style={{ width: '500px', borderRadius: '5px' }} multiple={multiple} onChange={handleChange}>
                {(data.length > 0) ?
                    (data.map((value, i) => {
                        return (
                            <Option key={value.code || value.id } value={value.code}>
                                {value.name}
                            </Option>
                        );
                    })) : (
                        <Option>Không có dữ liệu</Option>
                    )
                }
            </Select>
        </>
    )
}
export default Selector;