import { Button, DatePicker, Image, Input, Radio } from 'antd'
import React, { useState } from 'react'
import { Form, FormGroup, FormText } from 'reactstrap';
import { dateFormat } from '../../Utils/constants';
import moment from 'moment';
import { showErrorMessage, showSuccessMessage } from '../../Utils/notification';
import MakeRequest from '../../Utils/MakeRequest';
import { ValidToken } from '../../Utils/CheckToken';

function CreateDirector(props) {
    const { TextArea } = Input;

    const [directorInfo, setInfo] = useState({
        name: '',
        dob: '',
        description: ''
    })
    const [isLoading, setLoading] = useState(false)

    const onChangeDate = (date) => {
        if (date) {
            let dateConvert = new Date(date).toUTCString();
            setInfo({
                ...directorInfo,
                dob: dateConvert
            });
        } else {
            setInfo({
                ...directorInfo,
                dob: ''
            });
        }
    }
    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setInfo({
            ...directorInfo,
            [name]: value,
        })
    }
    const clearState = async () => {
        setInfo({
            name: '',
            dob: '',
            description: ''
        })
        setLoading(false)
    }
    const submitButton = async () => {
        setLoading(true)
        console.log(directorInfo);
        const res = await MakeRequest("post", "director/create", directorInfo)
        if (res.data.signal === 1) {
            clearState()
            setLoading(false)
            showSuccessMessage("Tạo đạo diễn thành công")
        }
        else if (res.data.signal === 0 && res.data.message === "Token invalid") {
            ValidToken(props)
        }
        else {
            showErrorMessage("Tạo đạo diễn thất bại")
            setLoading(false)

        }
    }

    return (
        <div>
            <FormGroup className="wrap-movies-name">
                <label className="label-in-new-movies">Tên đạo diễn</label>
                <Input id="custom-input-movie-name" name="name" value={directorInfo.name} onChange={handleChange}></Input>
            </FormGroup>
            <FormGroup className="wrap-dateOfBirth-box">
                <label className='label-in-character'>Ngày sinh</label>
                <DatePicker
                    style={{ width: 300, borderRadius: '5px' }}
                    format={dateFormat}
                    placeholder={'Ngày/tháng/năm'}
                    value={directorInfo.dob && moment(directorInfo.dob) || ''}
                    onChange={onChangeDate}
                />
            </FormGroup>

            <FormGroup className="wrap-movies-description">
                <label className="label-in-new-movies">Miêu tả</label>
                <TextArea id="custom-description-movie" name="description" value={directorInfo.description} onChange={handleChange}></TextArea>
            </FormGroup>
            {isLoading ?
                <Button type="primary" loading>Thêm đạo diễn</Button> :
                <Button type="primary" onClick={() => submitButton()}>Thêm đạo diễn</Button>}

        </div>
    )
}

export default CreateDirector