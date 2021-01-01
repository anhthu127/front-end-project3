import React, { Fragment } from "react";
import { Radio } from "antd";

const SingleChoiceShowExport = (props) => {
  const { title, question_choice } = props.data;
  return (
    <>
      <Fragment>
        <h6
          style={{ fontWeight: 700, paddingBottom: "10px", fontSize: "17px" }}
        >
          {props.index + 1}.{title}
        </h6>
        {question_choice.map((item, i) => {
          return (
            <>
              <div key={i}>
                <table style={{
                  borderCollapse: "collapse",
                  lineHeight: "2px",
                }}>
                  <tr>
                    <td>
                      <table
                        style={{
                          borderCollapse: "collapse",
                          lineHeight: "2px",
                          width: "20px",
                        }}
                      >
                        <tr style={{ height: "5px" }}>
                          <td
                            style={{
                              border: "1px solid black",
                              width: "20px",
                              height: "15px"
                            }}
                          ></td>
                        </tr>
                        <tr style={{ height: "5px" }}></tr>
                      </table>
                    </td>
                    <td>
                      <table
                        style={{
                          borderCollapse: "collapse",
                          lineHeight: "2px",
                        }}
                      >
                        <tr style={{ height: "5px" }}>
                          <td style={{ paddingLeft: "5px" }}>{item.title}</td>
                        </tr>
                        <tr style={{ height: "5px" }}></tr>
                      </table>
                    </td>
                  </tr>
                </table>

              </div>
            </>
          );
        })}
        {props.data.isHasOther === 1 && <div style={{ marginBottom: '7px' }}>
          {props.data.question_other &&
            props.data.question_other.other_title ? `${props.data.question_other.other_title}` : 'Ý kiến khác: '}
          <table
            style={{
              width: "100%",
              marginRight: "10px",
              border: "1px solid black",
              borderCollapse: "collapse",
            }}
          >
            <tr>
              <td style={{ height: "30px" }}></td>
            </tr>
          </table>
        </div>}

      </Fragment>
    </>
  );
};

export default SingleChoiceShowExport;
