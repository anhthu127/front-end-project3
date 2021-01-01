import React, { useEffect, useState } from "react";
import { Input, Select, Spin } from "antd";
import makeRequest from "../../libs/request";
const { Option } = Select;

const Organization = (props) => {
  const [isSearchForm, setIsSearchForm] = useState([]);

  useEffect(() => {
    onSearchSurvey();
  }, []);

  const onSearchSurvey = (value) => {
    setIsSearchForm(true);
    makeRequest("get", `organization/getAllFormByTitle`, {
      title: value,
      limit: 10
    })
      .then(({ data }) => {
        if (data.signal) {
          let listSurveySection = data.data.rows.map((item) => {
            return {
              label: `${item.title}`,
              value: item.id,
            };
          });
          props.onSelectForm(listSurveySection);
        }
        setIsSearchForm(false);
      })
      .catch((err) => {
        setIsSearchForm(false);
        console.log(err);
      });
  }


  const searchSurveySectionById = (id) => {
    props.onLoadFormTemplate(true);
    props.setIdFormTemp(id);
    makeRequest("get", `surveyform/getbyId`, { id })
      .then(({ data }) => {
        if (data.data) {
          let dataObj = data.data;
          dataObj.survey_headers.survey_sections =
            dataObj.survey_headers.survey_sections.sort((a, b) => { return a.index - b.index });

          dataObj.survey_headers.survey_sections = dataObj.survey_headers.survey_sections.map(item => {
            item.questions = item.questions.sort((a, b) => { return a.index - b.index });

            item.questions = item.questions.map(itemQuestion => {
              if (itemQuestion.question_choice && itemQuestion.question_choice.length > 0) {
                itemQuestion.question_choice = itemQuestion.question_choice.sort((a, b) => { return a.index - b.index });
              }
              return itemQuestion;
            });

            item.questions = item.questions.map(itemQuestion => {
              if (itemQuestion.question_columns && itemQuestion.question_columns.length > 0) {
                itemQuestion.question_columns = itemQuestion.question_columns.sort((a, b) => { return a.index - b.index });
              }
              return itemQuestion;
            });

            item.questions = item.questions.map(itemQuestion => {
              if (itemQuestion.question_row && itemQuestion.question_row.length > 0) {
                itemQuestion.question_row = itemQuestion.question_row.sort((a, b) => { return a.index - b.index });
              }
              return itemQuestion;
            });

            return item;
          });

          dataObj.title = "";

          dataObj.survey_sections =
            dataObj.survey_headers.survey_sections;
          dataObj.survey_headers.survey_sections = null;

          let dataForm = { organization: dataObj };

          let position = JSON.parse(dataForm.organization.survey_headers.position);
          dataForm.organization.survey_headers.position = position;
          props.onChangeForm(dataForm);
        }
        props.onLoadFormTemplate(false);
      })
      .catch((err) => {
        props.onLoadFormTemplate(false);
        console.log(err);
      });
  };

  return (
    <>
      <div
        className="tile"
        style={{ paddingTop: "20px" }}
      >
        <div className="row">
          <div className="col-md-1">
            <label>Tiêu đề form</label>
          </div>
          <div className="col-md-11"> <Input
            type="text"
            value={
              props.formHeader.organization && props.formHeader.organization.title
            }
            onChange={(e) => props.onChangeHeaderForm(e.target.value, "title")}
          /></div>

        </div>
      </div>
      {props.isShowOrg &&
        <div
          className="tile"
          style={{ paddingTop: "20px" }}
        >
          <div className="row">
            <div className="col-md-1">
              <label>Chọn form mẫu</label>
            </div>
            <div className="col-md-11">
              <Select
                showSearch
                value={props.idFormTemp ? props.idFormTemp : "Nhập và chọn form mẫu"}
                notFoundContent={
                  isSearchForm ? (
                    <Spin size="small" />
                  ) : (
                      "Không có dữ liệu"
                    )
                }
                filterOption={false}
                onSearch={onSearchSurvey}
                onChange={searchSurveySectionById}
                style={{ width: "100%" }}
              >
                {props.selectForm.map((u) => (
                  <Option
                    key={`child-distri-${u.value}`}
                    value={u.value}
                  >
                    {u.label}
                  </Option>
                ))}
              </Select>
            </div>


          </div>
        </div>
      }
    </>
  );
};

export default Organization;
