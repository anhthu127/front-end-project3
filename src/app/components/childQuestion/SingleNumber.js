import React, { useState } from "react";
import { Input, Button } from "antd";
import { NUMBER, SINGLE_NUMBER } from '../../config/common/TypeOfInput';

const SingleNumber = (props) => {
  const [title, setTitle] = useState(
    props.title
  );
  const [titleUpdate, setTitleUpdate] = useState("");
  let data = {
    id: props.id || '',
    title: title,
    note: "single textbox",
    parent_id: 0,
    have_child: false,
    unique: props.item.unique,
    type: NUMBER,
    input_type_id: SINGLE_NUMBER,
    unit: ''
  };

  const handleChangeTextbox = (e) => {
    e = window.event || e;
    e.preventDefault();
    setTitleUpdate(e.target.value);
  };

  const handleSaveTextbox = (e) => {
    if (titleUpdate !== "") {
      setTitle(titleUpdate);
      data.title = titleUpdate;
    }
    props.getDataSection(data, props.idxChild);
  };

  const changeUnit = (e) => {
    data.unit = e.target.value
  }

  return (
    <>
      {props.isEdit ? (
        <div style={{ marginTop: '5px', height: '150px' }} key={`single-number-${props.item.unique}-${props.item.id}`}>
          <p className="title-lable"> Điền nội dung câu hỏi</p>
          <Input
            style={{ height: '38px' }}
            type="text"
            onChange={handleChangeTextbox}
            defaultValue={title}
          />
          <p className="title-lable title-select-data">Nhập đơn vị (nếu có)</p>
          <Input onChange={e => changeUnit(e)} defaultValue={props.item.unit} style={{ width: '100%', height: '40px' }} />
          <div style={{ paddingTop: "20px" }}>
            <Button
              style={{ marginRight: '5px' }}
              size="small"
              onClick={() => props.onCancel(props.idxChild)}
            > Hủy bỏ
            </Button>
            <Button
              type="primary"
              size="small"
              onClick={() => handleSaveTextbox()}
            > Lưu câu hỏi con</Button>
          </div>
        </div>
      ) : (
          <div>
            <div onClick={() => props.onEdit(props.idxChild)} style={{ cursor: "pointer" }}>
              <p  style={{ fontSize:"15px", fontWeight:"600", paddingTop:'10px'}}   >{props.idxChild + 1}. {title}</p>
              <Input type="number" style={{ marginRight: "10px" }} /> {props.item.unit ? <div className="text-align-right">
                <p className="title-lable">đơn vị ({props.item.unit}) </p>
              </div> : ""}
            </div>
          </div>
        )}
    </>
  );
};

export default SingleNumber;
