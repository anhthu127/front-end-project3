import React from "react";
import { Select } from "antd";
import './SelectTypeQuestion.scss';

const { Option } = Select;

const TitleQuestion = (props) => {
  return (
    <>
      {props.isEdit ? (
        <div className="panel-select-type-question" style={{ width: "100%", paddingRight: "10px" }}>
          <p className="title-lable">Chọn kiểu câu hỏi</p>
          <Select
            value={props.typeSelect}
            onChange={props.onChangeType}
            style={{ width: "100%" }}
            defaultValue={"Chọn kiểu câu hỏi"}
          >
            {props.TypeQuestion &&
              props.TypeQuestion.map((u) => {
                return (
                  <Option key={`child-distri-${u.id}`} value={u.id}>
                    {u.type}
                  </Option>
                );
              })}
          </Select>
        </div>
      ) : null}
    </>
  );
};

export default TitleQuestion;
