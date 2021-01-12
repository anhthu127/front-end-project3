
import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'antd';
import { ProfileOutlined } from '@ant-design/icons';
import { DatePicker, Image, Input, Radio } from 'antd'
import { Form, FormGroup, FormText } from 'reactstrap';
import { dateFormat, media_url } from '../../Utils/constants';
import { showErrorMessage, showSuccessMessage } from '../../Utils/notification';
import moment from 'moment';
import MakeRequest from '../../Utils/MakeRequest';
import { ValidToken } from '../../Utils/CheckToken';
function UpdateDirector(props) {
    const { TextArea } = Input;
    const [clear, setClear] = useState(false)
    const [visible, setVisible] = useState(false)
    const { item, page } = props
    const [directorInfo, setInfo] = useState(item)

    const showModal = () => {
        setVisible(true)
    }

    const hideModal = () => {
        setVisible(false)
    };


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


    const updateDirector = async (dataPost) => {
        console.log(dataPost);
        const res = await MakeRequest('put', `director/` + dataPost.id, dataPost

        )
        if (res.data && res.data.signal === 1) {
            return res.data
        } else if (res.data.signal === 0 && res.data.message === "token invalid") {
            ValidToken(props)
        }
    }
    const getList = async () => {
        const data = {
            page: page,
            limit: 10
        }
        const res = await MakeRequest('GET', 'director/all', data)
        if (res.data.signal === 1) {
            props.updateListCharacter(res.data.data.data, res.data.data.pagination)
        }
    }
    const handleUpdateCharacter = async () => {

        const character = await updateDirector(directorInfo)
        if (character && character.signal === 1) {
            getList()
            showSuccessMessage("Cập nhật diễn viên thành công")
            hideModal()
        } else {
            showErrorMessage("Cập nhật diễn viên thất bại")
            hideModal()

        }
    }

    return (
        <>
            <ProfileOutlined style={{ fontSize: '25px', color: 'blueviolet' }}
                type="primary" onClick={showModal}>
            </ProfileOutlined>
            <Modal
                title={"Thông tin chi tiết diễn viên " + directorInfo.name}
                visible={visible}
                onOk={() => {
                    handleUpdateCharacter()
                }}
                onCancel={hideModal}
                okText="Cập nhật"
                cancelText="Đóng"
            >
                <div className="wrap-charater-page">
                    <Form>
                        <FormGroup>
                            <FormGroup className="wrap-name-box">
                                <label className='label-in-character'>Tên đạo diễn </label>
                                <Input id="custom-input-name" name="name"
                                    value={directorInfo.name}
                                    onChange={handleChange}></Input>
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
                            <FormGroup className="wrap-description-box">
                                <p className='label-in-character' >Tiểu sử</p>
                                <TextArea
                                    id="custom-input-description"
                                    name="description"
                                    value={directorInfo.description}
                                    rows={4}
                                    onChange={handleChange}>
                                </TextArea>
                            </FormGroup>
                        </FormGroup>
                    </Form>
                </div >
            </Modal>
        </>
    );

}

export default UpdateDirector;