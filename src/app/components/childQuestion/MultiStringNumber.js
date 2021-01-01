import React, { useState, useEffect } from "react";
import { Button, Input, Select } from "antd";
import { AddCircleOutline, RemoveCircleOutline } from "@material-ui/icons";
import { MULTI_TEXT, STRING, TYPE_GRID_SELECT } from '../../config/common/TypeOfInput';
import { generateRandomCode } from '../../libs/random';
const { Option } = Select;

const MultiStringNumber = (props) => {
  const [preTitle, setPreTitle] = useState('');
  const [currentRowLabel, setCurrentRowLabel] = useState([]);
  const [title, setTitle] = useState(props.title);

  const [rowLabel, setRowLabel] = useState([
    { title: "Nội dung hàng 1", unique: 'abcdefgh', type: STRING },
    { title: "Nội dung hàng 2", unique: 'iklmnopq', type: STRING }
  ]);
  const [listDelete, setListDelete] = useState([]);

  const componentDidMount = () => {
    if (props.item && props.item.question_choice && props.item.question_choice.length) {
      let rowItem = props.item.question_choice.map(item => {
        return {
          id: item.id,
          title: item.title,
          type: item.type,
          unit: item.unit,
          question_id: item.question_id || ''
        }
      });
      setCurrentRowLabel([...rowItem]);
      setRowLabel([...rowItem]);
    } else {
      setRowLabel([...rowLabel]);
      setCurrentRowLabel([...rowLabel]);
    }
  }

  useEffect(componentDidMount, []);

  let objMultiChoice = {
    id: props.id || '',
    title: title,
    note: "",
    parrent_id: props.id || '',
    unique: props.item.unique,
    index: props.idxChild,
    type: 1,
    isEdit: props.item.isEdit,
    input_type_id: MULTI_TEXT, // 4 là dạng multi select....
    question_choice: [],
    unit: ''
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
    let title = "Nội dung hàng";
    let unique = generateRandomCode(6);
    let type = STRING;
    let data = [...rowLabel];
    data.push({ title, unique, type });
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
      question.title = e.title || '';
      question.index = i;
      question.type = e.type;
      question.unit = e.unit || '';
      objMultiChoice.question_choice.push(question);
    });
    if (preTitle !== "") {
      setTitle(preTitle);
      objMultiChoice.title = preTitle;
    }

    objMultiChoice.delete_choices = listDelete;
    props.getDataSection(objMultiChoice, props.idxChild);
  };

  const editHandle = (e) => {
    e = window.event || e;
    e.preventDefault();
    props.onEdit(props.idxChild);
  };

  const onClickCancel = (e) => {
    e = window.event || e;
    e.preventDefault();
    setRowLabel(currentRowLabel);
    props.onCancel(props.idxChild);
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
            <p className="title-lable"> Điền nội dung câu hỏi con</p>
            <Input
              style={{ marginBottom: "10px", height: '38px' }}
              type="text"
              onChange={handleChange}
              defaultValue={title}
            />
          </div>
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
                            return <Option style={{ textAlign: 'center' }} key={`type-${subIT.value}`} value={subIT.value || 'Chọn kiểu nhập'}>{subIT.type}</Option>
                          })}
                        </Select>
                      </div>
                    </div>
                    {item.type === 2 &&
                      <div className="col-md-5" style={{ paddingRight: '42px' }}>
                        <p className="title-lable title-select-data"> Nhập đơn vị (nếu có)</p>
                        <Input onChange={e => handleChangeUnitRow(e, idx)} defaultValue={item.unit} style={{ width: '100%', marginRight: '15px', height: '40px' }} />
                      </div>}
                  </div>
                </div>
              </div >
            );
          })}
          <div style={{ paddingTop: "20px", paddingLeft: '15px' }}>
            <div style={{ marginTop: "10px" }}>
              <Button
                style={{ marginRight: '5px' }}
                size="small"
                onClick={e => onClickCancel(e)}
              >
                Hủy bỏ
            </Button>
              <Button
                type="primary"
                size="small"
                onClick={(e) => onClickSave(e)}>
                Lưu câu hỏi con
            </Button>
            </div>
          </div>
        </div>
      ) : (
          <div key={`multi-choice-${props.item.unique}-${props.item.id}`}>
            <p style={{ fontSize: "15px", fontWeight: "600", paddingTop:'10px' }}    >{props.idxChild + 1}. {title}</p>
            <div onClick={e => editHandle(e)} style={{ cursor: "pointer" }}>
              {rowLabel && rowLabel.map((item, i) => {
                return (
                  <>
                    <div key={`${i}-${item.unique}-${item.id}`} style={{ marginBottom: '7px' }}>
                      {item.title} <Input style={{ marginRight: '8px' }} /> {item.unit ? <div className="text-align-right">
                        <p className="title-lable">đơn vị ({item.unit}) </p>
                      </div> : ''}
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        )
      }
    </>
  );
};

export default MultiStringNumber;
