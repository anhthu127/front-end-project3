import React, { useEffect, useState } from "react";
import { Input, Button } from "antd";
import { SINGLE_TEXTBOX } from '../../config/common/TypeOfInput';
import './../QuestionItem.scss';

const SingleTextbox = (props) => {
  const [title, setTitle] = useState(props.title);
  const [titleUpdate, setTitleUpdate] = useState("");
  let data = {
    id: props.id || '',
    title: title,
    note: "single textbox",
    parent_id: 0,
    have_child: false,
    unique: props.item.unique,
    type: 1,
    input_type_id: SINGLE_TEXTBOX
  };
  useEffect(() => { setTitle(props.title) }, [])
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

  return (
    <>
      {props.isEdit ? (
        <div style={{ marginTop: '5px' }}>
          {/* <p className='title-question'>Câu {props.stt + 1}</p> */}
          <p className="title-lable">Điền nội dung câu hỏi</p>

          <Input
            style={{ height: '38px' }}
            type="text"
            onChange={handleChangeTextbox}
            defaultValue={title}
          />

          <div style={{ paddingTop: "25px" }}>
            <Button
              style={{ marginRight: '5px' }}
              size="small"
              onClick={() => props.onCancel(props.idxChild)}
            >Hủy bỏ</Button>
            <Button
              type="primary"
              size="small"
              onClick={(e) => handleSaveTextbox(e)}
            > Lưu câu hỏi con</Button>
          </div>

        </div>
      ) : (
          <div>
            <div onClick={() => props.onEdit(props.idxChild)} style={{ cursor: "pointer" }}>
              <p style={{ fontSize: "15px", fontWeight: "600", paddingTop:'10px' }}   >{props.idxChild + 1}. {title}</p>
              <Input type="text" />
            </div>
          </div>
        )}
    </>
  );
};

export default SingleTextbox;
