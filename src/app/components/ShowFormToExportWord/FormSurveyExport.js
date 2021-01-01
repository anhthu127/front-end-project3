import React from "react";
import { Card } from "antd";
import {
  SINGLE_TEXTBOX,
  COMMENT_BOX,
  GRID_MULTI_CHOICE,
  GRID_SINGLE_CHOICE,
  GRID_SINGLE_TEXT,
  GRID_TEXTBOX,
  GRID_MIX, GRID_SELECT, GRID_BY_COLUMN, GRID_BY_ROW, SINGLE_NUMBER, MULTI_TEXT, HAS_CHILD_QUESTION, MULTI_CHOICE, SINGLE_CHOICE
} from "../../config/common/TypeOfInput";
import { numberToRomanize } from "../../libs/utils";

import CommentBoxShowExport from "./CommentBoxShow";
import GridTexboxShowExport from "./GridTexboxShow";
import SingleTexboxShowExport from "./SingleTexboxShow";
import GridSingleChoiceShowExport from "./GridSingleChoiceShow";
import GridMultiChoiceShowExport from "./GridMultiChoiceShow";
import GridSingleTextShowExport from "./GridSingleTextShow";
import MultiChoiceShowExport from "./MultiChoiceShow";
import SingleChoiceShowExport from "./SingleChoiceShow";
import GridMixShowExport from "./GridMixShow";
import GridBySelectShowExport from "./GridBySelectShow";
import GridByColumnShowExport from "./GridByColumnShow";
import GridByRowShowExport from "./GridByRowShow";
import SingleNumberShowExport from "./SingleNumberShow";
import MultiMixShowExport from "./MultiMixShow";

const FormSurveyExport = (props) => {

  const renderHeader = (pos, idx) => {
    if (pos === 1) {
      return <div key={`export-${idx}`}>
        <h3
          style={{ fontSize: "27px", fontWeight: 600, padding: "15px" }}
        >
          {props.dataDetail &&
            props.dataDetail.organization &&
            props.dataDetail.organization.survey_headers &&
            props.dataDetail.organization.survey_headers.title}
        </h3>
      </div>
    } else if (pos === 2) {
      return <div key={`export-${idx}`}>
        <h3
          style={{
            fontSize: "21px",
            fontWeight: 600,
            fontStyle: "italic",
          }}
        >
          {props.dataDetail &&
            props.dataDetail.organization &&
            props.dataDetail.organization.survey_headers &&
            props.dataDetail.organization.survey_headers.description}
        </h3>
      </div >
    } else if (pos === 3) {
      return <div
        style={{
          width: "100%",
          border: "solid",
          borderWidth: "thin",
          marginTop: "50px",
          padding: "22px",
          marginBottom: "50px",
          fontStyle: "italic",
        }}
        key={`export-${idx}`}
      >
        <div style={{ textAlign: "left", lineHeight: "30px" }}>
          <pre className="instro-pre">
            {props.dataDetail &&
              props.dataDetail.organization &&
              props.dataDetail.organization.survey_headers &&
              props.dataDetail.organization.survey_headers.introduction}
          </pre>
        </div>
      </ div>
    }
  }

  return (
    <>
      {props.dataDetail && (
        <Card>
          <div id="source-html" style={{ display: "none" }}>
            <div className="survey_headers" style={{ textAlign: "center" }}>
              {props.dataDetail && props.dataDetail.organization
                && props.dataDetail.organization.survey_headers
                && props.dataDetail.organization.survey_headers.position
                && props.dataDetail.organization.survey_headers.position.map((item, idx) => {
                  return renderHeader(item.id, idx);
                })}
            </div>
            <div className="survey_sections">
              {props.dataDetail &&
                props.dataDetail.organization &&
                props.dataDetail.organization.survey_sections &&
                props.dataDetail.organization.survey_sections.map((e, idx) => {
                  return (
                    <>
                      <div
                        style={{
                          fontSize: "20px",
                          font: "bold",
                          marginTop: "20px",
                          fontWeight: 700,
                        }}
                        key={idx}
                      >
                        {numberToRomanize(idx + 1)}. {e.title}
                      </div>
                      {e.questions.map((item, i) => {
                        switch (item.input_type_id) {
                          case COMMENT_BOX:
                            return (
                              <div
                                style={{
                                  marginTop: "20px",
                                  paddingBottom: "10px",
                                }}
                                key={item.id}
                              >
                                <CommentBoxShowExport index={i} data={item} />
                              </div>
                            );
                          case GRID_TEXTBOX:
                            return (
                              <div
                                style={{
                                  marginTop: "20px",
                                  paddingBottom: "10px",
                                }}
                                key={item.id}
                              >
                                <GridTexboxShowExport index={i} data={item} />
                              </div>
                            );
                          case SINGLE_TEXTBOX:
                            return (
                              <div
                                style={{
                                  marginTop: "20px",
                                  paddingBottom: "10px",
                                }}
                                key={item.id}
                              >
                                <SingleTexboxShowExport index={i} data={item} />
                              </div>
                            );
                          case GRID_SINGLE_CHOICE:
                            return (
                              <div
                                style={{
                                  marginTop: "20px",
                                  paddingBottom: "10px",
                                }}
                                key={item.id}
                              >
                                <GridSingleChoiceShowExport
                                  index={i}
                                  data={item}
                                />
                              </div>
                            );
                          case GRID_MULTI_CHOICE:
                            return (
                              <div
                                style={{
                                  marginTop: "20px",
                                  paddingBottom: "10px",
                                }}
                                key={item.id}
                              >
                                <GridMultiChoiceShowExport
                                  index={i}
                                  data={item}
                                />
                              </div>
                            );
                          case GRID_SINGLE_TEXT:
                            return (
                              <div
                                style={{
                                  marginTop: "20px",
                                  paddingBottom: "10px",
                                }}
                                key={item.id}
                              >
                                <GridSingleTextShowExport
                                  index={i}
                                  data={item}
                                />
                              </div>
                            );
                          case MULTI_CHOICE:
                            return (
                              <div
                                style={{
                                  marginTop: "20px",
                                  paddingBottom: "10px",
                                }}
                                key={item.id}
                              >
                                <MultiChoiceShowExport index={i} data={item} />
                              </div>
                            );
                          case SINGLE_CHOICE:
                            return (
                              <div
                                style={{
                                  marginTop: "20px",
                                  paddingBottom: "10px",
                                }}
                                key={item.id}
                              >
                                <SingleChoiceShowExport index={i} data={item} />
                              </div>
                            );
                          case GRID_MIX:
                            return (
                              <div
                                style={{
                                  marginTop: "20px",
                                  paddingBottom: "10px",
                                }}
                                key={item.id}
                              >
                                <GridMixShowExport index={i} data={item} />
                              </div>
                            );
                          case SINGLE_NUMBER:
                            return (
                              <div
                                className="question-form-detail"
                                key={item.id}
                              >
                                <SingleNumberShowExport index={i} data={item} />
                              </div>
                            );
                          case GRID_SELECT:
                            return (
                              <div
                                className="question-form-detail"
                                key={item.id}
                              >
                                <GridBySelectShowExport index={i} data={item} />
                              </div>
                            );
                          case GRID_BY_COLUMN:
                            return (
                              <div
                                className="question-form-detail"
                                key={item.id}
                              >
                                <GridByColumnShowExport index={i} data={item} />
                              </div>
                            );
                          case GRID_BY_ROW:
                            return (
                              <div
                                className="question-form-detail"
                                key={item.id}
                              >
                                <GridByRowShowExport index={i} data={item} />
                              </div>
                            );
                          case HAS_CHILD_QUESTION:
                            return (
                              item.question_child.map((quesChil, index) => {
                                switch (quesChil.input_type_id) {
                                  case MULTI_TEXT:
                                    return (
                                      <div
                                        className="question-form-detail"
                                        key={item.id}
                                      >
                                        <MultiMixShowExport index={index} data={item} />
                                      </div>
                                    );
                                  default:
                                    return null;
                                }
                              }
                              )
                            )
                          default:
                            return null;
                        }
                      })}
                      {/* {
                        e.questions.map((item, index) => {
                          item.question_child.map((quesChil, i) => {
                            switch (quesChil.input_type_id) {
                              case MULTI_TEXT:
                                return (
                                  <div
                                    className="question-form-detail"
                                    key={item.id}
                                  >
                                    <MultiMixShowExport index={index} data={item} />
                                  </div>
                                );
                              default:
                                return null;
                            }
                          })
                        })
                      } */}
                    </>
                  );
                })}
            </div>
          </div>
        </Card>
      )}
    </>
  );
};

export default FormSurveyExport;
