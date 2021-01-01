import React, { useState } from "react";
import { Input, Button } from "antd";
import { COMMENT_BOX } from '../config/common/TypeOfInput';

const CommentBox = (props) => {
  const [title, setTitle] = useState(
    props.title
  );
  const [titleUpdate, setTitleUpdate] = useState("");
  const { TextArea } = Input;

  let data = {
    id: props.id,
    title: title,
    note: "",
    parent_id: 0,
    have_child: false,
    unique: props.item.unique,
    type: 1,
    input_type_id: COMMENT_BOX,
  };

  const handleChangeCommentBox = (e) => {
    e = window.event || e;
    e.preventDefault();
    setTitleUpdate(e.target.value);
  };

  const handleSaveCommentBox = (e) => {
    if (titleUpdate !== "") {
      setTitle(titleUpdate);
      data.title = titleUpdate;
    }
    props.getDataSection(data);
    props.onCancel();
  };

  return (
    <> 
      {props.isEdit ? (
        <div style={{ width: "100%", height: "100px" }}>
          <div style={{ marginTop: '5px' }}>
            <p className="title-lable"> Điền nội dung câu hỏi</p>
            <Input
              style={{ height: '38px' }}
              onChange={handleChangeCommentBox}
              defaultValue={title}
              className="col-md-12"
            />
          </div>
          <div style={{ paddingTop: "20px"}}>
            <Button
              style={{ marginRight: '5px' }}
              size="small"
              onClick={props.onCancel}
            >
              Hủy bỏ
          </Button>
            <Button
              type="primary"
              size="small"
              onClick={handleSaveCommentBox}
            >
              Lưu câu hỏi
          </Button>
          </div>
        </div>
      ) : (
          <div>
            <div onClick={props.onEdit} style={{ cursor: "pointer", marginTop: '10px', marginBottom: '5px' }}>
              <p className='title-question'>Câu {props.stt + 1}. {title}</p>
              <TextArea rows={4} />
            </div>
          </div>
        )}
    </>
  );
};

export default CommentBox;
