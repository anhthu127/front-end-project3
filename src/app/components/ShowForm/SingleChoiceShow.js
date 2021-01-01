import React, { Fragment, useState, useEffect } from "react";
import { Radio, Input, InputNumber } from "antd";
import {
  STRING,
  RADIO
} from "../../config/common/TypeOfInput";

import './ShowForm.scss';

const SingleChoiceShow = (props) => {
  const { title, question_choice } = props.data;
  const [value, setValue] = useState(null);
  const [valueOther, setValueOther] = useState('');

  const componentDidMount = () => {
    if(!props.optionAns) {
      return;
    }

    if(props.data.question_other) {
      setValue(null);
      let otherItem = props.optionAns.find(item => item.option.question_other_id === props.data.question_other.id);
      console.log('33333333333333333333333333', otherItem);
      if(otherItem) {
        setValueOther(otherItem.answer_text);
      }
      return;
    }
    setValueOther('');
    props.optionAns.forEach(item => {
      if(item.answer.answer_yn) {
        console.log('888888888888888888888888888', item.option);
        console.log('2222222222222222222',props.data.question_choice);
        console.log('0000000000000000000000000', props.data);
        let itemChoice = question_choice.find(itemchoice => {
          return itemchoice.id === item.option.question_choice_id;
        });
        console.log('444444444444444444444', itemChoice);
        setValue(itemChoice.id);
      }
    });
  };
  useEffect(componentDidMount, []);

  const onChange = (e) => {
    setValue(e.target.value);
    setValueOther('');
    props.onChange(e.target.value, RADIO);
  }

  const onChangeValueText = (e) => {
    setValue(null);
    setValueOther(e.target.value);
    props.onChange(e.target.value, STRING);
  }

  return (
    <>
      <Fragment key={`view-grid-single-choice-${props.data.id}-${props.data.unique}`}>
        <h6 className="question-title">
          {props.index + 1}.{title}
        </h6>
        <Radio.Group onChange={(e) => onChange(e)} value={value}>
          {question_choice.map((item, index) => {
            return (
              <div key={`${item.id}-${index}`}>
                <Radio disabled={!props.isEnable} key={`${item.id}-${index}`}
                  value={item.id}> {item.title} </Radio>
              </div>
            );
          })}
        </Radio.Group>
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
            // <p key={`show-note-${idx}-${it.id}`}
            //   className="fontSize12">-{it.title} <p>............................................................ {it.unit ? <b className="font-size-12">đơn vị ({it.unit})</b> : ''}</p></p>
          })}
        </div>}
        {props.data.isHasOther === 1 && <div style={{ marginBottom: '7px' }}>
          {props.data.question_other &&
            props.data.question_other.other_title ? `${props.data.question_other.other_title}` : 'Ý kiến khác: '}
          <Input disabled={!props.isEnable} value={valueOther} onChange={(e) => onChangeValueText(e)} />
        </div>}
      </Fragment>
    </>
  );
};

export default SingleChoiceShow;
