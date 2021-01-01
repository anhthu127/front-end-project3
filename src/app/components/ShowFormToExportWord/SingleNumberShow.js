import React, { Fragment } from "react";
import { InputNumber } from "antd";


const SingleNumberShowExport = (props) => {

  return (
    <>
      <Fragment>
        <h6 className="question-title">
          {props.index + 1}.{props.data.title}
        </h6>
        <table
          style={{
            width: "80%",
            marginRight: "10px",
            border: "1px solid black",
            borderCollapse: "collapse",
          }}
        >
          <tr>
            <td style={{ height: "30px" }}></td>
          </tr>
        </table> {props.data.unit ? `Đơn vị(${props.data.unit})` : ""}
      </Fragment>
    </>
  );
};

export default SingleNumberShowExport;
