import React, { useState, useEffect } from "react";
import { Checkbox, Button, Input } from "antd";
import { AddCircleOutline, RemoveCircleOutline } from "@material-ui/icons";
import { MULTI_CHOICE, NUMBER, STRING } from '../config/common/TypeOfInput';
import { generateRandomCode } from '../libs/random';

const MultiChoice = (props) => {
  const [preTitle, setPreTitle] = useState('');
  const [currentRowLabel, setCurrentRowLabel] = useState([]);
  const [currentRowChild, setCurrentRowChild] = useState([]);
  const [title, setTitle] = useState(props.title);
  const [isHasOther, setIsHasOther] = useState();
  const [questionOther, setQuestionOther] = useState({});
  const [rowLabel, setRowLabel] = useState([
    { title: "Nội dung hàng 1", unique: 'abcdefgh' },
    { title: "Nội dung hàng 2", unique: 'iklmnopq' },
    { title: "Nội dung hàng 3", unique: 'rstuvxyz' }
  ]);
  const [listDelete, setListDelete] = useState([]);
  const [titleNote, setTitleNote] = useState('');
  const [preTitleNote, setPreTitleNote] = useState(props.item.title_note);
  const [rowChild, setRowChild] = useState([
    { title: "Nội dung hàng ghi chú 1", type: NUMBER, unique: 'xqwerty', unit: '' },
    { title: "Nội dung hàng ghi chú 2", type: STRING, unique: 'zqwerty', unit: '' }
  ])
  const [isHasChild, setIsHasChild] = useState();

  const componentDidMount = () => {
    if (props.item && props.item.question_choice && props.item.question_choice.length) {
      let rowItem = props.item.question_choice.map(item => {
        return {
          id: item.id,
          title: item.title,
          question_id: item.question_id,
          type: item.type
        }
      });
      setCurrentRowLabel([...rowItem]);
      setRowLabel([...rowItem]);
    } else {
      setRowLabel([...rowLabel]);
      setCurrentRowLabel([...rowLabel]);
    }

    if (props.item && props.item.row_child && props.item.row_child.length) {
      let rowItem = props.item.row_child.map(item => {
        return {
          id: item.id,
          title: item.title,
          question_id: item.question_id,
          type: item.type,
          is_row_note: item.is_row_note
        }
      });
      setCurrentRowChild([...rowItem]);
      setRowChild([...rowItem]);
    } else {
      setRowChild([...rowChild]);
      setCurrentRowChild([...rowLabel]);
    }

    if (props.item.isHasOther) {
      setIsHasOther(props.item.isHasOther)
    }
    if (props.item.isHasChild) {
      setIsHasChild(props.item.isHasChild)
    }

    if (props.item.question_other) {
      setQuestionOther(props.item.question_other);
    } else {
      setQuestionOther({
        other_title: ''
      })
    }

    setTitleNote(props.item.title_note);
  }

  useEffect(componentDidMount, []);

  let objMultiChoice = {
    id: props.id,
    title: title,
    note: "",
    parent_id: 0,
    have_child: false,
    unique: props.item.unique,
    index: 1,
    type: 1, //1 là bình thường, 2 là mẫu
    isHasOther: isHasOther,
    input_type_id: MULTI_CHOICE, // 4 là dạng multi select....
    question_choice: [],
    question_other: {}
  };

  const handleChange = (e) => {
    e = window.event || e;
    e.preventDefault();
    setPreTitle(e.target.value);
  };

  const handleChangeRowLabel = (e, idx) => {
    e = window.event || e;
    e.preventDefault();
    let row = [...rowLabel];
    row[idx].title = e.target.value;
    setRowLabel([...row]);
  };

  const addRowLabel = () => {
    let title = "";
    let unique = generateRandomCode(6);
    let data = [...rowLabel];
    data.push({ title, unique });
    setRowLabel(data);
  };

  const removeRowLabel = (e, idx) => {
    e.preventDefault();
    let data = [...rowLabel];
    if (data[idx].id) {
      let delItem = data[idx].id;
      let listDel = [...listDelete];
      listDel.push(delItem);
      setListDelete(listDel);
    }
    let datafilter = data.filter((_item, index) => {
      if (index !== idx) {
        return true;
      }
      return false;
    });
    setRowLabel(datafilter);
  };

  const onClickSave = (e) => {
    e = window.event || e;
    e.preventDefault();
    setCurrentRowLabel([...rowLabel]);
    setCurrentRowChild([...rowChild]);
    rowLabel.forEach((e, i) => {
      let question = {};
      question.id = e.id || '';
      question.title = e.title;
      question.type = MULTI_CHOICE;
      question.input_type_id = MULTI_CHOICE;
      question.index = i;
      objMultiChoice.question_choice.push(question);
    });

    if (preTitle !== "") {
      setTitle(preTitle);
      objMultiChoice.title = preTitle;
    }
    if (isHasChild) {
      objMultiChoice.isHasChild = 1;
    }
    objMultiChoice.delete_choices = listDelete;
    if (titleNote) {
      setPreTitleNote(titleNote);
      objMultiChoice.title_note = titleNote;
    }
    objMultiChoice.row_child = [];
    objMultiChoice.question_other = questionOther;
    rowChild.forEach((e, i) => {
      let objRowChild = {};
      objRowChild.id = e.id || '';
      objRowChild.title = e.title;
      objRowChild.type = STRING;
      objRowChild.index = i;
      objRowChild.unit = e.unit || '';
      objMultiChoice.row_child.push(objRowChild);
    });
    props.onCancel();
    props.getDataSection(objMultiChoice);
  };

  const editHandle = (e) => {
    e = window.event || e;
    props.onEdit();
  };

  const onClickCancel = (e) => {
    e = window.event || e;
    e.preventDefault();
    setRowLabel(currentRowLabel);
    setRowChild(currentRowChild);
    setTitleNote(preTitleNote);
    props.onCancel();
  };

  const onHandleChangeOther = () => {
    if (isHasOther === 1) {
      setIsHasOther(0);
    } else {
      setIsHasOther(1);
    }
  }

  const onHandleTitleOther = (value) => {
    setQuestionOther({
      ...questionOther,
      other_title: value
    })
  }

  const onHandleChangeNote = () => {
    if (isHasChild === 1) {
      setIsHasChild(0);
    } else {
      setIsHasChild(1);
    }
  }

  const handleChangeColumnChildLabel = (e, idxRow) => {
    e = window.event || e;
    e.preventDefault();
    let row = [...rowChild];
    row[idxRow].title = e.target.value;
    setRowChild(row);
  };

  const addChildRowLabel = () => {
    let title = "";
    let unique = generateRandomCode(6);
    let data = [...rowChild];
    let type = STRING;
    let unit = '';
    data.push({ title, type, unique, unit });
    setRowChild(data);
  };

  const removeChildRowLabel = (e, idxRow) => {
    e = window.event || e;
    e.preventDefault();
    let data = [...rowChild];

    if (data[idxRow].id) {
      let listColDel = [...listDelete];
      listColDel.push(data[idxRow].id);
      setListDelete(listColDel);
    }

    let datafilter = data.filter((_item, idxChil) => {
      if (idxChil !== idxRow) {
        return true;
      }
      return false;
    });

    setRowChild(datafilter);
  };

  const handleChangeUnitChildRow = (e, idxRow) => {
    e = window.event || e;
    e.preventDefault();
    let rows = [...rowChild];
    rows[idxRow].unit = e.target.value;
    setRowChild(rows);
  };

  const handleChangeTitleNote = (e) => {
    e = window.event || e;
    e.preventDefault();
    setTitleNote(e.target.value);
  }

  return (
    <>
      {props.isEdit ? (
        <div key={`multi-choice-${props.item.unique}-${props.item.id}`}>
          <div style={{ marginTop: '5px' }}>
            <p className="title-lable"> Điền nội dung câu hỏi</p>
            <Input
              style={{ marginBottom: "10px", height: '38px' }}
              type="text"
              onChange={handleChange}
              defaultValue={title}
            />
          </div>
          <label style={{ marginLeft: '15px', paddingTop: "15px" }}>Nhãn hàng</label>
          {rowLabel.map((item, idx) => {
            return (
              <div key={`$row-${item.unique}-${item.id}`} >
                <p className="title-lable title-lable-row"> Điền nội dung hàng  {idx + 1}</p>
                <div style={{ marginBottom: '7px' }}>
                  {idx + 1}. <Input
                    style={{ width: "80%", marginRight: "10px" }}
                    onChange={(e) => handleChangeRowLabel(e, idx)}
                    defaultValue={item.title}
                  />
                  <AddCircleOutline
                    style={{ cursor: "pointer" }}
                    onClick={addRowLabel}
                  />
                  {rowLabel.length > 1 && (
                    <RemoveCircleOutline
                      style={{ cursor: "pointer" }}
                      onClick={(e) => removeRowLabel(e, idx)}
                    />
                  )}
                </div>
              </div >
            );
          })}
          <div style={{ paddingTop: "20px", paddingLeft: '15px' }}>
            <div>
              <Checkbox onClick={e => onHandleChangeNote(e.target.value)} checked={isHasChild ? true : false} /> Câu hỏi có ghi chú?</div>
            {
              isHasChild === 1 ? (
                <div>
                  <p className="title-lable"> Điền tiêu đề ghi chú</p>
                  <Input
                    style={{ marginBottom: "10px", height: '38px' }}
                    type="text"
                    onChange={handleChangeTitleNote}
                    defaultValue={titleNote}
                  />
                </div>
              ) : ""
            }
            {
              isHasChild === 1 ? rowChild.map((item, index) => {
                return (
                  <div key={`child-cols-${index}}`}>
                    {index + 1}. <Input
                      style={{ width: "80%", marginRight: "10px" }}
                      defaultValue={item.title}
                      onChange={(e) => handleChangeColumnChildLabel(e, index)}
                    />
                    <>
                      <AddCircleOutline
                        style={{ cursor: "pointer" }}
                        onClick={addChildRowLabel}
                      />
                      {rowChild.length > 1 && (
                        <RemoveCircleOutline
                          style={{ cursor: "pointer" }}
                          onClick={(e) => removeChildRowLabel(e, index)}
                        />
                      )}
                    </>
                    <div style={{ margin: 'auto', textAlign: 'right' }} className="custom-Select-antd">
                      <div className="row" style={{ marginBottom: '20px    ' }}>
                        <div className="col-md-2"></div>
                        <div className="col-md-4" style={{ paddingRight: '12px' }}>
                          <p style={{
                            fontSize: "11px", fontStyle: "italic", color: "#096dd9", paddingBottom: "3px",
                            marginBottom: "0px", paddingLeft: "10px", width: "81%"
                          }}> Nhập đơn vị (nếu có)</p>
                          <Input onChange={e => handleChangeUnitChildRow(e, index)} defaultValue={item.unit} style={{ width: '100%', marginRight: '15px', height: '40px' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                )
              }) : ""
            }
            <div><Checkbox onClick={e => onHandleChangeOther(e.target.value)} checked={isHasOther ? true : false} /> Câu hỏi có dạng khác?</div>
            {isHasOther ? <Input
              style={{ width: "80%", marginRight: "10px" }}
              onChange={(e) => onHandleTitleOther(e.target.value)}
              placeholder='Nhập tiêu đề momg muốn'
              defaultValue={(props.item.question_other && props.item.question_other.other_title) || ''}
            /> : null}
            <div style={{ marginTop: "10px" }}>
              <Button
                style={{ marginRight: '5px' }}
                size="small"
                onClick={onClickCancel}
              >
                Hủy bỏ
            </Button>
              <Button
                type="primary"
                size="small"
                onClick={onClickSave}>
                Lưu câu hỏi
            </Button>
            </div>
          </div>
        </div>
      ) : (
          <div key={`multi-choice-${props.item.unique}-${props.item.id}`}>
            <p className='title-question'>Câu {props.stt + 1}. {title}</p>
            <div onClick={editHandle} style={{ cursor: "pointer" }}>
              {rowLabel.map((item, i) => {
                if (item.is_has_child) {
                  return (
                    <div>
                      <div key={`view-single-${item.unique}-${item.id || ''}`}>
                        <div key={i} style={{ marginBottom: '7px' }}>
                          <Checkbox /> {item.title}
                        </div>
                      </div>
                      <div style={{ display: "flex" }}>
                        {item.row_child && item.row_child.length && item.row_child.map((childItem, idx) => {
                          return (
                            <>
                              <div style={{ width: "50%" }}>
                                <span style={{ width: "50%", wordBreak: "break-word" }}>
                                  {childItem.title} ..................................................................... {childItem.unit}
                                </span>
                              </div>
                            </>
                          )
                        })}
                      </div>
                    </div>
                  )

                } else {
                  return (
                    <div key={`view-single-${item.unique}-${item.id || ''}`}>
                      <div key={i} style={{ marginBottom: '7px' }}>
                        <Checkbox /> {item.title}
                      </div>
                    </div>
                  )
                }
              })}
              {
                isHasChild === 1 ? (
                  <p className="titleNote">{titleNote}:</p>
                ) : ""
              }
              {
                isHasChild === 1 && rowChild.map((e, i) => {
                  return (
                    <>
                      {e.title}
                      <Input type="number" style={{ marginRight: "10px" }} /> {e.unit ? <div className="text-align-right">
                        <p className="title-lable">đơn vị ({e.unit}) </p>
                      </div> : ""}
                    </>
                  )
                })
              }
              {props.item.isHasOther === 1 && <div style={{ marginBottom: '7px' }}>
                {props.item.question_other &&
                  props.item.question_other.other_title ? `${props.item.question_other.other_title}` : 'Ý kiến khác: '}
                <Input style={{ marginRight: '8px' }} />
              </div>}
            </div>
          </div>
        )
      }
    </>
  );
};

export default MultiChoice;
