/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-imports */
import React, { useEffect, useState } from "react";
import { Button } from "antd";
import './question.scss'
import "../surveySection/SurveySection.scss"
import {
  TYPE_OF_INPUT,
  SINGLE_TEXTBOX,
  COMMENT_BOX,
  GRID_MULTI_CHOICE,
  GRID_SINGLE_CHOICE,
  GRID_SINGLE_TEXT,
  GRID_TEXTBOX,
  MULTI_CHOICE,
  SINGLE_CHOICE,
  GRID_MIX,
  SINGLE_NUMBER, GRID_SELECT, GRID_BY_COLUMN, GRID_BY_ROW, MULTI_TEXT, HAS_CHILD_QUESTION
} from "../../config/common/TypeOfInput";
import {
  CommentBox,
  GridTextbox,
  SingleTextbox,
  GridSingleChoice,
  GridMultiChoice,
  GridSingleText,
  MultiChoice,
  SingleChoice,
  SelectTypeQuestion,
} from "../";
import GridMix from "../GridMix";
import SingleNumber from "../SingleNumber";
import GridSelectDefault from "../GridSelectDefault";
import GridByColumn from "../GridByColumn";
import GridByRow from "../GridByRow";
import MultiMix from "../MultiMix";

const TypeQuestion = TYPE_OF_INPUT;

const Question = (props) => {
  const [typeId, setTypeId] = useState(1);
  const [isEdit, setEdit] = useState(false);
  const [hin, setHidden] = useState("beforeMouseHover")
  const [color, setColor] = useState("white")

  useEffect(() => {
    setTypeId(props.type);
  }, [props.type]);

  const onEdit = () => {
    setEdit(true);
    handleHover(false, true)
  };

  const onCancel = () => {
    setEdit(false);
    handleHover(false, false)
  };

  const getDataSection = (value) => {
    props.getDataQuestion(value, props.idxQues);
  };

  const MouseOut = () => {
    let edit = isEdit
    handleHover(false, edit)
  }
  const onHover = () => {
    let edit = isEdit
    handleHover(true, edit)
  }

  const removeQuestion = (idx) => {

    props.removeQuestion(idx);
  };

  const renderComponent = (type) => {
    switch (type) {
      case COMMENT_BOX:
        return (
          <CommentBox
            removeQuestion={removeQuestion}
            title={props.title}
            item={props.item}
            onCancel={onCancel}
            isEdit={isEdit}
            id={props.id}
            getDataSection={getDataSection}
            stt={props.idxQues}
            type={COMMENT_BOX}
            changeTypeWhileSave={changeTypeWhileSave}
          />
        );
      case GRID_TEXTBOX:
        return (
          <GridTextbox
            onEdit={onEdit}
            title={props.title}
            item={props.item}
            onCancel={onCancel}
            isEdit={isEdit}
            id={props.id}
            getDataSection={getDataSection}
            stt={props.idxQues}
            type={GRID_TEXTBOX}
            changeTypeWhileSave={changeTypeWhileSave}
            isUpdate={props.isUpdate || false}
          />
        );
      case SINGLE_TEXTBOX:
        return (
          <SingleTextbox
            onEdit={onEdit}
            title={props.title}
            item={props.item}
            onCancel={onCancel}
            isEdit={isEdit}
            id={props.id}
            getDataSection={getDataSection}
            stt={props.idxQues}
            type={SINGLE_TEXTBOX}
            changeTypeWhileSave={changeTypeWhileSave}
            isUpdate={props.isUpdate || false}
          />
        );
      case SINGLE_NUMBER:
        return (
          <SingleNumber
            onEdit={onEdit}
            title={props.title}
            item={props.item}
            onCancel={onCancel}
            isEdit={isEdit}
            id={props.id}
            getDataSection={getDataSection}
            stt={props.idxQues}
            type={SINGLE_NUMBER}
            changeTypeWhileSave={changeTypeWhileSave}
            isUpdate={props.isUpdate || false}
          />
        );
      case GRID_SINGLE_CHOICE:
        return (
          <GridSingleChoice
            onEdit={onEdit}
            title={props.title}
            item={props.item}
            onCancel={onCancel}
            isEdit={isEdit}
            id={props.id}
            getDataSection={getDataSection}
            stt={props.idxQues}
            type={GRID_SINGLE_CHOICE}
            changeTypeWhileSave={changeTypeWhileSave}
            isUpdate={props.isUpdate || false}
          />
        );
      case GRID_MULTI_CHOICE:
        return (
          <GridMultiChoice
            onEdit={onEdit}
            title={props.title}
            onCancel={onCancel}
            item={props.item}
            isEdit={isEdit}
            id={props.id}
            getDataSection={getDataSection}
            stt={props.idxQues}
            type={GRID_MULTI_CHOICE}
            changeTypeWhileSave={changeTypeWhileSave}
            isUpdate={props.isUpdate || false}
          />
        );
      case GRID_SINGLE_TEXT:
        return (
          <GridSingleText
            onEdit={onEdit}
            item={props.item}
            title={props.title}
            onCancel={onCancel}
            isEdit={isEdit}
            id={props.id}
            getDataSection={getDataSection}
            stt={props.idxQues}
            type={GRID_SINGLE_TEXT}
            changeTypeWhileSave={changeTypeWhileSave}
            isUpdate={props.isUpdate || false}
          />
        );
      case MULTI_CHOICE:
        return (
          <MultiChoice
            onEdit={onEdit}
            title={props.title}
            onCancel={onCancel}
            item={props.item}
            isEdit={isEdit}
            id={props.id}
            getDataSection={getDataSection}
            stt={props.idxQues}
            type={MULTI_CHOICE}
            changeTypeWhileSave={changeTypeWhileSave}
            isUpdate={props.isUpdate || false}
          />
        );
      case SINGLE_CHOICE:
        return (
          <SingleChoice
            onEdit={onEdit}
            title={props.title}
            item={props.item}
            onCancel={onCancel}
            isEdit={isEdit}
            id={props.id}
            getDataSection={getDataSection}
            stt={props.idxQues}
            type={SINGLE_CHOICE}
            changeTypeWhileSave={changeTypeWhileSave}
            isUpdate={props.isUpdate || false}
          />
        );
      case GRID_MIX:
        return (
          <GridMix
            onEdit={onEdit}
            title={props.title}
            item={props.item}
            onCancel={onCancel}
            isEdit={isEdit}
            id={props.id}
            getDataSection={getDataSection}
            stt={props.idxQues}
            type={GRID_MIX}
            changeTypeWhileSave={changeTypeWhileSave}
            isUpdate={props.isUpdate || false}
          />
        );
      case GRID_SELECT:
        return (
          <GridSelectDefault
            onEdit={onEdit}
            title={props.title}
            item={props.item}
            onCancel={onCancel}
            isEdit={isEdit}
            id={props.id}
            getDataSection={getDataSection}
            stt={props.idxQues}
            type={GRID_SELECT}
            changeTypeWhileSave={changeTypeWhileSave}
            isUpdate={props.isUpdate || false}
          />
        );
      case GRID_BY_COLUMN:
        return (
          <GridByColumn
            onEdit={onEdit}
            title={props.title}
            item={props.item}
            onCancel={onCancel}
            isEdit={isEdit}
            id={props.id}
            getDataSection={getDataSection}
            stt={props.idxQues}
            type={GRID_BY_COLUMN}
            changeTypeWhileSave={changeTypeWhileSave}
            isUpdate={props.isUpdate || false}
          />
        );
      case GRID_BY_ROW:
        return (
          <GridByRow
            onEdit={onEdit}
            title={props.title}
            item={props.item}
            onCancel={onCancel}
            isEdit={isEdit}
            id={props.id}
            getDataSection={getDataSection}
            stt={props.idxQues}
            type={GRID_BY_ROW}
            changeTypeWhileSave={changeTypeWhileSave}
            isUpdate={props.isUpdate || false}
          />
        );
      case HAS_CHILD_QUESTION:
        return (
          <MultiMix
            onEdit={onEdit}
            title={props.title}
            item={props.item}
            onCancel={onCancel}
            isEdit={isEdit}
            id={props.id}
            getDataSection={getDataSection}
            stt={props.idxQues}
            type={HAS_CHILD_QUESTION}
            changeTypeWhileSave={changeTypeWhileSave}
            isUpdate={props.isUpdate || false}
          />
        );
      default:
        return;
    }
  };

  const onChangeType = (value) => {
    setTypeId(value);
  };

  const changeTypeWhileSave = () => {
    props.onChangeTypeQues(typeId, props.idxQues);

  }
  const handleHover = (value, edit) => {
    if ((value === false && edit === true) || (value === true && edit === true)) {
      setColor("color")
      setHidden("beforeMouseHover")
    }
    if (edit === false && value === true) {
      setColor("color")
      setHidden("MouseHover")
    }
    if (edit === false && value === false) {
      setColor("white")
      setHidden("beforeMouseHover")
    }

  }

  const onUpQuestion = (e, idx) => {
    e = window.event || e;
    e.preventDefault();
    props.onMoveUpQuestion(idx);
  }

  const onDownQuestion = (e, idx) => {
    e = window.event || e;
    e.preventDefault();
    props.onMoveDownQuestion(idx);
  }

  return (
    <div className={color} key={`ques-key-node-${props.idxQues}-${props.item.unique}-${props.item.id}`}>
      <div onMouseOver={onHover} onMouseLeave={MouseOut} className="div-panel-question">
        {isEdit && <p className='title-question'>Câu {props.idxQues + 1}</p>}
        <div className="row" id="isHover">
          <SelectTypeQuestion
            onChangeType={onChangeType}
            isEdit={isEdit}
            TypeQuestion={TypeQuestion}
            typeSelect={typeId}
          />

          <div className="col-md-12" key={`ques-key-${props.idxQues}-${props.item.unique}-${props.item.id}`}>
            {renderComponent(typeId)}
          </div>

          <div className={hin}>
            <Button className="hover-edit"
              onClick={onEdit}
            >Chỉnh sửa</Button>
            <Button className="hover-move-up" onClick={e => onUpQuestion(e, props.idxQues)}>Lên</Button>
            <Button className="hover-move-down" onClick={e => onDownQuestion(e, props.idxQues)}>Xuống</Button>
            {props.quesLength > 1 &&
              <Button
                className="hover-delete"
                onClick={() => removeQuestion(props.idxQues)}
              >Xóa</Button>}
          </div>

          {/* <div className="col-md-12" style={{ marginTop: '15px' }}>
            <SelectTypeQuestion
              onChangeType={onChangeType}
              isEdit={isEdit}
              TypeQuestion={TypeQuestion}
              typeSelect={typeId}
            />
          </div> */}
        </div>
        {/* <div style={{ width: "100%", height: "20px" }}></div> */}
      </div>
    </div>
  );
};

export default Question;
