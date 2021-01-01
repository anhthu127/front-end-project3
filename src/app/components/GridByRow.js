import React, { useState, useEffect } from "react";
import { Checkbox, Button, Input, Select, Radio } from "antd";
import { AddCircleOutline, RemoveCircleOutline } from "@material-ui/icons";
import { CHECKBOX, GRID_BY_ROW, NUMBER, RADIO, STRING, TYPE_GRID_ROW_COL, TYPE_GRID_SELECT } from '../config/common/TypeOfInput';
import './QuestionItem.scss';
import { generateRandomCode } from '../libs/random';
const { Option } = Select;

const GridByRow = (props) => {
  const [preTitle, setPreTitle] = useState('');
  const [title, setTitle] = useState(
    props.title
  );
  const [pre_title_table, setPreTitleTable] = useState(props.item.title_table);
  const [title_table, setTitleTable] = useState('');
  const [currentRowLabel, setCurrentRowLabel] = useState([]);
  const [currentColumnLabel, setCurrentColumnLabel] = useState([]);
  const [listRowDelete, setListRowDelete] = useState([]);
  const [listColDelete, setListColDelete] = useState([]);
  const [isHasOther, setIsHasOther] = useState();
  const [questionOther, setQuestionOther] = useState({});

  const [rowLabel, setRowLabel] = useState([
    { title: "Nội dung hàng 1", unique: 'abcdefgh', unit: '', type: 4 },
    { title: "Nội dung hàng 2", unique: 'iklmnopq', unit: '', type: 4 },
    { title: "Nội dung hàng 3", unique: 'rstuvxyz', unit: '', type: 4 }
  ]);
  const [columnLabel, setColumnLabel] = useState([
    { title: "Nội dung cột 1", type: STRING, unique: 'abcdefgh' },
    { title: "Nội dung cột 2", type: CHECKBOX, unique: 'iklmnopq' },
    { title: "Nội dung cột 3", type: RADIO, unique: 'rstuvxyz' }
  ]);

  const componentDidMount = () => {
    if (props.item && props.item.question_row && props.item.question_row.length) {
      let rowItem = props.item.question_row.map(item => {
        return {
          id: item.id,
          title: item.title,
          type: item.type
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

  let objGridMultiChoice = {
    id: props.id || '',
    title: title,
    note: "",
    parent_id: 0,
    have_child: false,
    title_table: props.item.title_table,
    index: 1,
    type: 1, //1 là bình thường, 2 là mẫu,
    unique: props.item.unique,
    isHasOther: isHasOther,
    input_type_id: GRID_BY_ROW, // 8 là table_string....
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
    let rows = [...rowLabel];
    rows[idx].title = e.target.value;
    setRowLabel(rows);
  };

  const handleChangeUnitRow = (e, idx) => {
    e = window.event || e;
    e.preventDefault();
    let rows = [...rowLabel];
    rows[idx].unit = e.target.value;
    setRowLabel(rows);
  };

  const handleChangeColumnLabel = (e, idx) => {
    e = window.event || e;
    e.preventDefault();
    let columns = [...columnLabel];
    columns[idx].title = e.target.value;
    setColumnLabel(columns);
  };

  const addRowLabel = () => {
    let title = "";
    let unit = "";
    let type = RADIO;
    let unique = generateRandomCode(6);
    let data = [...rowLabel];
    data.push({ title, unique, unit, type });
    setRowLabel(data);
  };

  const addColumnLabel = () => {
    let title = "";
    let unique = generateRandomCode(6);
    let data = [...columnLabel];
    let type = CHECKBOX;
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
    setCurrentColumnLabel([...columnLabel]);
    setCurrentRowLabel([...rowLabel]);

    columnLabel.forEach((e, i) => {
      let column = {};
      column.id = e.id || '';
      column.title = e.title;
      column.note = e.note;
      column.type = e.type;
      column.index = i;
      objGridMultiChoice.question_columns.push(column);
    });

    objGridMultiChoice.delete_cols = listColDelete;

    objGridMultiChoice.question_other = questionOther;

    rowLabel.forEach((e) => {
      let row = {};
      row.id = e.id || '';
      row.note = e.note || '';
      row.title = e.title || '';
      row.unit = e.unit;
      objGridMultiChoice.question_row.push(row);
    });

    objGridMultiChoice.delete_rows = listRowDelete;

    if (preTitle !== "") {
      setTitle(preTitle);
      objGridMultiChoice.title = preTitle;
    }

    if (title_table) {
      setPreTitleTable(title_table);
      objGridMultiChoice.title_table = title_table
    }

    props.onCancel();
    props.getDataSection(objGridMultiChoice);
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

  const onChangeTypeRow = (val, idx) => {
    let rows = [...rowLabel];
    rows[idx].type = val;
    setRowLabel(rows);
  }

  const renderColByType = (type) => {
    switch (type) {
      case STRING:
        return <Input />
      case NUMBER:
        return <Input />
      case CHECKBOX:
        return <Checkbox />
      case RADIO:
        return <Radio />
      default:
        break;
    }
  }

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

  const onChangeHasChildYN = (idxCols, itemChild) => {
    let cols = [...columnLabel];
    if (cols[idxCols].is_has_child) {
      cols[idxCols].is_has_child = 0
    } else {
      cols[idxCols].is_has_child = 1
    }

    if (!itemChild || (itemChild && itemChild.length < 1)) {
      cols[idxCols].column_child = [
        { title: "Nội dung cột con 1", type: NUMBER, unique: 'xqwerty', unit: '' },
        { title: "Nội dung cột con 2", type: STRING, unique: 'zqwerty', unit: '' }
      ]
    }

    setColumnLabel(cols);
  }

  const handleChangeColumnChildLabel = (e, idxCol, idxChil) => {
    e = window.event || e;
    e.preventDefault();
    let columns = [...columnLabel];
    columns[idxCol].column_child[idxChil].title = e.target.value;
    setColumnLabel(columns);
  };

  const addChildColumnLabel = (idxCols) => {
    let title = "";
    let unique = generateRandomCode(6);
    let data = [...columnLabel];
    let type = STRING;
    let unit = '';
    data[idxCols].column_child.push({ title, type, unique, unit });
    setColumnLabel(data);
  };

  const removeChildColumnLabel = (e, idxCols, idxChild) => {
    e = window.event || e;
    e.preventDefault();
    let data = [...columnLabel];

    if (data[idxCols].column_child[idxChild].id) {
      let listColDel = [...listColDelete];
      listColDel.push(data[idxCols].column_child[idxChild].id);
      setListColDelete(listColDel);
    }

    let datafilter = data[idxCols].column_child.filter((_item, idxChil) => {
      if (idxChil !== idxChild) {
        return true;
      }
      return false;
    });

    data[idxCols].column_child = datafilter;
    setColumnLabel(data);
  };

  const onChangeTypeChildCol = (val, idxCol, idxChil) => {
    let cols = [...columnLabel];
    cols[idxCol].column_child[idxChil].type = val;
    setColumnLabel(cols);
  }

  return (
    <>
      {props.isEdit ? (
        <div className='panel-grid-by-column'>
          <div>
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
          <label>Nhãn hàng</label>
          {rowLabel.map((item, idx) => {
            return (<>
              <div key={`$row-${item.unique}`} style={{ marginBottom: '7px' }}>
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
                <div className="row row-select-data" style={{ marginBottom: '20px' }}>
                  <div className="col-md-5">
                    <p className='title-lable title-select-data'> Chọn kiểu dữ liệu hàng</p>
                    <div className='custom-select-width'>
                      <Select
                        defaultValue={item.type || RADIO}
                        onChange={val => onChangeTypeRow(val, idx)}
                        style={{ width: '20%', marginRight: '105px' }}
                      >
                        {TYPE_GRID_ROW_COL.map((subIT, idx) => {
                          return <Option style={{ textAlign: 'center' }} key={`type-${item.value}`} value={subIT.value || 'Chọn kiểu nhập'}>{subIT.type}</Option>
                        })}
                      </Select>
                    </div>
                  </div>
                  <div className="col-md-5" style={{ paddingRight: '42px' }}>
                    <p className='title-lable title-select-data'> Nhập đơn vị (nếu có)</p>
                    <Input onChange={e => handleChangeUnitRow(e, idx)} defaultValue={item.unit} style={{ width: '100%', marginRight: '15px', height: '40px' }} />
                  </div>
                </div>
              </div></>
            );
          })}

          <label style={{ marginLeft: '15px' }}>Nhãn cột</label>

          {columnLabel.map((item, idx) => {
            return (
              <>
                <div key={`$col-${item.unique}`} style={{ marginBottom: '7px', marginTop: '5px' }}>
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
                {/* <div><Checkbox onClick={e => onChangeHasChildYN(idx, item.column_child)} checked={item.is_has_child ? true : false} />Cột có cột con?</div> */}
                {item.is_has_child === 1 &&
                  <div>
                    {item.column_child && item.column_child.length &&
                      item.column_child.map((subItem, subIdx) => {
                        return <div key={`child-cols-${idx}-${subItem.unique}-${subItem.id || ''}`}>
                          {idx + 1}.{subIdx + 1}. <Input
                            style={{ width: "80%", marginRight: "10px" }}
                            defaultValue={subItem.title}
                            onChange={(e) => handleChangeColumnChildLabel(e, idx, subIdx)}
                          />
                          <>
                            <AddCircleOutline
                              style={{ cursor: "pointer" }}
                              onClick={(e) => addChildColumnLabel(idx)}
                            />
                            {columnLabel[idx].column_child.length > 1 && (
                              <RemoveCircleOutline
                                style={{ cursor: "pointer" }}
                                onClick={(e) => removeChildColumnLabel(e, idx, subIdx)}
                              />
                            )}
                          </>
                        </div>
                      })}
                  </div>
                }
              </>
            );
          })}

          <div><Checkbox onClick={e => onHandleChangeOther(e.target.value)} checked={isHasOther ? true : false} /> Câu hỏi có dạng khác?</div>
          {isHasOther ? <Input
            style={{ width: "80%", marginRight: "10px" }}
            // defaultValue={props.item.title || ''}
            onChange={(e) => onHandleTitleOther(e.target.value)}
            placeholder='Nhập tiêu đề momg muốn'
            defaultValue={questionOther.other_title || ''}
          /> : null}

          <div style={{ marginTop: "10px", marginLeft: '15px' }}>
            <Button
              style={{ marginRight: '5px ' }}
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
        </div>
      ) : (
          <>
            <p className='title-question'>Câu {props.stt + 1}. {title}</p>
            <div onClick={editHandle} style={{ cursor: "pointer" }}>
              <table className="table-width-view">
                <thead>
                  <tr>
                    {/* <th key={i} className='td-table-create-question th-table-question-view'>{e.title}</th>; */}
                    <td className='td-table-create-question th-table-question-view'>{props.item.title_table || pre_title_table}</td>
                    {columnLabel.map((e, i) => {
                      if (e.is_has_child) {
                        return <td style={{ padding: '0px' }} colSpan={e.column_child.length}>
                          <div style={{ borderBottom: "1px solid #cccccc" }}>
                            {e.title}
                            <div style={{ display: "flex" }}>
                              {e.column_child && e.column_child.length && e.column_child.map((childItem, idx) => {
                                return <td style={{ wordBreak: "break-word", width: `${100 / e.column_child.length}%` }} key={`col-view-${idx}`} >{childItem.title}</td>
                              })}
                            </div>
                          </div>
                        </td>
                      } else {
                        return <td key={`col-view-${i}`} >{e.title}</td>;
                      }
                    })}
                    {props.item.isHasOther === 1 && <th className='td-table-create-question th-table-question-view'>{props.item.question_other &&
                      props.item.question_other.other_title ? `${props.item.question_other.other_title}` : 'Ý kiến khác'}</th>}
                  </tr>
                </thead>
                <tbody>
                  {rowLabel.map((item, i) => {
                    return (
                      <tr key={i}>
                        <td className='td-table-create-question'>{item.title} {item.unit ? `(${item.unit})` : ""} </td>
                        {columnLabel.map((sub, i) => {
                          if (sub.is_has_child) {
                            return <td colSpan={sub.column_child.length}>
                              <div style={{ display: "flex" }}>
                                {sub.column_child.map((childItem, idx) => {
                                  return (
                                    <td style={{ width: `${100 / sub.column_child.length}%` }}>{renderColByType(sub.type)}</td>
                                  )
                                })}
                              </div>
                            </td>
                          } else {
                            return (
                              <td colSpan={sub.column_child} style={{ borderRight: "1px solid #cccccc" }} key={`row-view-${i}`}>
                                {renderColByType(sub.type)}
                              </td>
                            );
                          }
                        })}
                        {props.item.isHasOther === 1 && <td style={{ margin: 'auto', textAlign: 'center', border: 'solid', borderWidth: 'thin' }}>
                          {renderColByType(1)}
                        </td>}
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

export default GridByRow;
