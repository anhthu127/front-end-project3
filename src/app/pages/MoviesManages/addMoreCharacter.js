
import React, { useState } from 'react';
import { Modal } from 'antd';
import { Button, DatePicker, Image, Input, Radio } from 'antd'
import { AddCircleOutline } from '@material-ui/icons';
import { Form } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';
import { dateFormat } from '../../Utils/constants';
import moment from 'moment';
import './AddMoreCharacter.css'
import { showErrorMessage, showSuccessMessage } from '../../Utils/notification';
import MakeRequest from '../../Utils/MakeRequest';
function AddMoreCharacter() {
    const [fileModal, setFileModal] = useState('')
    const [gender, setGender] = useState(1)
    const [pathFileModal, setPathModal] = useState('')
    const [isLoading, setLoading] = useState(false)
    const { TextArea } = Input;
    const [visible, setVisible] = useState(false)
    const [characterInfo, setInfo] = useState({
        name: '',
        dOb: '',
        bornIn: '',
        height: '',
        description: ''
    })
    const showModal = () => {
        setVisible(true)
    }
    const hideModal = () => {
        setVisible(false)
    };
    const clearState = () => {
        setInfo({
            name: '',
            dOb: '',
            bornIn: '',
            height: '',
            description: ''
        })
        setFileModal('')
        setGender('')
        setPathModal('')
        setLoading(false)

    }
    const handleFile = (e) => {
        e.preventDefault();
        const url = e.target.files[0]
        setFileModal(e.target.files[0])
        var path = (window.URL || window.webkitURL).createObjectURL(url)
        setPathModal(path)

    }
    const clearFile = (e) => {
        setFileModal('')
        setPathModal('')
    }
    const genderSelected = (e) => {
        console.log('radio checked', e.target.value);
        setGender(e.target.value)
    }
    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setInfo({
            ...characterInfo,
            [name]: value,
        })
    }
    const onChangeDate = (date) => {
        if (date) {
            let dateConvert = new Date(date).toUTCString();
            setInfo({
                ...characterInfo,
                dOb: dateConvert
            });
        } else {
            setInfo({
                ...characterInfo,
                dOb: ''
            });
        }
    }

    const handleOkButton = async () => {
        console.log(8787);
        setLoading(true)
        let dataPost = new FormData();
        dataPost.append('file', fileModal);
        dataPost.append('name', characterInfo.name)
        dataPost.append('dOb', characterInfo.dOb)
        dataPost.append("gender", gender)
        dataPost.append("height", characterInfo.height)
        dataPost.append("bornIn", characterInfo.bornIn)
        dataPost.append("description", characterInfo.description)
        if (characterInfo.name.length > 0 && characterInfo.dOb.length > 0 && (characterInfo.height > 70 || characterInfo.height)
            && pathFileModal.length > 0 && characterInfo.bornIn.length > 0) {
            const res = await MakeRequest('post', `character/create`, dataPost
                , {
                    'Content-Type': 'multipart/form-data'
                }
            )
            if (res.data && res.data.signal === 1 && res.data.code === 200) {
                console.log(res.data);
                showSuccessMessage("Thêm diễn viên mới thành công!")
                clearState()
            } else {
                showErrorMessage('' + res.data.message)
                setLoading(false)

            }
        } else {
            showErrorMessage("Điền đầy đủ thông tin ")
        }
    }
    return (
        <>
            <AddCircleOutline style={{ paddingLeft: '20px', width: "50px", height: "30px", fontSize: '25px', color: 'blueviolet' }}
                type="primary" onClick={showModal}>
            </AddCircleOutline>
            <Modal
                title="Thêm diễn viên mới"
                visible={visible}
                onOk={() => { handleOkButton() }}
                onCancel={hideModal}
                okText="Thêm mới"
                cancelText="Đóng"
            >
                <Form>
                    <FormGroup>
                        <FormGroup className="wrap-name-box">
                            <label className='label-in-character'>Tên diễn viên </label>
                            <Input id="custom-input-name" name="name"
                                value={characterInfo.name}
                                onChange={handleChange}></Input>
                        </FormGroup>
                        <FormGroup style={{ display: 'flex' }}>
                            <div className='label-in-character'>
                                <label for="file-upload-in-modal-add-more" className="custom-file-upload">Tải ảnh minh họa</label>
                                <Input name='pathFile' id="file-upload-in-modal-add-more" type="file"
                                    style={{ display: 'none' }} onChange={(e) => handleFile(e)} />
                            </div>
                            <FormGroup className='image_preview'>
                                <div style={{
                                    float: 'right', width: '300px', height: '200px',
                                    marginRight: '100px', display: 'flex', border: '1px solid #e1e1ef'
                                }} >
                                    {fileModal != '' &&
                                        (
                                            <>
                                                <Image height={200} src={pathFileModal} />
                                                <Button onClick={(e) => clearFile()}>x</Button>
                                            </>
                                        )}
                                </div>
                            </FormGroup>
                        </FormGroup>

                        <FormGroup className="wrap-gender-box">
                            <label className='label-in-character' >Giới tính </label>
                            <Radio.Group onChange={genderSelected} value={gender}>
                                <Radio value={1}>Nam</Radio>
                                <Radio value={2}>Nữ</Radio>
                                <Radio value={3}>Chưa xác định</Radio>

                            </Radio.Group>
                        </FormGroup>
                        <FormGroup className="wrap-bornIn-box">
                            <label className='label-in-character'>Sinh tại </label>
                            <Input id="custom-input-bornIn" name="bornIn" value={characterInfo.bornIn} onChange={handleChange}></Input>
                        </FormGroup>
                        <FormGroup className="wrap-dateOfBirth-box">
                            <label className='label-in-character'>Ngày sinh</label>
                            <DatePicker
                                style={{ width: 300, borderRadius: '5px' }}
                                format={dateFormat}
                                placeholder={'Ngày/tháng/năm'}
                                value={characterInfo.dOb && moment(characterInfo.dOb) || ''}
                                onChange={onChangeDate}
                            />
                        </FormGroup>
                        <FormGroup className="wrap-height-box">
                            <label className='label-in-character' >Chiều cao</label>
                            <Input id="custom-input-height" value={characterInfo.height} name="height" onChange={handleChange}></Input>
                            <label style={{ paddingLeft: '30px' }}>(cm)</label>
                        </FormGroup>
                        <FormGroup className="wrap-description-box">
                            <p className='label-in-character' >Tiểu sử</p>
                            <TextArea
                                id="custom-input-description"
                                name="description"
                                value={characterInfo.description}
                                rows={4}
                                onChange={handleChange}>
                            </TextArea>
                        </FormGroup>
                    </FormGroup>
                </Form>
            </Modal>
        </>
    );

}

export default AddMoreCharacter;