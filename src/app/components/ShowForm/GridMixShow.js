import React, { Fragment } from "react";
import { Checkbox, Input, Radio, InputNumber } from "antd";
import { STRING, NUMBER, CHECKBOX, RADIO } from '../../config/common/TypeOfInput';
import './ShowForm.scss';

const GridMixShow = (props) => {
    const { title, question_columns, question_row, title_table } = props.data;

    const renderColByType = (columnItem, rowItem) => {
        switch (columnItem.type) {
            case STRING:
                return <Input />
            case NUMBER:
                return <InputNumber />
            case CHECKBOX:
                return <Checkbox />
            case RADIO:
                return <Radio />
            default:
                break;
        }
    }

    const renderColOther = (columnItem) => {
        switch (columnItem.type) {
            case STRING:
                return <Input />
            case NUMBER:
                return <InputNumber />
            case CHECKBOX:
                return <Checkbox />
            case RADIO:
                return <Radio />
            default:
                break;
        }
    }

    return (
        <>
            <Fragment key={`key-grid-mix-${props.data.id}-${props.data.unique}`}>
                <div className="custom-table">
                    <h6 className="question-title">
                        {props.index + 1}.{title}
                    </h6>
                    <table>
                        <thead>
                            <tr className="border-table">
                                <th>{title_table}</th>
                                {question_columns.map((e, i) => {
                                    return <th key={i}>{e.title} {e.unit ? `(${e.unit})` : ""} </th>;
                                })}
                                {/* {props.data.isHasOther === 1 && <th>{props.data.question_other &&
                                    props.data.question_other.other_title ? `Ý kiến khác: (${props.data.question_other.other_title})` : 'Ý kiến khác'}</th>} */}
                            </tr>
                        </thead>
                        <tbody>
                            {question_row.map((rowItem, i) => {
                                return (
                                    <tr key={i} className="border-table">
                                        <td>{rowItem.title}</td>
                                        {question_columns.map((columnItem, i) => {
                                            return (
                                                <td key={i} style={{ margin: 'auto', textAlign: 'center', border: 'solid', borderWidth: 'thin' }}>
                                                    {renderColByType(columnItem, rowItem)}
                                                </td>
                                            );
                                        })}
                                        {/* {props.data.isHasOther === 1 && <td style={{ margin: 'auto', textAlign: 'center', border: 'solid', borderWidth: 'thin' }}>
                                            <Input disabled={!props.isEnable} />
                                        </td>} */}
                                    </tr>
                                );
                            })}
                            {props.data.isHasOther === 1 && question_columns && <>
                                {props.data.isHasOther === 1 && <tr className='border-table'>
                                    <td>{props.data.question_other &&
                                        props.data.question_other.other_title ? `${props.data.question_other.other_title}` : 'Ý kiến khác'}
                                    </td>
                                    {question_columns.map((columnItem, i) => {
                                        return (<td style={{ margin: 'auto', textAlign: 'center', border: 'solid', borderWidth: 'thin' }}>
                                            {renderColOther(columnItem)}
                                        </td>
                                        );
                                    })}
                                </tr>}
                            </>}
                        </tbody>
                    </table>
                </div>
            </Fragment>
        </>
    );
};

export default GridMixShow;
