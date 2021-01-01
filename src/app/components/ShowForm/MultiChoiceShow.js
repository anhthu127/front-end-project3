import React, { Fragment } from "react";
import { Checkbox, Input, InputNumber } from "antd";
import './ShowForm.scss';

const MultiChoiceShow = (props) => {
  const { title, question_choice } = props.data;

  const onChange = (e, choiceId) => {
    props.onChange(e.target.checked, choiceId);
  }

  return (
    <>
      <Fragment key={`view-grid-multi-choice-${props.data.id}-${props.data.unique}`}>
        <h6 className="question-title">
          {props.index + 1}.{title}
        </h6>
        {question_choice.map((item, i) => {
          return (
            <div key={`${item.id}-${i}`}>
              <Checkbox disabled={!props.isEnable}
                onChange={(e) => onChange(e, item.id)} /> {item.title}
            </div>
          );
        })}
        {props.data.isHasChild === 1 && <div style={{ marginBottom: '7px' }}>
          <p className="titleNote">{props.data.title_note}:</p>
          {props.data.row_child.map((it, idx) => {
            return <>
              {it.title}
              {
                <><InputNumber className="width-100-per" />{it.unit ? <div className="text-align-right">
                  <p className="title-lable">đơn vị ({it.unit}) </p>
                </div> : ''}</>
              }
            </>
          })}
        </div>}
        {props.data.isHasOther === 1 && <div style={{ marginBottom: '7px' }}>
          {props.data.question_other &&
            props.data.question_other.other_title ? `${props.data.question_other.other_title}` : 'Ý kiến khác: '}
          <Input disabled={!props.isEnable} />
        </div>}
      </Fragment>
    </>
  );
};

export default MultiChoiceShow;
