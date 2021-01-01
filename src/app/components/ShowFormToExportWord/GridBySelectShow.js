import React, { Fragment } from "react";
import { Checkbox, Input, Radio } from "antd";
import { STRING, NUMBER, CHECKBOX, RADIO } from '../../config/common/TypeOfInput';


const GridBySelectShowExport = (props) => {
    const { title, question_columns, question_row, title_table } = props.data;

    const renderColByType = (type) => {
        switch (type) {
            case STRING:
                return
            case NUMBER:
                return
            case CHECKBOX:
                return (
                    <table
                        style={{
                            width: "20px",
                            border: "1px solid black",
                            borderCollapse: "collapse",
                        }}
                    >
                        <tr>
                            <td style={{ height: "15px" }}></td>
                        </tr>
                    </table>
                )
            case RADIO:
                return (
                    <table
                        style={{
                            width: "20px",
                            border: "1px solid black",
                            borderCollapse: "collapse",
                        }}
                    >
                        <tr>
                            <td style={{ height: "15px" }}></td>
                        </tr>
                    </table>
                )
            default:
                break;
        }
    }

    return (
        <>
            <Fragment key={`view-grid-select-${props.item.id}-${props.item.unique}`}>
                <div >
                    <h6 className="question-title">
                        {props.index + 1}.{title}
                    </h6>
                    <table>
                        <thead>
                            <tr className="border-table">
                                <th>{title_table}</th>
                                {question_columns.map((e, i) => {
                                    return <th key={i}>{e.title} {e.unit ? `(${e.unit})` : ""}</th>;
                                })}
                                {/* {props.data.isHasOther === 1 && <th>{props.data.question_other &&
                                    props.data.question_other.other_title ? `Ý kiến khác: (${props.data.question_other.other_title})` : 'Ý kiến khác'}</th>} */}
                            </tr>
                        </thead>
                        <tbody>
                            {question_row.map((item, i) => {
                                return (
                                    <tr key={i} className="border-table">
                                        <td>{item.title}</td>
                                        {question_columns.map((sub, i) => {
                                            return (
                                                <td key={i} style={{ margin: 'auto', textAlign: 'center', border: 'solid', borderWidth: 'thin' }}>
                                                    {renderColByType(sub.type)}
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
                                    {question_columns.map((sub, i) => {
                                        return (<td style={{ margin: 'auto', textAlign: 'center', border: 'solid', borderWidth: 'thin' }}>
                                            {renderColByType(1)}
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

export default GridBySelectShowExport;
