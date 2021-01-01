import React, { Fragment } from "react";
import { Input } from "antd";
import './ShowForm.scss';

const GridSingleTextShow = (props) => {
  const { title, question_columns, question_row, question_other, title_table } = props.data;
  return (
    <>
      <Fragment key={`view-grid-single-text-${props.data.id}-${props.data.unique}`}>
        <div className="custom-table">
          <h6 className="question-title">
            {props.index + 1}.{title}
          </h6>
          <table>
            <thead>
              <tr className="border-table">
                <th>{title_table}</th>
                {question_columns.map((e, i) => {
                  return <th key={i}>{e.title}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {question_row.map((item, i) => {
                return (
                  <tr key={i} className="border-table">
                    <td>{item.title}</td>
                    {question_columns.map((sub, i) => {
                      return (
                        <td key={i}>
                          <Input disabled={!props.isEnable} />
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
              <tr className="border-table">
                <td>{question_other.other_title ? question_other.other_title : 'Ý kiến khác'}</td>
                {
                  question_columns.map((item, index) => {
                    return (
                      <td key={index}>
                        <Input disabled />
                      </td>
                    );
                  })
                }
              </tr>

            </tbody>
          </table>
        </div>
      </Fragment>
    </>
  );
};

export default GridSingleTextShow;
