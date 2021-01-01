import React, { useState, useEffect } from "react";
import { Checkbox, Button, Input, Select } from "antd";
import { AddCircleOutline, RemoveCircleOutline } from "@material-ui/icons";
import { MULTI_CHOICE, MULTI_TEXT, STRING, TYPE_GRID_SELECT } from '../config/common/TypeOfInput';
import { generateRandomCode } from '../libs/random';
const { Option } = Select;

const MultiStringNumber = (props) => {
  const [preTitle, setPreTitle] = useState('');
  const [currentRowLabel, setCurrentRowLabel] = useState([]);
  const [title, setTitle] = useState(props.title);
  const [isHasOther, setIsHasOther] = useState();
  const [questionOther, setQuestionOther] = useState({});

  const [rowLabel, setRowLabel] = useState([
    { title: "Nội dung hàng 1", unique: 'abcdefgh' },
    { title: "Nội dung hàng 2", unique: 'iklmnopq' },
    { title: "Nội dung hàng 3", unique: 'rstuvxyz' }
  ]);
  const [listDelete, setListDelete] = useState([]);

  const componentDidMount = () => {
    if (props.item && props.item.question_child && props.item.question_child.length) {
      let rowItem = props.item.question_child.map(item => {
        return {
          id: item.id,
          title: item.title
        }
      });
      setCurrentRowLabel([...rowItem]);
      setRowLabel([...rowItem]);
    } else {
      setRowLabel([...rowLabel]);
      setCurrentRowLabel([...rowLabel]);
    }
    if (props.item.isHasOther) {
      setIsHasOther(props.item.isHasOther)
    }

    if (props.item.question_other) {
      setQuestionOther(props.item.question_other);
    } else {
      setQuestionOther({
        other_title: ''
      })
    }
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
    input_type_id: MULTI_TEXT, // 4 là dạng multi select....
    question_child: [],
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
    rowLabel.forEach((e, i) => {
      let question = {};
      question.id = e.id || '';
      question.title = e.title;
      question.input_type_id = MULTI_TEXT;
      question.index = i;
      objMultiChoice.question_child.push(question);
    });

    if (preTitle !== "") {
      setTitle(preTitle);
      objMultiChoice.title = preTitle;
    }
    objMultiChoice.delete_choices = listDelete;

    objMultiChoice.question_other = questionOther;
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
    props.onCancel();
  };

  const onChangeTypeRow = (val, idx) => {
    let rows = [...rowLabel];
    rows[idx].type = val;
    setRowLabel(rows);
  }

  const handleChangeUnitRow = (e, idx) => {
    e = window.event || e;
    e.preventDefault();
    let rows = [...rowLabel];
    rows[idx].unit = e.target.value;
    setRowLabel(rows);
  };

  return (
    <>
      {props.isEdit ? (
        <div key={`multi-choice-${props.item.unique}-${props.item.id}`}>
          <div style={{ marginTop: '5px' }}>
            <p className="title-lable"> Điền nội dung câu hỏi phụ</p>
            <Input
              style={{ marginBottom: "10px", height: '38px' }}
              type="text"
              onChange={handleChange}
              defaultValue={title}
            />
          </div>
          <label style={{ marginLeft: '15px', paddingTop: "15px" }}>Nội dung dòng 1</label>
          {rowLabel.map((item, idx) => {
            return (
              <div key={`$row-${item.unique}-${item.id}`} >
                <p className="title-lable title-lable-row"> Điền nội dung hàng {idx + 1}</p>
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
                <div style={{ margin: 'auto', textAlign: 'right' }} className="custom-Select-antd">
                  <div className="row row-select-data">
                    <div className="col-md-5">
                      <p className="title-lable title-select-data"> Chọn kiểu dữ liệu cột</p>
                      <div className='custom-select-width'>
                        <Select
                          defaultValue={item.type || STRING}
                          onChange={val => onChangeTypeRow(val, idx)}
                        >
                          {TYPE_GRID_SELECT.map((subIT, idx) => {
                            return <Option style={{ textAlign: 'center' }} key={`type-${item.unique}`} value={subIT.value || 'Chọn kiểu nhập'}>{subIT.type}</Option>
                          })}
                        </Select>
                      </div>
                    </div>
                    <div className="col-md-5" style={{ paddingRight: '42px' }}>
                      <p className="title-lable title-select-data"> Nhập đơn vị (nếu có)</p>
                      <Input onChange={e => handleChangeUnitRow(e, idx)} defaultValue={item.unit} style={{ width: '100%', marginRight: '15px', height: '40px' }} />
                    </div>
                  </div>
                </div>
              </div >
            );
          })}
          <div style={{ marginTop: "10px" }}>
            <Button
              style={{ marginRight: "5px " }}
              size="small"
              onClick={(e) => onClickCancel(e)}
            >
              Cancel
						</Button>
            <Button type="primary" size="small" onClick={(e) => onClickSave(e)}>
              Lưu câu hỏi
						</Button>
          </div>
        </div>
      ) : (
          <div key={`multi-choice-${props.item.unique}-${props.item.id}`}>
            <p className='title-question'>{props.stt + 1}. {title}</p>
            <div onClick={e => editHandle(e)} style={{ cursor: "pointer" }}>
              {rowLabel.map((item, i) => {
                return (
                  <>
                    <div key={`${i}-${item.unique}-${item.id}`} style={{ marginBottom: '7px' }}>
                      <Checkbox style={{ marginRight: '8px' }} /> {item.title}
                    </div>
                  </>
                );
              })}

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

export default MultiStringNumber;
