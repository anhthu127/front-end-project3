import React, { Fragment } from "react";
import { Checkbox } from "antd";

const MultiChoiceShowExport = (props) => {
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
                <table
                  style={{
                    borderCollapse: "collapse",
                    lineHeight: "2px",
                  }}
                >
                  <tr style={{ height: "5px" }}>
                    <td
                      style={{
                        border: "1px solid black",
                        width: "20px",
                      }}
                    ></td>
                    <td style={{ paddingLeft: "5px" }}>{item.title}</td>
                  </tr>
                  <tr style={{ height: "5px" }}></tr>
                </table>
              </div>
            </>
          );
        })}
      </Fragment>
    </>
  );
};

export default MultiChoiceShowExport;
