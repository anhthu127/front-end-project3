import React, { useEffect, useState } from "react";
import { Card } from "antd";

import CommentBoxShow from "../../components/ShowForm/CommentBoxShow";
import GridSingleChoiceShow from "../../components/ShowForm/GridSingleChoiceShow";
import GridSingleTextShow from "../../components/ShowForm/GridSingleTextShow";
import GridTexboxShow from "../../components/ShowForm/GridTexboxShow";
import MultiChoiceShow from "../../components/ShowForm/MultiChoiceShow";
import SingleChoiceShow from "../../components/ShowForm/SingleChoiceShow";
import SingleTexboxShow from "../../components/ShowForm/SingleTexboxShow";
import SingleNumberShow from "../../components/ShowForm/SingleNumberShow";
import GridMultiChoiceShow from "../../components/ShowForm/GridMultiChoiceShow";
import GridBySelectShow from "../../components/ShowForm/GridBySelectShow";
import GridByColumnShow from "../../components/ShowForm/GridByColumnShow";
import GridByRowShow from "../../components/ShowForm/GridByRowShow";
import GridMixShow from "../../components/ShowForm/GridMixShow";

import {
  SINGLE_TEXTBOX,
  COMMENT_BOX,
  GRID_MULTI_CHOICE,
  GRID_SINGLE_CHOICE,
  GRID_SINGLE_TEXT,
  GRID_TEXTBOX,
  MULTI_CHOICE,
  SINGLE_CHOICE,
  GRID_MIX, SINGLE_NUMBER, GRID_SELECT, GRID_BY_COLUMN, GRID_BY_ROW
} from "../../config/common/TypeOfInput";

import { numberToRomanize } from "../../libs/utils";

import "../form/table.css";
import "../form/ShowFormSurvey.scss";
import "../form-detail/FormAnswer.scss";

const ShowFormAnswer = (props) => {
  const [organization, setOrganization] = useState(null);
  const [listOptions, setListOptions] = useState(null);
  const [listAnswers, setListAnswers] = useState(null);
  const componentDidMount = () => {
    setListOptions(props.dataDetail ? props.dataDetail.listOptions : null);
    setListAnswers(props.dataDetail ? props.dataDetail.listAnswers : null)
    setOrganization(props.dataDetail ? props.dataDetail.organization : null);
  }
  useEffect(componentDidMount, []);

  const renderHeader = (pos, idx) => {
    if (pos === 1) {
      return <div key={`header-${idx}`}>
        <h3 className="title-form">{props.dataDetail && props.dataDetail.organization
          && props.dataDetail.organization.survey_headers
          && props.dataDetail.organization.survey_headers.title}</h3>
      </div>
    } else if (pos === 2) {
      return <div key={`header-${idx}`}>
        <h3 className="name-of-topic">{props.dataDetail && props.dataDetail.organization
          && props.dataDetail.organization.survey_headers
          && props.dataDetail.organization.survey_headers.description}</h3>
      </div>
    } else if (pos === 3) {
      return <div className="instro-of-form" key={`header-${idx}`}>
        <div className="instro-content" >
          <pre className="instro-pre">{props.dataDetail && props.dataDetail.organization
            && props.dataDetail.organization.survey_headers
            && props.dataDetail.organization.survey_headers.introduction}</pre>
        </div>
      </div>
    }
  }

  return (
    <>
      {props.dataDetail && organization && (
        <Card>
          <div>
            <div className="org_head survey_headers">
              {props.dataDetail && organization && listAnswers && listOptions
                && organization.survey_headers
                && organization.survey_headers.position
                && organization.survey_headers.position.map((item, idx) => {
                  return renderHeader(item.id, idx);
                })}
            </div>
            <div className="survey_sections">
              {
                organization.survey_sections &&
                organization.survey_sections.map((e, idx) => {
                  return (
                    <div key={`${idx}-${e.id}`}>
                      <div
                        style={{
                          fontSize: "20px",
                          font: "bold",
                          marginTop: "20px",
                          fontWeight: 700,
                        }}
                      >
                        {numberToRomanize(idx + 1)}. {e.title}
                      </div>
                      {e.questions.map((item, i) => {
                        switch (item.input_type_id) {
                          case COMMENT_BOX:
                            let valueCommentBox = listOptions.find(itemOp => {
                              if (itemOp.question_id === item.id) {
                                return true;
                              }
                              return false;
                            });
                            let answerCommentBox = {};
                            if (valueCommentBox) {
                              answerCommentBox = listAnswers.find(itemAns => {
                                if (valueCommentBox.id === itemAns.question_option_id) {
                                  return true;
                                }
                                return false;
                              });
                            }
                            return (
                              <div
                                className="question-form-detail"
                                key={item.id}
                              >
                                <CommentBoxShow index={i} data={item} value={answerCommentBox.answer_text} />
                              </div>
                            );
                          case SINGLE_TEXTBOX:
                            let valueSingleText = listOptions.find(itemOp => {
                              if (itemOp.question_id === item.id) {
                                return true;
                              }
                              return false;
                            });
                            let answerSingleText = {};
                            if (valueSingleText) {
                              answerSingleText = listAnswers.find(itemAns => {
                                if (valueSingleText.id === itemAns.question_option_id) {
                                  return true;
                                }
                                return false;
                              });
                            }
                            return (
                              <div
                                className="question-form-detail"
                                key={item.id}
                              >
                                <SingleTexboxShow index={i} data={item} value={answerSingleText.answer_text} />
                              </div>
                            );
                          case SINGLE_NUMBER:
                            let valueSingleNumber = listOptions.find(itemOp => {
                              if (itemOp.question_id === item.id) {
                                return true;
                              }
                              return false;
                            });

                            let answerSingleNumber = {};
                            if (valueSingleNumber) {
                              answerSingleNumber = listAnswers.find(itemAns => {
                                if (valueSingleNumber.id === itemAns.question_option_id) {
                                  return true;
                                }
                                return false;
                              });
                            }
                            return (
                              <div
                                className="question-form-detail"
                                key={item.id}
                              >
                                <SingleNumberShow index={i} data={item} value={answerSingleNumber.answer_numeric} />
                              </div>
                            );
                          case SINGLE_CHOICE:
                            let listSignleChoiceOp = listOptions.filter(itemOp => {
                              if (itemOp.question_id === item.id) {
                                return true;
                              }
                              return false;
                            });

                            var listOptionAnswers = [];
                            if(listSignleChoiceOp) {
                              listOptionAnswers = listSignleChoiceOp.map(itemOp => {
                                //listOptionAnswers.push
                                let itemAns = listAnswers.find(itemAnsTemp => {
                                  return itemAnsTemp.question_option_id === itemOp.id;
                                });
                                return {
                                  option: itemOp,
                                  answer: itemAns
                                };
                              });
                            } 
                            return (
                              <div
                                className="question-form-detail"
                                key={item.id}
                              >
                                <SingleChoiceShow index={i} data={item} optionAns={listOptionAnswers}/>
                              </div>
                            );
                          case MULTI_CHOICE:
                            return (
                              <div
                                className="question-form-detail"
                                key={item.id}
                              >
                                <MultiChoiceShow index={i} data={item} />
                              </div>
                            );
                          case GRID_TEXTBOX:
                            return (
                              <div
                                className="question-form-detail"
                                key={item.id}
                              >
                                <GridTexboxShow index={i} data={item} />
                              </div>
                            );
                          case GRID_SINGLE_CHOICE:
                            return (
                              <div
                                className="question-form-detail"
                                key={item.id}
                              >
                                <GridSingleChoiceShow index={i} data={item} />
                              </div>
                            );
                          case GRID_MULTI_CHOICE:
                            return (
                              <div
                                className="question-form-detail"
                                key={item.id}
                              >
                                <GridMultiChoiceShow index={i} data={item} />
                              </div>
                            );
                          case GRID_SINGLE_TEXT:
                            return (
                              <div
                                className="question-form-detail"
                                key={item.id}
                              >
                                <GridSingleTextShow index={i} data={item} />
                              </div>
                            );
                          case GRID_MIX:
                            return (
                              <div
                                className="question-form-detail"
                                key={item.id}
                              >
                                <GridMixShow index={i} data={item} />
                              </div>
                            );
                          case GRID_SELECT:
                            return (
                              <div
                                className="question-form-detail"
                                key={item.id}
                              >
                                <GridBySelectShow index={i} data={item} />
                              </div>
                            );
                          case GRID_BY_COLUMN:
                            return (
                              <div
                                className="question-form-detail"
                                key={item.id}
                              >
                                <GridByColumnShow index={i} data={item} />
                              </div>
                            );
                          case GRID_BY_ROW:
                            return (
                              <div
                                className="question-form-detail"
                                key={item.id}
                              >
                                <GridByRowShow index={i} data={item} />
                              </div>
                            );
                          default:
                            return null;
                        }
                      })}
                    </div>
                  );
                })}
            </div>
          </div>
        </Card>
      )}

    </>
  );
};

export default ShowFormAnswer;
