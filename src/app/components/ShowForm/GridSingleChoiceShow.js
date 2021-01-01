import React, { Fragment, useState, useEffect } from "react";
import { Radio, Input } from "antd";
import './ShowForm.scss';

const GridSingleChoiceShow = (props) => {
  const { title, question_columns, question_row, title_table } = props.data;
  const [answer, setAnswer] = useState([]);

  const componentDidMount = () => {
    let answerDefault = [];
    question_row.forEach(row => {
      question_columns.forEach((col) => {
        answerDefault.push({
          row_id: row.id,
          column_id: col.id,
          value: false
        });
      });
    });

    setAnswer([...answerDefault]);
  }

  useEffect(componentDidMount, []);

  const onChange = (e, answerItem) => {
    let ansewerChange = answer.map(item => {
      if (item.column_id === answerItem.column_id) {
        item.value = false;
        if (item.row_id === answerItem.row_id) {
          item.value = e.target.checked;
        }
      }
      return item;
    });
    setAnswer([...ansewerChange]);
    props.onChange(answerItem);
  }

  return (
    <>
      <Fragment key={`key-grid-single-${props.data.id}-${props.data.unique}`}>
        <div className="custom-table">
          <h6 className="question-title">
            {props.index + 1}.{title}
          </h6>
          <table>
            <thead>
              <tr className="border-table">
                <th>STT</th>
                <th>{title_table}</th>
                {question_columns.map((e, i) => {
                  return <th key={i}>{e.title} </th>;
                })}
                {/* {props.data.isHasOther === 1 && <th className='td-table-create-question th-table-question-view'>{props.data.question_other &&
                  props.data.question_other.other_title ? `Ý kiến khác: (${props.data.question_other.other_title})` : 'Ý kiến khác'}</th>} */}
              </tr>
            </thead>
            <tbody>
              {question_row.map((rowItem, indexRow) => {
                return (
                  <tr key={indexRow} className="border-table">
                    <td >{indexRow + 1}</td>
                    <td >{rowItem.title}</td>
                    {question_columns.map((columnItem, indexCol) => {
                      let answerItem = answer.find(item => {
                        if (item.row_id === rowItem.id && item.column_id === columnItem.id) {
                          return true;
                        }
                        return false;
                      });
                      return (
                        <td key={indexCol}>
                          <Radio disabled={!props.isEnable} checked={answerItem && answerItem.value ? true : false}
                            onChange={(e) => onChange(e, answerItem)} />
                        </td>
                      );
                    })}
                    {/* {props.data.isHasOther === 1 && <td>
                      <Input disabled={!props.isEnable} />
                    </td>} */}
                  </tr>
                );
              })}
              {props.data.isHasOther === 1 && question_columns && <>
                {props.data.isHasOther === 1 && <tr className='border-table'>
                  <td >{question_columns.length + 1}</td>
                  <td>{props.data.question_other &&
                    props.data.question_other.other_title ? `${props.data.question_other.other_title}` : 'Ý kiến khác'}
                  </td>
                  {question_columns.map((sub, i) => {
                    return (<td style={{ margin: 'auto', textAlign: 'center', border: 'solid', borderWidth: 'thin' }}>
                      <Input disabled={!props.isEnable} />
                    </td>
                    );
                  })}
                </tr>}
              </>}
            </tbody>
          </table>
        </div>
      </Fragment>
    </>
  );
};

export default GridSingleChoiceShow;
