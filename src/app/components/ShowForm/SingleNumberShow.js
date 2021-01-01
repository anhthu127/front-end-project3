import React, { Fragment, useState } from "react";
import { InputNumber } from "antd";
import './ShowForm.scss';

const SingleNumberShow = (props) => {
  const [value, setValue] = useState(props.value);
  const onChange = (valueChange) => {
    setValue(valueChange);
    props.onChange(valueChange);
  }

  return (
    <>
      <Fragment key={`view-single-number-${props.data.id}-${props.data.unique}`}>
        <h6 className="question-title">
          {props.index + 1}.{props.data.title}
        </h6>
        <InputNumber style={{ width: "80%", marginRight: "10px" }} disabled={!props.isEnable} 
        value={value} onChange={onChange} /> {props.data.unit ? `Đơn vị(${props.data.unit})` : ""}
      </Fragment>
    </>
  );
};

export default SingleNumberShow;
