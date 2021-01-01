import React, { Fragment } from "react";
import { STRING, SINGLE_TEXTBOX, SINGLE_NUMBER, MULTI_TEXT } from '../../config/common/TypeOfInput';

const MultiMixShowExport = (props) => {
    const { title, question_child } = props.data;

    const renderRowByType = (rowItem, idx) => {
        switch (rowItem.input_type_id) {
            case SINGLE_TEXTBOX:
                return <>
                    <h6 style={{ fontWeight: 700, paddingBottom: "10px", fontSize: "14px" }}>
                        {props.index + 1}.{idx + 1}. {rowItem.title}
                    </h6>
                    <table
                        style={{
                            width: "100%",
                            border: "1px solid black",
                            borderCollapse: "collapse",
                        }}
                    >
                        <tr>
                            <td style={{ height: "30px" }}></td>
                        </tr>
                    </table>
                </>
            case SINGLE_NUMBER:
                return <>
                    <h6 style={{ fontWeight: 700, paddingBottom: "10px", fontSize: "14px" }}>
                        {props.index + 1}.{idx + 1}. {rowItem.title}
                    </h6>
                    <table
                        style={{
                            width: "80%",
                            marginRight: "10px",
                            border: "1px solid black",
                            borderCollapse: "collapse",
                        }}
                    >
                        <tr>
                            <td style={{ height: "30px" }}></td>
                        </tr>
                    </table> {rowItem.unit ? `Đơn vị(${rowItem.unit})` : ""}
                </>
            case MULTI_TEXT:
                return <>
                    <h6 style={{ fontWeight: 700, paddingBottom: "10px", fontSize: "14px" }}>
                        {props.index + 1}.{idx + 1}. {rowItem.title}
                    </h6>
                    {rowItem.question_choise && rowItem.question_choise.length &&
                        rowItem.question_choise.map((item, i) => {
                            return <>
                                {item.title}
                                <table
                                    style={{
                                        width: "100%",
                                        marginRight: "10px",
                                        border: "1px solid black",
                                        borderCollapse: "collapse",
                                    }}
                                >
                                    <tr>
                                        <td style={{ height: "30px" }}></td>
                                    </tr>
                                </table> {item.unit ? `Đơn vị(${item.unit})` : ""}
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
                <div style={{
                    borderCollapse: "collapse",
                    width: "100%"
                }}>
                    <h6 style={{ fontWeight: 700, paddingBottom: "10px", fontSize: "17px" }}>
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

export default MultiMixShowExport;
