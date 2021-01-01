import React, { useState, useEffect, Fragment } from "react";
import { Button, Input, Select } from "antd";
import { AddCircleOutline, RemoveCircleOutline } from "@material-ui/icons";
import { HAS_CHILD_QUESTION, MULTI_TEXT, NUMBER, SINGLE_NUMBER, SINGLE_TEXTBOX, STRING, TYPE_MULTI_MIX } from '../config/common/TypeOfInput';
import { generateRandomCode } from '../libs/random';
import { SingleTextbox, SingleNumber, MultiStringNumber } from "./childQuestion/index.js";

const { Option } = Select;

const MultiMix = (props) => {
    const [preTitle, setPreTitle] = useState('');
    const [currentRowLabel, setCurrentRowLabel] = useState([]);
    const [title, setTitle] = useState(props.title);
    const [rowLabel, setRowLabel] = useState();
    const [listDelete, setListDelete] = useState([]);

    const componentDidMount = () => {
        if (props.item && props.item.question_child && props.item.question_child.length) {
            let rowItem = props.item.question_child.map(it => {
                return {
                    id: it.id,
                    title: it.title,
                    unique: it.unique,
                    question_choice: it.question_choice,
                    input_type_id: it.input_type_id,
                    unit: it.unit,
                    parent_id: it.parent_id || '',
                    isEdit: true,
                    index: it.index,
                    type: it.type
                }
            });
            setCurrentRowLabel([...rowItem]);
            setRowLabel([...rowItem]);
        } else {
            setRowLabel([{
                title: title,
                note: "",
                parent_id: props.id || '',
                unique: props.item.unique,
                index: props.idxChild,
                unit: '',
                type: 1,
                isEdit: true,
                input_type_id: MULTI_TEXT, // 4 là dạng multi select....
                question_choice: []
            }]);
            setCurrentRowLabel([{
                title: title,
                note: "",
                parent_id: props.id || '',
                unique: props.item.unique,
                index: props.idxChild,
                type: 1,
                isEdit: true,
                input_type_id: MULTI_TEXT, // 4 là dạng multi select....
                question_choice: [],
                unit: ''
            }]);
        }
    }

    useEffect(componentDidMount, [props.isEdit]);

    let objMultiChoice = {
        id: props.id || '',
        title: title,
        note: "",
        parent_id: 0,
        have_child: false,
        unique: props.item.unique || '',
        index: props.idxQues || 0,
        type: 1, //1 là bình thường, 2 là mẫu
        input_type_id: HAS_CHILD_QUESTION, // 4 là dạng multi select....
        question_child: [],
        question_other: {}
    };

    const handleChange = (e) => {
        e = window.event || e;
        e.preventDefault();
        setPreTitle(e.target.value);
    };

    const addRowLabel = () => {
        let unique = generateRandomCode(6);
        let data = [...rowLabel];
        data.push({
            title: "Tiêu đề câu hỏi",
            note: "",
            input_type_id: 1,
            unique,
            unit: '',
            isEdit: false,
            question_choice: []
        });
        setRowLabel(data);
    };

    const removeRowLabel = (e, idx) => {
        e.preventDefault();
        let data = [...rowLabel];
        if (data[idx].id) {
            let delItem = data[idx].id;
            let listDel = [...listDelete];
            listDel.push(delItem);
            setListDelete(listDel);
        }
        let datafilter = data.filter((_item, index) => {
            if (index !== idx) {
                return true;
            }
            return false;
        });
        setRowLabel(datafilter);
    };

    const onClickSave = (e) => {
        e = window.event || e;
        e.preventDefault();
        objMultiChoice.question_child = [];
        setCurrentRowLabel([...rowLabel]);
        rowLabel.forEach((e, i) => {
            let question = e;
            question.index = i;
            objMultiChoice.question_child.push(question);
        });

        if (preTitle !== "") {
            setTitle(preTitle);
            objMultiChoice.title = preTitle;
        }
        objMultiChoice.delete_choices = listDelete;

        props.onCancel();
        props.getDataSection(objMultiChoice);
    };

    const editHandle = (e) => {
        e = window.event || e;
        e.stopPropagation();
        props.onEdit();
    };

    const onClickCancel = (e) => {
        e = window.event || e;
        e.preventDefault();
        setRowLabel(currentRowLabel);
        props.onCancel();
    };

    const onChangeTypeRow = (val, idx) => {
        let rows = [...rowLabel];
        rows[idx].input_type_id = val;
        setRowLabel(rows);
    }

    const onEdit = (idx) => {
        let listObj = [...rowLabel];
        listObj[idx].isEdit = true;
        setRowLabel(listObj);
    }

    const onCancel = (idx) => {
        let listObj = [...rowLabel];
        listObj[idx].isEdit = false;
        setRowLabel(listObj);
    }

    const onSaveChildQuestion = (data, idx) => {
        let listObj = [...rowLabel];
        listObj[idx] = data;
        listObj[idx].isEdit = false;
        setRowLabel(listObj);
    }

    const changeTypeWhileSave = (type, idx) => {
        let listObj = [...rowLabel];
        listObj[idx].input_type_id = type;
        setRowLabel(listObj);
    }

    const renderQuesChildByType = (item, type_id, idx) => {
        switch (type_id) {
            case SINGLE_TEXTBOX:
                return (
                    <Fragment key={`create-single-text-${props.item.id}-${props.item.unique}`}>
                        <SingleTextbox
                            onEdit={onEdit}
                            title={item.title}
                            item={item}
                            onCancel={onCancel}
                            isEdit={item.isEdit}
                            id={item.id || ''}
                            getDataSection={onSaveChildQuestion}
                            stt={props.idxQues}
                            type={STRING}
                            changeTypeWhileSave={changeTypeWhileSave}
                            isUpdate={props.isUpdate || false}
                            idxChild={idx}
                        />
                    </Fragment>
                );
            case SINGLE_NUMBER:
                return (
                    <Fragment key={`create-single-num-${props.item.id}-${props.item.unique}`}>
                        <SingleNumber
                            onEdit={onEdit}
                            title={item.title}
                            item={item}
                            onCancel={onCancel}
                            isEdit={item.isEdit}
                            id={item.id || ''}
                            getDataSection={onSaveChildQuestion}
                            stt={props.idxQues}
                            type={NUMBER}
                            changeTypeWhileSave={changeTypeWhileSave}
                            isUpdate={props.isUpdate || false}
                            idxChild={idx}
                        />
                    </Fragment>
                );
            case MULTI_TEXT:
                return (
                    <Fragment key={`create-multi-string-${props.item.id}-${props.item.unique}`}>
                        <MultiStringNumber
                            onEdit={onEdit}
                            title={item.title}
                            item={item}
                            onCancel={onCancel}
                            isEdit={item.isEdit}
                            id={item.id || ''}
                            getDataSection={onSaveChildQuestion}
                            stt={props.idxQues}
                            // type={MULTI_TEXT}
                            changeTypeWhileSave={changeTypeWhileSave}
                            isUpdate={props.isUpdate || false}
                            idxChild={idx}
                        />
                    </Fragment>
                );
            default:
                break;
        }
    }

    return (
        <>
            {props.isEdit ? (
                <div key={`multi-choice-${props.item.unique}-${props.item.id}`}>
                    <div style={{ marginTop: '5px' }}>
                        <p className="title-lable"> Điền nội dung câu hỏi</p>
                        <Input
                            style={{ marginBottom: "10px", height: '38px' }}
                            type="text"
                            onChange={handleChange}
                            defaultValue={title}
                        />
                    </div>
                    {rowLabel && rowLabel.map((item, idx) => {
                        return (<>
                            <div key={`$child-ques-${item.unique}-${item.id}`} >
                                <div style={{ marginBottom: '7px' }}>
                                    {renderQuesChildByType(item, item.input_type_id, idx)}
                                </div>
                            </div >
                            <div style={{ margin: 'auto', textAlign: 'right' }} className="custom-Select-antd">
                                <div className="row row-select-data" style={{ paddingLeft: '0px' }}>
                                    <div className="col-md-12">
                                        <p className="title-lable title-select-data" style={{paddingTop:"5px"}}> Chọn kiểu câu hỏi hàng</p>
                                        <div className='custom-select-width'>
                                            <Select
                                                defaultValue={item.input_type_id || SINGLE_TEXTBOX}
                                                onChange={val => onChangeTypeRow(val, idx)}
                                            >
                                                {TYPE_MULTI_MIX.map((subIT, idx) => {
                                                    return <Option style={{ textAlign: 'center' }} key={`type-multi-${subIT.id}`} value={subIT.id || 'Chọn kiểu nhập'}>{subIT.type}</Option>
                                                })}
                                            </Select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <AddCircleOutline
                                style={{ cursor: "pointer" }}
                                onClick={addRowLabel}
                            />
                            {rowLabel.length > 1 && (
                                <RemoveCircleOutline
                                    style={{ cursor: "pointer", color: 'red' }}
                                    onClick={(e) => removeRowLabel(e, idx)}
                                />
                            )}
                        </>
                        );
                    })}
                    <div style={{ paddingTop: "20px", paddingLeft: '15px' }}>
                        <div style={{ marginTop: "10px" }}>
                            <Button
                                style={{ marginRight: '5px' }}
                                size="small"
                                onClick={onClickCancel}
                            >
                                Hủy bỏ
                            </Button>
                            <Button
                                type="primary"
                                size="small"
                                onClick={onClickSave}>
                                Lưu câu hỏi
                            </Button>
                        </div>
                    </div>
                </div>
            ) : (
                    <div key={`multi-choice-${props.item.unique}-${props.item.id}`}>
                        <p className='title-question'>Câu {props.stt + 1}. {title}</p>
                        <div onClick={editHandle} style={{ cursor: "pointer" }}>
                            {props.item && props.item.question_child && props.item.question_child.map((item, i) => {
                                return (
                                    <>
                                   
                                        {renderQuesChildByType(item, item.input_type_id, i)}
                                    </>
                                );
                            })}

                            {props.item.isHasOther === 1 && <div style={{ marginBottom: '7px' }}>
                                {props.item.question_other &&
                                    props.item.question_other.other_title ? `${props.item.question_other.other_title}` : 'Ý kiến khác: '}
                                <Input style={{ marginRight: '8px' }} />
                            </div>}
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default MultiMix;
