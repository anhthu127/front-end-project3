import React, { Fragment } from "react";
import { Input, InputNumber } from "antd";
import { STRING, SINGLE_TEXTBOX, SINGLE_NUMBER, MULTI_TEXT } from '../../config/common/TypeOfInput';
import './ShowForm.scss';

const MultiMixShow = (props) => {
    const { title, question_child } = props.data;

    const renderRowByType = (rowItem, idx) => {
        switch (rowItem.input_type_id) {
            case SINGLE_TEXTBOX:
                return <>
                    <h6>
                        {props.index + 1}.{idx + 1}. {rowItem.title}
                    </h6>
                    <Input />
                </>
            case SINGLE_NUMBER:
                return <>
                    <h6>
                        {props.index + 1}.{idx + 1}. {rowItem.title}
                    </h6>
                    <InputNumber className="width-100-per" /> {rowItem.unit ? <div className="text-align-right">
                        <p className="title-lable">đơn vị ({rowItem.unit}) </p>
                    </div> : ''}
                </>
            case MULTI_TEXT:
                return <>
                    <h6>
                        {props.index + 1}.{idx + 1}. {rowItem.title}
                    </h6>
                    {rowItem.question_choice && rowItem.question_choice.length > 0 &&
                        rowItem.question_choice.map((item, i) => {
                            return <>
                                {item.title}
                                {(item.type === STRING && <Input />) || <><InputNumber className="width-100-per" />{item.unit ? <div className="text-align-right">
                                    <p className="title-lable">đơn vị ({item.unit}) </p>
                                </div> : ''}</>}
                            </>
                        })
                    }</>
            default:
                break;
        }
    }

    return (
        <>
            <Fragment key={`key-grid-mix-${props.data && props.data.id}-${props.data && props.data.unique}`}>
                <div className="custom-table">
                    <h6 className="question-title">
                        {props.index + 1}.{title}
                    </h6>
                    {question_child.map((item, idx) => {
                        return (
                            <div key={`multi-text-number-show-${idx}-${item.id}`}>
                                {renderRowByType(item, idx)}
                            </div>
                        );
                    })}
                </div>
            </Fragment>
        </>
    );
};

export default MultiMixShow;
