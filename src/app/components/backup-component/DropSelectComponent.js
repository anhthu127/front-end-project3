/* eslint-disable no-restricted-imports */
import React, { useEffect, useState } from "react";
import {
	CommentBox,
	SingleTextbox,
	GridSingleChoice,
	GridMultiChoice,
	MultiChoice,
	SingleChoice,
} from "../";
import GridMix from "../GridMix";
import SingleNumber from "../SingleNumber";
import GridSelectDefault from "../GridSelectDefault";
import GridByColumn from "../GridByColumn";
import GridByRow from "../GridByRow";
// import { GRID_BY_COLUMN, GRID_BY_ROW, GRID_SELECT } from "../../config/common/TypeOfInput";
const DropSelectComponent = (props) => {
	const [isEdit, setEdit] = useState(true);
	const [title, setTitle] = useState("");
	const [question_other, setQuestionOther] = useState({});
	let formData = {
		isHasOther: 0,
		title: "Chọn kiểu câu hỏi",
		input_type_id: 1,
		question_other: question_other,
		unique: 'zkakodka'
	}

	useEffect(() => {
		setEdit(true)
		setQuestionOther(props.data.question_other)
	}, [props.type, props.data.question_other]);

	let item = {
		isHasOther: 1,
		question_other: question_other,
		title: "Chọn kiểu câu hỏi",
		input_type_id: 1,
		other_title: "",
		unique: 'zkakodka',
		question_row: ((props.data) ? (props.data.question_row) : ([])),
		question_columns: ((props.data) ? (props.data.question_columns) : ([]))
	}

	const onEdit = () => {
		setEdit(true)
	}
	const onCancel = () => {
		setEdit(false);
	};
	const getDataSection = (value) => {
		(props.isUpdate !== undefined && props.isUpdate === true) ? (props.onSaveWhenUpdate(value)) : (props.onSave(value));
		(value.title) ? (setTitle(value.title)) : (setTitle(""))
		if (value.question_other) {
			if (value.question_other.other_title !== question_other.other_title) {
				setQuestionOther(value.question_other)
			}
		}
	};
	const renderComponent = (type) => {
		switch (type) {
			case 2:
				return (
					<CommentBox
						dataUpdate={props.data}
						item={formData} stt={0} isEdit={isEdit}
						isUpdate={false}
						inQuestion={true}
						getDataSection={getDataSection}
						onCancel={onCancel}
						onEdit={onEdit}
						title={(props.data) ? (props.data.title) : ("")}

					/>
				);
			case 1:
				return (
					<SingleTextbox
						dataUpdate={props.data}
						item={formData} stt={0} isEdit={isEdit}
						isUpdate={false}
						inQuestion={true}
						getDataSection={getDataSection}
						onCancel={onCancel}
						onEdit={onEdit}
						title={(props.data) ? (props.data.title) : ("")}

					/>
				);

			case 5:
				return (
					<GridSingleChoice
						dataUpdate={props.data} item={item} stt={0} isEdit={isEdit}
						isUpdate={false}
						inQuestion={true}
						getDataSection={getDataSection}
						onCancel={onCancel}
						onEdit={onEdit}
						title={props.data ? (props.data.title) : ("")}

					/>
				);
			case 6:
				return (
					<GridMultiChoice
						dataUpdate={props.data} item={item} stt={0} isEdit={isEdit}
						isUpdate={false}
						inQuestion={true}
						getDataSection={getDataSection}
						onCancel={onCancel}
						onEdit={onEdit}
						title={(props.data) ? (props.data.title) : ("")}

					/>
				);
			case 4:
				return (
					<MultiChoice
						dataUpdate={props.data} item={item} stt={0} isEdit={isEdit}
						isUpdate={false}
						inQuestion={true}
						getDataSection={getDataSection}
						onCancel={onCancel}
						onEdit={onEdit}
						title={(props.data) ? (props.data.title) : ("")}

					/>
				);
			case 3:
				return (
					<SingleChoice
						dataUpdate={props.data} item={item} stt={0} isEdit={isEdit}
						isUpdate={false}
						inQuestion={true}
						getDataSection={getDataSection}
						onCancel={onCancel}
						onEdit={onEdit}
						title={(props.data) ? (props.data.title) : ("")}

					/>
				);
			case 9:
				return (
					<GridMix
						dataUpdate={props.data} item={item} stt={0} isEdit={isEdit}
						isUpdate={false}
						inQuestion={true}
						getDataSection={getDataSection}
						onCancel={onCancel}
						onEdit={onEdit}
						title={(props.data) ? (props.data.title) : ("")}

					/>);
			case 10:
				return (
					<SingleNumber
						dataUpdate={props.data} item={item} stt={0} isEdit={isEdit}
						isUpdate={false}
						inQuestion={true}
						getDataSection={getDataSection}
						onCancel={onCancel}
						onEdit={onEdit}
						title={(props.data) ? (props.data.title) : ("")}

					/>);
			case 11:
				return (
					<GridSelectDefault
						dataUpdate={props.data} item={item} stt={0} isEdit={isEdit}
						isUpdate={false}
						inQuestion={true}
						getDataSection={getDataSection}
						onCancel={onCancel}
						onEdit={onEdit}
						title={(props.data) ? (props.data.title) : ("")}

					/>);
			case 12:
				return (
					<GridByColumn
						dataUpdate={props.data} item={item} stt={0} isEdit={isEdit}
						isUpdate={false}
						inQuestion={true}
						getDataSection={getDataSection}
						onCancel={onCancel}
						onEdit={onEdit}
						title={(props.data) ? (props.data.title) : ("")}

					/>);
			case 13:
				return (
					<GridByRow
						dataUpdate={props.data} item={item} stt={0} isEdit={isEdit}
						isUpdate={false}
						inQuestion={true}
						getDataSection={getDataSection}
						onCancel={onCancel}
						onEdit={onEdit}
						title={(props.data) ? (props.data.title) : ("")}

					/>);

			default:
				return;
		}
	};

	return (

		<div>

			<div >
				{renderComponent(props.type)}
			</div>

		</div>);
};

export default DropSelectComponent;
