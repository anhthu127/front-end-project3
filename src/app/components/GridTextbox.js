import React, { useState, useEffect } from "react";
import { Input, Button } from "antd";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RemoveCircleOutline from "@material-ui/icons/RemoveCircleOutline";
import { STRING, GRID_TEXTBOX } from '../config/common/TypeOfInput';
import { generateRandomCode } from '../libs/random';
import './QuestionItem.scss';

const GridTextbox = (props) => {

  const [title, setTitle] = useState(
    props.title
  );

  const [titleUpdate, setTitleUpdate] = useState("");
  const [currentRowLabel, setCurrentRowLabel] = useState([]);
  const [currentColumnLabel, setCurrentColumnLabel] = useState([]);
  const [listRowDelete, setListRowDelete] = useState([]);
  const [listColDelete, setListColDelete] = useState([]);

  const [rowLabel, setRowLabel] = useState([
    { title: "Nội dung hàng 1", unique: 'abcdefgh' },
    { title: "Nội dung hàng 2", unique: 'iklmnopq' },
    { title: "Nội dung hàng 3", unique: 'rstuvxyz' }
  ]);

  const [columnLabel, setColumnLabel] = useState([
    { title: "Nội dung cột 1", type: STRING, unique: 'abcdefgh' },
    { title: "Nội dung cột 2", type: STRING, unique: 'iklmnopq' },
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
  }
  useEffect(componentDidMount, []);

  let objGridTextbox = {
    id: props.id || '',
    title: title,
    note: "",
    parent_id: 0,
    have_child: false,
    unique: props.item.unique,
    index: 1,
    type: 1, //1 là bình thường, 2 là mẫu
    input_type_id: GRID_TEXTBOX, // 8 là table_string....
    question_columns: [],
    question_row: []
  };

  const handleChangeTextbox = (e) => {
    e = window.event || e;
    e.preventDefault();
    setTitleUpdate(e.target.value);
  };
  const handleChangeTextboxRowLabel = (e, idx) => {
    let newRowLabel = [...rowLabel];
    newRowLabel[idx].title = e.target.value;
    setRowLabel(newRowLabel);
  };

  const handleChangeTextboxColumnLabel = (e, idx) => {
    let objCol = [...columnLabel]
    objCol[idx].title = e.target.value;
    setColumnLabel(objCol);
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
    data.push({ title, type: STRING, unique });
    setColumnLabel(data);
  };

  const handleCancelGridTextbox = () => {
    setRowLabel(currentRowLabel);
    setColumnLabel(currentColumnLabel);
    props.onCancel();
  };

  const handleSaveGridTextbox = () => {
    setCurrentRowLabel([...rowLabel]);
    setCurrentColumnLabel([...columnLabel]);
    columnLabel.forEach((e, i) => {
      let column = {};
      column.id = e.id;
      column.title = e.title;
      column.note = e.title;
      column.index = i;
      column.type = e.type;
      objGridTextbox.question_columns.push(column);
    });

    objGridTextbox.delete_cols = listColDelete;

    rowLabel.forEach((e, i) => {
      let row = {};
      row.id = e.id || '';
      row.note = e.note || '';
      row.title = e.title || '';
      objGridTextbox.question_row.push(row);
    });

    objGridTextbox.delete_rows = listRowDelete;

    if (titleUpdate !== "") {
      setTitle(titleUpdate);
      objGridTextbox.title = titleUpdate;
    }
    props.getDataSection(objGridTextbox);
    props.onCancel();
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

  return (
    <>
      {props.isEdit ? (
        <div>
          <div style={{ marginTop: '5px' }}>
            <p className='title-question'>Câu {props.stt + 1}. </p>
            <p style={{
              fontSize: "11px", fontStyle: "italic", color: "#1890ff", paddingBottom: "3px",
              marginBottom: "0px", paddingLeft: "10px", width: "100%"
            }}> Điền nội dung câu hỏi</p>
            <Input
              style={{ marginBottom: "10px", height: '38px' }}
              type="text"
              onChange={handleChangeTextbox}
              defaultValue={title}
            />
          </div>
          <label style={{ marginLeft: '15px', paddingTop: "15px" }}>Nhãn hàng</label>
          {rowLabel.map((item, idx) => {
            return (
              <div key={`grid-text-${item.unique}-${item.id}`}>
                <p style={{
                  fontSize: "11px", fontStyle: "italic", color: "#1890ff", paddingBottom: "3px",
                  marginBottom: "0px", paddingLeft: "20px", width: "100%"
                }}> Điền nội dung hàng  {idx + 1}</p>
                <div key={`$row-${item.unique}`} style={{ marginBottom: '7px' }}>
                  {idx + 1}.<Input
                    style={{ width: "80%", marginRight: "10px" }}
                    onChange={(e) => handleChangeTextboxRowLabel(e, idx)}
                    defaultValue={item.title}
                  />
                  <AddCircleOutlineIcon
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
          })}
          <label style={{ marginLeft: '15px', paddingTop: "15px" }}>Nhãn cột</label>
          {columnLabel.map((item, idx) => {
            return (
              <div key={`grid-text-view-${item.unique}-${item.id}`}>
                <p style={{
                  fontSize: "11px", fontStyle: "italic", color: "#1890ff", paddingBottom: "3px",
                  marginBottom: "0px", paddingLeft: "20px", width: "100%"
                }}> Điền nội dung cột  {idx + 1}</p>
                <div key={`$col-${item.unique}`} style={{ marginBottom: '7px' }}>
                  {idx + 1}.
                <Input
                    style={{ width: "80%", marginRight: "10px" }}
                    defaultValue={item.title}
                    onChange={(e) => handleChangeTextboxColumnLabel(e, idx)}
                  />
                  <AddCircleOutlineIcon
                    style={{ cursor: "pointer" }}
                    onClick={addColumnLabel}
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
          })}
          <div style={{ paddingTop: "20px", paddingLeft: '15px' }}>
            <Button
              style={{ marginRight: '5px' }}
              size="small"
              onClick={handleCancelGridTextbox}
            >
              Hủy bỏ
            </Button>
            <Button
              type="primary"
              size="small"
              onClick={handleSaveGridTextbox}
            >
              Lưu câu hỏi
            </Button>
          </div>
        </div>
      ) : (
          <>
            <p className='title-question'>Câu {props.stt + 1}. {title}</p>
            <div style={{ width: "100%", height: "30px" }}></div>

            <div onClick={props.onEdit} style={{ cursor: "pointer" }}>
              <table className="table-width-view">
                <thead>
                  <tr>
                    <th></th>
                    {columnLabel.map((e, i) => {
                      return <th key={i} style={{ margin: 'auto', textAlign: 'center', border: 'solid', borderWidth: 'thin' }} className='th-table-question-view'>{e.title}</th>;
                    })}
                  </tr>
                </thead>
                <tbody>
                  {rowLabel.map((e, i) => {
                    return (
                      <tr key={i}>
                        <td className='td-table-create-question'>{e.title}</td>
                        {columnLabel.map((e, i) => {
                          return (
                            <td key={i} style={{ margin: 'auto', textAlign: 'center', border: 'solid', borderWidth: 'thin' }}>
                              <Input />
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
    </>
  );
};

export default GridTextbox;
