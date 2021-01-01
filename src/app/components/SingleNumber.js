import React, { useState } from "react";
import { Input, Button } from "antd";
import { NUMBER, SINGLE_NUMBER } from '../config/common/TypeOfInput';

const SingleNumber = (props) => {
  const [title, setTitle] = useState(
    props.title
  );
  const [titleUpdate, setTitleUpdate] = useState("");
  let data = {
    id: props.id || '',
    title: title,
    node: "",
    parent_id: 0,
    have_child: false,
    unique: props.item.unique,
    type: NUMBER,
    unit: "",
    input_type_id: SINGLE_NUMBER
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
    props.onCancel();
    props.getDataSection(data);
  };

  const changeUnit = (e) => {
    data.unit = e.target.value
  }

  return (
    <>
      {props.isEdit ? (
        <div style={{ marginTop: '5px', height: '150px' }}>
          <p className="title-lable"> Điền nội dung câu hỏi</p>
          <Input
            style={{ height: '38px' }}
            type="text"
            onChange={handleChangeTextbox}
            defaultValue={title}
          />
          <p className="title-lable title-select-data"> Nhập đơn vị (nếu có)</p>
          <Input onChange={e => changeUnit(e)} defaultValue={props.item.unit} style={{ width: '100%', height: '40px' }} />
          <div style={{ paddingTop: "20px" }}>
            <Button
              style={{ marginRight: '5px' }}
              size="small"
              onClick={props.onCancel}
            > Hủy bỏ </Button>
            <Button
              type="primary"
              size="small"
              onClick={handleSaveTextbox}
            > Lưu câu hỏi </Button>
          </div>
        </div>
      ) : (
          <div>
            <div onClick={props.onEdit} style={{ cursor: "pointer" }}>
              <p className='title-question'>Câu {props.stt + 1}. {title}</p>
              <Input type="number" style={{ width: "80%", marginRight: "10px" }} />{props.item.unit ? `Đơn vị(${props.item.unit})` : ""}
            </div>
          </div>
        )}
    </>
  );
};

export default SingleNumber;
