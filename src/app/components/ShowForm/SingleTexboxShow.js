import React, { Fragment, useState } from "react";
import { Input } from "antd";
import './ShowForm.scss';

const SingleTexboxShow = (props) => {
  const [value, setValue] = useState(props.value);

  const onChange = (valueChange) => {
    setValue(valueChange);
    props.onChange(valueChange);
  }

  return (
    <>
      <Fragment key={`view-single-text-col-${props.data.id}-${props.data.unique}`}>
        <h6 className="question-title">
            {props.index + 1}.{props.data.title}
        </h6>
        <Input type="text" value={value} disabled = {!props.isEnable} onChange={(e) => onChange(e.target.value)}/>
      </Fragment>
    </>
  );
};

export default SingleTexboxShow;
