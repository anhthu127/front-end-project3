/* eslint-disable array-callback-return */
import React, { useState, useEffect } from "react";
import { Radio, Button, Input, Checkbox } from "antd";
import { AddCircleOutline, RemoveCircleOutline } from "@material-ui/icons";
import { RADIO, GRID_SINGLE_CHOICE } from '../config/common/TypeOfInput';
import { generateRandomCode } from '../libs/random';
import './QuestionItem.scss';

const GridSingleChoice = (props) => {
  const [preTitle, setPreTitle] = useState("");
  const [title, setTitle] = useState(props.title);
  const [pre_title_table, setPreTitleTable] = useState('');
  const [title_table, setTitleTable] = useState(
    props.item.title_table);
  const [currentRowLabel, setCurrentRowLabel] = useState([]);
  const [listRowDelete, setListRowDelete] = useState([]);
  const [listColDelete, setListColDelete] = useState([]);
  const [currentColumnLabel, setCurrentColumnLabel] = useState([]);
  const [isHasOther, setIsHasOther] = useState();
  const [questionOther, setQuestionOther] = useState({});
  const [rowLabel, setRowLabel] = useState([
    { title: "Nội dung hàng 1", unique: 'abcdefgh' },
    { title: "Nội dung hàng 2", unique: 'iklmnopq' },
    { title: "Nội dung hàng 3", unique: 'rstuvxyz' }
  ]);

  const [columnLabel, setColumnLabel] = useState([
    { title: "Nội dung cột 1", type: RADIO, unique: 'abcdefgh' },
    { title: "Nội dung cột 2", type: RADIO, unique: 'iklmnopq' },
  ]);

  const componentDidMount = () => {
    if (props.item && props.item.question_row && props.item.question_row.length) {
      let rowItem = props.item.question_row.map(item => {
        return {
          id: item.id,
          title: item.title
        }
      });

      setCurrentRowLabel([...rowItem]);
      setRowLabel([...rowItem]);
    } else {
      setCurrentRowLabel([...rowLabel]);
      setRowLabel([...rowLabel]);
    }

    if (props.item && props.item.question_columns && props.item.question_columns.length) {
      let columnItem = props.item.question_columns.map(item => {
        return {
          id: item.id,
          title: item.title,
          type: item.type
        }
      });
      setCurrentColumnLabel([...columnItem]);
      setColumnLabel(columnItem);
    } else {
      setColumnLabel(columnLabel);
      setCurrentColumnLabel(columnLabel);
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

  let objGridSingleChoice = {
    id: props.id || '',
    title: title,
    note: "",
    parent_id: 0,
    have_child: false,
    title_table: title_table,
    unique: props.item.unique,
    index: 1,
    type: 1, //1 là bình thường, 2 là mẫu,
    isHasOther: isHasOther,
    input_type_id: GRID_SINGLE_CHOICE, // 8 là table_string....
    question_columns: [],
    question_row: [],
    question_other: {}
  };

  const handleChange = (e) => {
    e = window.event || e;
    e.preventDefault();
    setPreTitle(e.target.value);
  };

  const handleChangeTitleTable = (e) => {
    e = window.event || e;
    e.preventDefault();
    setTitleTable(e.target.value);
  };

  const handleChangeRowLabel = (e, idx) => {
    e = window.event || e;
    e.preventDefault();
    let row = [...rowLabel];
    row[idx].title = e.target.value;
    setRowLabel(row);
  };

  const handleChangeColumnLabel = (e, idx) => {
    e = window.event || e;
    e.preventDefault();
    let row = [...columnLabel];
    row[idx].title = e.target.value;
    setColumnLabel(row);
  };

  const addRowLabel = () => {
    let title = "";
    let unique = generateRandomCode(6);
    let data = [...rowLabel];
    data.push({ title, unique });
    setRowLabel(data);
  };

  const addColumnLabel = () => {
    let title = "";
    let unique = generateRandomCode(6);
    let data = [...columnLabel];
    let type = RADIO;
    data.push({ title, type, unique });
    setColumnLabel(data);
  };

  const removeRowLabel = (e, idx) => {
    e.preventDefault();
    let data = [...rowLabel];
    if (data[idx].id) {
      let listRowDel = [...listRowDelete];
      listRowDel.push(data[idx].id);
      setListRowDelete(listRowDel);
    }

    let datafilter = data.filter((_item, index) => {
      if (index !== idx) {
        return true;
      }
      return false;
    });
    setRowLabel(datafilter);
  };

  const removeColumnLabel = (e, idx) => {
    e.preventDefault();
    let data = [...columnLabel];
    if (data[idx].id) {
      let listColDel = [...listColDelete];
      listColDel.push(data[idx].id);
      setListColDelete(listColDel);
    }
    let datafilter = data.filter((_item, index) => {
      if (index !== idx) {
        return true;
      }
      return false;
    });
    setColumnLabel(datafilter);
  };

  const onClickSave = (e) => {
    e = window.event || e;
    e.preventDefault();

    setCurrentColumnLabel(...columnLabel);
    setCurrentRowLabel(...rowLabel);

    columnLabel.map((e, i) => {
      let column = {};
      column.id = e.id || '';
      column.title = e.title;
      column.note = e.title;
      column.index = i;
      column.type = e.type;
      objGridSingleChoice.question_columns.push(column);
    });

    objGridSingleChoice.delete_cols = listColDelete;

    objGridSingleChoice.question_other = questionOther;

    rowLabel.map((e, i) => {
      let row = {};
      row.id = e.id || '';
      row.note = e.note || '';
      row.title = e.title || '';
      objGridSingleChoice.question_row.push(row);
    });

    objGridSingleChoice.delete_rows = listRowDelete;

    if (preTitle !== "") {
      setTitle(preTitle);
      objGridSingleChoice.title = preTitle;
    }

    if (title_table) {
      setPreTitleTable(title_table);
      objGridSingleChoice.title_table = title_table
    }

    props.onCancel();
    props.getDataSection(objGridSingleChoice);
  };

  const editHandle = (e) => {
    e = window.event || e;
    props.onEdit();
  };

  const onClickCancel = (e) => {
    e = window.event || e;
    e.preventDefault();
    setRowLabel(currentRowLabel);
    setColumnLabel(currentColumnLabel);
    setTitleTable(pre_title_table);
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

  return (
    <>
      {props.isEdit ? (
        <div>
          <div style={{ marginTop: '5px' }}>
            <p className="title-lable"> Điền nội dung câu hỏi</p>
            <Input
              style={{ marginBottom: "10px", height: '38px' }}
              type="text"
              onChange={handleChange}
              defaultValue={title}
            />
          </div>
          <div>
            <p className="title-lable"> Điền tiêu đề bảng</p>
            <Input
              style={{ marginBottom: "10px", height: '38px' }}
              type="text"
              onChange={handleChangeTitleTable}
              defaultValue={pre_title_table}
            />
          </div>
          <label style={{ marginLeft: '15px', paddingTop: "15px" }}>Nhãn dòng</label>
          {
            rowLabel.map((item, idx) => {
              return (
                <div>
                  <p className="title-lable title-lable-row"> Điền nội dung hàng  {idx + 1}</p>
                  <div key={`row-${item.unique}`} style={{ marginBottom: '7px' }}>
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
                </div>
              );
            })
          }

          <label style={{ marginLeft: '15px', paddingTop: "15px" }}>Nhãn cột</label>
          {
            columnLabel.map((item, idx) => {
              return (
                <div>
                  <p className="title-lable title-lable-row"> Điền nội dung cột  {idx + 1}</p>
                  <div key={`col-${item.unique}`} style={{ marginBottom: '7px' }}>
                    {idx + 1}. <Input
                      style={{ width: "80%", marginRight: "10px" }}
                      defaultValue={item.title}
                      onChange={(e) => handleChangeColumnLabel(e, idx)}
                    />
                    <AddCircleOutline
                      style={{ cursor: "pointer" }}
                      onClick={(e) => addColumnLabel()}
                    />
                    {columnLabel.length > 1 && (
                      <RemoveCircleOutline
                        style={{ cursor: "pointer" }}
                        onClick={(e) => removeColumnLabel(e, idx)}
                      />
                    )}
                  </div>
                </div>
              );
            })
          }

          <div style={{ paddingTop: "20px", paddingLeft: '15px' }}>
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
                onClick={onClickSave}
              >
                Lưu câu hỏi
            </Button>
            </div>
          </div >
        </div>
      ) : (
          <>
            <p className='title-question'>Câu {props.stt + 1}. {title}</p>
            <div style={{ width: "100%", height: "30px" }}></div>
            <div onClick={editHandle} style={{ cursor: "pointer" }}>
              <table className="table-width-view">
                <thead>
                  <tr>
                    <th className='td-table-create-question th-table-question-view'>{props.item.title_table || pre_title_table}</th>
                    {columnLabel.map((e, i) => {
                      return <th key={i} className='td-table-create-question th-table-question-view'>{e.title}</th>
                    })}
                  </tr>
                </thead>
                <tbody>
                  {rowLabel.map((item, i) => {
                    return (
                      <tr key={i}>
                        <td className='td-table-create-question'>{item.title}</td>
                        {columnLabel.map((sub, i) => {
                          return (
                            <td key={i} style={{ margin: 'auto', textAlign: 'center', border: 'solid', borderWidth: 'thin' }}>
                              <Radio />
                            </td>
                          )
                        })}
                      </tr>
                    );
                  })}
                  {props.item.isHasOther === 1 && columnLabel && <>
                    {props.item.isHasOther === 1 && <th className='td-table-create-question th-table-question-view'>{props.item.question_other &&
                      props.item.question_other.other_title ? `${props.item.question_other.other_title}` : 'Ý kiến khác'}</th>}
                    {columnLabel.map((sub, i) => {
                      return (
                        <td key={i} style={{ margin: 'auto', textAlign: 'center', border: 'solid', borderWidth: 'thin' }}>
                          <Input />
                        </td>
                      );
                    })}
                  </>}
                </tbody>
              </table>
            </div>
          </>
        )}
    </>
  );
};

export default GridSingleChoice;
