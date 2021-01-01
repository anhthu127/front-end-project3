import React, { Fragment, useState, useEffect } from "react";
import { Question } from "../../components/questions";
import { Input, Button, Select, Spin, Modal, Card } from "antd";
import "./SurveySection.scss"
import { numberToRomanize } from "../../libs/utils";
import ShowDetailSection from "../../pages/survey-sections/ShowDetailSection";
import { showErrorMessage } from "../../actions/notification";
import makeRequest from "../../libs/request";
const { Option } = Select;

let draggedQuestion;

const SurveySection = (props) => {
  const [isEdit, setEdit] = useState(false);
  const [title, setTitle] = useState("");
  const [data, setData] = useState([]);
  const [isHover, setIsHover] = useState(false)
  const [isAddQuestion, setAddQuestion] = useState(false);
  const [showAddQuestion, setShowAddQuestion] = useState(false)
  const [valueSearch, setValueSearch] = useState();
  const [isSearchForm, setIsSearchForm] = useState(false);
  const [selectQuestion, setSelectQuestion] = useState([]);
  const [dataSelectQuestion, setDataQuestion] = useState()

  const onDragStart = (e, idx) => {
    e = window.event || e;
    draggedQuestion = data[idx];
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target.childNode);
  };

  const onDragOver = (idx) => {
    const draggedOverItem = data[idx];
    if (draggedOverItem === draggedQuestion) {
      return;
    }

    let items = data.filter((it) => it !== draggedQuestion);
    items.splice(idx, 0, draggedQuestion);
    props.saveQuestionSurveySection(props.idxSection, items);
    setData(items);
  };

  const onDragEnd = (e) => {
    draggedQuestion = null;
  };

  const componentDidMount = () => {
    setTitle(props.surveySection.title);
    setData(props.surveySection.questions);
  };

  useEffect(() => {
    componentDidMount();
    onSearchQuestion();
  }, [props.surveySection.questions]);

  const getDataQuestion = (value, key) => {
    props.saveQuestion(value, props.idxSection, key);
  };

  const addQuestion = () => {
    props.addQuestion(props.idxSection);
  };

  const onChangeTypeQues = (value, idxQues) => {
    props.onChangeTypeQues(value, props.idxSection, idxQues);
  };

  const onEdit = () => {
    setEdit(true);
  };
  const onClickSelect = () => {

  }
  const onCancel = () => {
    setEdit(false);
  };
  const MouseOut = () => {
    setIsHover(false)
  }
  const onHover = () => {
    setIsHover(true)
  }

  const onChangeTitle = (e) => {
    e = window.event || e;
    e.preventDefault();
    setTitle(e.target.value);
  };

  const onSave = (e) => {
    e = window.event || e;
    e.preventDefault();
    props.onChangeSurveyTitle(title, props.idxSection);
    setEdit(false);
  };

  const removeQuestion = (idx) => {
    props.removeQuestion(idx, props.idxSection);
  };

  const removeSurveysection = (idxSection) => {
    props.removeSurveysection(idxSection);
  };

  const onMoveUpQuestion = (idx) => {
    if (idx === 0) return;
    let objTemp = data[idx];

    data[idx] = data[idx - 1];
    data[idx - 1] = objTemp;
    props.saveQuestionSurveySection(props.idxSection, data);
    setData(data);
  };

  const onMoveDownQuestion = (idx) => {
    if (idx >= data.length - 1) return;
    let objTemp = data[idx];

    data[idx] = data[idx + 1];
    data[idx + 1] = objTemp;
    props.saveQuestionSurveySection(props.idxSection, data);
    setData(data);
  };

  const onMoveDownSection = (e, idx) => {
    e = window.event || e;
    e.preventDefault();
    props.onMoveDownSection(idx);
  }

  const onMoveUpSection = (e, idx) => {
    e = window.event || e;
    e.preventDefault();
    props.onMoveUpSection(idx);
  }

  const onSearchQuestion = (value) => {
    setIsSearchForm(true);
    setValueSearch(value)
    makeRequest("get", `question/getAllQuestionBytitle`, {
      title: value,
      limit: 10
    })
      .then(({ data }) => {
        if (data.signal) {
          let listQuestion = data.data.rows.map((item) => {
            return {
              label: `${item.title}`,
              value: item.id,
            };
          });
          setSelectQuestion(listQuestion);
        }
        setIsSearchForm(false);
      })
      .catch((err) => {
        setIsSearchForm(false);
        console.log(err);
      });
  }
  const searchQuestionById = (idQuestion) => {
    makeRequest("get", `question/getById`, {
      id: idQuestion,
    })
      .then(({ data }) => {
        if (data.data) {
          setValueSearch(data.data.title)
          let detailObj = { questions: data.data };
          detailObj.questions.id = "";
          detailObj.questions.code = "";
          if (detailObj.questions.question_choice) {
            detailObj.questions.question_choice.map((e) => {
              e.id = "";
              e.question_id = "";
              e.code = "";
            })
          }
          if (detailObj.questions.question_option) {
            detailObj.questions.question_option.map(e => {
              e.id = ""
              e.code = ""
              e.question_id = ""
              e.question_row_id = ""
              e.question_column_id = ""
              e.question_choice_id = ""
              e.question_other_id = ""
            })
          }
          if (detailObj.questions.question_row) {
            detailObj.questions.question_row.map(e => {
              e.id = ""
              e.code = ""
              e.question_id = ""
            })
          }
          if (detailObj.questions.question_columns) {
            detailObj.questions.question_columns.map(e => {
              e.id = ""
              e.code = ""
              e.question_id = ""
            })
          }
          detailObj.questions.question_choice.sort((a, b) =>
            a.index > b.index ? 1 : -1
          );
          detailObj.questions.question_columns.sort(function (
            a,
            b
          ) {
            return a.speed - b.speed;
          });
          detailObj.questions.question_row.sort((a, b) =>
            a.index > b.index ? 1 : -1
          );
          setDataQuestion(detailObj);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const onClicklModal = (type) => {
    switch (type) {
      case "ok":
        if (dataSelectQuestion) {
          props.addQuestionTemp(props.idxSection, dataSelectQuestion.questions)
          setValueSearch();
          setDataQuestion();
          setShowAddQuestion(false);
        } else {
          showErrorMessage('Chưa chọn form mẫu');
        }

        break
      case "cancel":
        setValueSearch()
        setShowAddQuestion(false);
        break
      default:
        setShowAddQuestion(false);
        setValueSearch()
    }
    setShowAddQuestion(false);
  }

  const addQuestionTemp = () => {
    setAddQuestion(true);
    setShowAddQuestion(true);
  }

  return (
    <>
      <Fragment>
        {isEdit ? (
          <Fragment>
            <div className="col-md-12 bg-section-edit">
              <div className="panel-content-edit-section">
                <p
                  style={{
                    fontSize: "20px",
                    marginTop: "10px",
                    marginBottom: "10px",
                    fontWeight: 600,
                  }}
                > {numberToRomanize(props.idxSection + 1)}. </p>
                <p className="title-lable"> Điền nội dung đề mục</p>
                <Input
                  onChange={onChangeTitle}
                  defaultValue={props.surveySection.title}
                  className="col-md-12"
                />
              </div>
              <div>
                <Button
                  style={{ marginRight: "5px" }}
                  size="small"
                  onClick={onCancel}
                >
                  Hủy bỏ
                </Button>
                <Button type="primary" size="small" onClick={(e) => onSave(e)}>
                  Lưu câu hỏi
                </Button>
              </div>
            </div>
          </Fragment>
        ) : (
            <Fragment >
              <div className="panel-header-sections" onMouseOver={onHover} onMouseLeave={MouseOut}>
                <div onClick={onEdit} className="col-md-12 header-sections">
                  {numberToRomanize(props.idxSection + 1)}.{" "}
                  {props.surveySection.title}
                </div>

                <div className={isHover ? "MouseHover group-button-header" : "beforeMouseHover group-button-header"}>

                  <Button className="hover-move-down"
                    style={{ flexGrow: "1" }}
                    onClick={e => onMoveDownSection(e, props.idxSection)}
                  >
                    Chọn đề mục mẫu
                    </Button>
                  <Button className="hover-edit" style={{ flexGrow: "1" }}
                    onClick={onEdit}
                  >Chỉnh sửa</Button>
                  <Button className="hover-move-up"
                    style={{ flexGrow: "1" }}
                    onClick={e => onMoveUpSection(e, props.idxSection)} >
                    Lên
                    </Button>
                  <Button className="hover-move-down"
                    style={{ flexGrow: "1" }}
                    onClick={e => onMoveDownSection(e, props.idxSection)}
                  >
                    Xuống
                    </Button>
                  {props.sectionLength > 1 &&
                    <Button danger className="hover-delete" style={{ flexGrow: "1" }}
                      onClick={() => removeSurveysection(props.idxSection)}
                    >Xóa</Button>}
                </div>
              </div>
            </Fragment>
          )}
        <div className="col-md-12">
          <div className="row" style={{ paddingBottom: "10px" }}>
            {data.map((item, idx) => {
              return (
                <div
                  className="col-md-12"
                  draggable={true}
                  onDragOver={(e) => onDragOver(idx)}
                  onDragStart={(e) => onDragStart(e, idx)}
                  onDragEnd={(e) => onDragEnd(e)}
                  key={`div-ques-${(item && item.id) ? item.id : ''}-${(item && item.unique) ? item.unique : ''}`}>
                  <Question
                    getDataQuestion={getDataQuestion}
                    removeQuestion={removeQuestion}
                    type={item.input_type_id}
                    item={item}
                    title={item.title}
                    id={item.id}
                    key={idx}
                    idxQues={idx}
                    onChangeTypeQues={onChangeTypeQues}
                    isUpdate={props.isUpdate || false}
                    quesLength={data.length}
                    onMoveUpQuestion={onMoveUpQuestion}
                    onMoveDownQuestion={onMoveDownQuestion}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {
          isAddQuestion ? (
            <Modal
              title="Tìm kiếm đề mục mẫu"
              visible={showAddQuestion}
              width="280mm"
              onOk={() => onClicklModal("ok")}
              onCancel={() => onClicklModal("cancel")}
              className="modal-model-detail-form"
            >
              <Card style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                <Select
                  showSearch
                  value={valueSearch ? valueSearch : "Nhập và chọn đề mục mẫu"}
                  notFoundContent={
                    isSearchForm ? (
                      <Spin size="small" />
                    ) : (
                        "Không có dữ liệu"
                      )
                  }
                  filterOption={false}
                  onSearch={onSearchQuestion}
                  onChange={searchQuestionById}
                  style={{ width: "100%" }}
                >
                  {selectQuestion.map((u) => (
                    <Option
                      key={`child-distri-${u.value}`}
                      value={u.value}
                    >
                      {u.label}
                    </Option>
                  ))}
                </Select>
                {dataSelectQuestion ? (
                  <ShowDetailSection dataDetail={dataSelectQuestion} />
                ) : <div style={{ height: '400px' }}></div>}
              </Card>
            </Modal>
          ) : ""
        }

        <div className="col-md-12">
          <Button
            onClick={addQuestion}
            style={{
              margin: "10px",
              marginLeft: "0px",
              height: "35px",
              marginBottom: "10px",
            }}
            type="primary"
          >
            Thêm câu hỏi
          </Button>
          <Button
            onClick={addQuestionTemp}
            style={{
              margin: "10px",
              marginLeft: "0px",
              height: "35px",
              marginBottom: "10px",
            }}
            type="primary"
          >
            Thêm câu hỏi mẫu
          </Button>
        </div>
      </Fragment>
    </>
  );
};

export default SurveySection;
