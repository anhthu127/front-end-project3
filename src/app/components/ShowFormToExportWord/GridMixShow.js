import React, { Fragment } from "react";
import { STRING, NUMBER, CHECKBOX, RADIO } from '../../config/common/TypeOfInput';
const GridMixShowExport = (props) => {
  const { title, question_columns, question_row, title_table } = props.data;

  const renderColByType = (columnItem, rowItem) => {
    switch (columnItem.type) {
      case STRING:
        return
      case NUMBER:
        return
      case CHECKBOX:
        return (
          <table
            style={{
              width: "20px",
              border: "1px solid black",
              borderCollapse: "collapse",
            }}
          >
            <tr>
              <td style={{ height: "15px" }}></td>
            </tr>
          </table>
        )
      case RADIO:
        return (
          <table
            style={{
              width: "20px",
              border: "1px solid black",
              borderCollapse: "collapse",
            }}
          >
            <tr>
              <td style={{ height: "15px" }}></td>
            </tr>
          </table>
        )
      default:
        break;
    }
  }

  const renderColOther = (columnItem) => {
    switch (columnItem.type) {
      case STRING:
        return
      case NUMBER:
        return
      case CHECKBOX:
        return (
          <table
            style={{
              width: "20px",
              border: "1px solid black",
              borderCollapse: "collapse",
            }}
          >
            <tr>
              <td style={{ height: "15px" }}></td>
            </tr>
          </table>
        )
      case RADIO:
        return (
          <table
            style={{
              width: "20px",
              border: "1px solid black",
              borderCollapse: "collapse",
            }}
          >
            <tr>
              <td style={{ height: "15px" }}></td>
            </tr>
          </table>
        )
      default:
        break;
    }
  }

  return (
    <>
      <Fragment key={`view-grid-mix-${props.item.id}-${props.item.unique}`}>
        <div className="custom-table">
          <h6 style={{ fontWeight: 700, paddingBottom: "10px", fontSize: "17px" }}>
            {props.index + 1}.{title}
          </h6>
          <table style={{
            fontFamily: "arial, sans-serif",
            borderCollapse: "collapse",
            width: "100%"
          }} >
            <thead>
              <tr className="border-table">
                <th style={{
                  border: "1px solid #f0f0f0 ",
                  textAlign: "center ",
                  padding: "8px ",
                  borderWidth: "thin",
                }}>{title_table}</th>
                {question_columns.map((e, i) => {
                  return <th key={i}>{e.title} {e.unit ? `(${e.unit})` : ""} </th>;
                })}
                {/* {props.data.isHasOther === 1 && <th>{props.data.question_other &&
                                    props.data.question_other.other_title ? `Ý kiến khác: (${props.data.question_other.other_title})` : 'Ý kiến khác'}</th>} */}
              </tr>
            </thead>
            <tbody>
              {question_row.map((rowItem, i) => {
                return (
                  <tr key={i} className="border-table">
                    <td style={{
                      border: "1px solid #f0f0f0 ",
                      textAlign: "left",
                      padding: "8px ",
                      borderWidth: "thin",
                    }}>{rowItem.title}</td>
                    {question_columns.map((columnItem, i) => {
                      return (
                        <td key={i} style={{ margin: 'auto', textAlign: 'center', border: "1px solid #f0f0f0 ", borderWidth: 'thin' }}>
                          {renderColByType(columnItem, rowItem)}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
              {props.data.isHasOther === 1 && question_columns && <>
                {props.data.isHasOther === 1 && <tr className='border-table'>
                  <td style={{
                    border: "1px solid #f0f0f0 ",
                    textAlign: "left",
                    padding: "8px ",
                    borderWidth: "thin",
                  }}>{props.data.question_other &&
                    props.data.question_other.other_title ? `${props.data.question_other.other_title}` : 'Ý kiến khác'}
                  </td>
                  {question_columns.map((columnItem, i) => {
                    return (<td style={{ margin: 'auto', textAlign: 'center', border: "1px solid #f0f0f0 ", borderWidth: 'thin' }}>
                      {renderColOther(columnItem)}
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

export default GridMixShowExport;
