
import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'antd';
import { ProfileOutlined } from '@ant-design/icons';
import { DatePicker, Image, Input, Radio } from 'antd'
import { Form, FormGroup, FormText } from 'reactstrap';
import { dateFormat, media_url } from '../../Utils/constants';
import { showErrorMessage, showSuccessMessage } from '../../Utils/notification';
import moment from 'moment';
import "./ModalSharing.css"
import MakeRequest from '../../Utils/MakeRequest';
function ModalSharing(props) {
    const { TextArea } = Input;
    const [clear, setClear] = useState(false)
    const [visible, setVisible] = useState(false)
    const { item, page } = props
    const [characterInfo, setInfo] = useState(item)
    const [file, setFile] = useState('')
    const [gender, setGender] = useState(item.gender)
    const [pathFile, setPath] = useState()
    const showModal = () => {
        setVisible(true)
    }
    const getList = async () => {
        const data = {
            page: page,
            limit: 10
        }
        const res = await MakeRequest('GET', 'character/all', data)
        if (res.data.signal === 1) {
            props.updateListCharacter(res.data.data.data, res.data.data.pagination)
        }
    }
    const genderSelected = (e) => {
        // console.log('radio checked', e.target.value);
        setGender(e.target.value)
    }
    const hideModal = () => {
        setVisible(false)
    };
    const clearFile = (e) => {
        setFile('')
        setPath()
    }
    const handleFile = (e) => {
        console.log("file ",file);
         const url = e.target.files[0]
        setFile(e.target.files[0])
        var path = (window.URL || window.webkitURL).createObjectURL(url)
        setPath(path)

    }
    const onChangeDate = (date) => {
        if (date) {
            let dateConvert = new Date(date).toUTCString();
            setInfo({
                ...characterInfo,
                dob: dateConvert
            });
        } else {
            setInfo({
                ...characterInfo,
                dob: ''
            });
        }
    }
    useEffect(() => {
        // console.log(item);
        // console.log(characterInfo);
    }, [])
    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setInfo({
            ...characterInfo,
            [name]: value,
        })
    }

    const saveImage = async (dataPost) => {
        const res = await MakeRequest('post', `upload/photo`, dataPost
            , {
                'Content-Type': 'multipart/form-data'
            }
        )
        if (res.data && res.data.signal === 1) {
            return res.data

        } else {
            showErrorMessage("Không tải được ảnh")
        }
    }
    const preview = () => {
        let show = (file.name) ?
            (
                <>
                    <Image height={200} src={pathFile} />
                    <Button onClick={(e) => clearFile()}>x</Button>
                </>
            ) : (
                <Image height={200} src={media_url + characterInfo.image} />

            )
        return show
    }
    useEffect(() => {
        preview()
        console.log(file);
    }, [file])
    const updateCharacter = async (dataPost) => {
        const res = await MakeRequest('put', `character/` + dataPost.id, dataPost

        )
        if (res.data && res.data.signal === 1) {
            return res.data
        }
    }
    const handleUpdateCharacter = async () => {
        // console.log(characterInfo);
        // console.log(gender);
        let dataPost = new FormData();
        dataPost.append('image', file);
        let image = null
        console.log(file);
        if (file.name) {
            image = await saveImage(dataPost)
        }
        console.log(characterInfo);
        if (image != null && image.signal === 1) {
            const dataCharacter = {
                id: characterInfo.id,
                name: characterInfo.name,
                dob: characterInfo.dob,
                description: characterInfo.description,
                address: characterInfo.address,
                gender: gender,
                image: image.data.imagePath
            }
            const character = await updateCharacter(dataCharacter)
            if (character && character.signal === 1) {
                getList()
                showSuccessMessage("Cập nhật diễn viên thành công")
                setFile('')
                hideModal()
            } else {
                showErrorMessage("Cập nhật diễn viên thất bại")
                hideModal()

            }
        } else {
            const dataCharacter = {
                id: characterInfo.id,
                name: characterInfo.name,
                dob: characterInfo.dob,
                description: characterInfo.description,
                address: characterInfo.address,
                gender: gender,
                image: characterInfo.image
            }
            const character = await updateCharacter(dataCharacter)
            if (character && character.signal === 1) {
                getList()
                showSuccessMessage("Cập nhật diễn viên thành công")
                hideModal()
            } else {
                showErrorMessage("Cập nhật diễn viên thất bại")
                hideModal()

            }
        }

    }
    return (
        <>
            <ProfileOutlined style={{ fontSize: '25px', color: 'blueviolet' }}
                type="primary" onClick={showModal}>
            </ProfileOutlined>
            <Modal
                title={"Thông tin chi tiết diễn viên " + characterInfo.name}
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
                            <div style={{ display: 'flex' }}>
                                <FormGroup className="wrap-name-box">
                                    <label className='label-in-character'>Tên diễn viên </label>
                                    <Input id="custom-input-name" name="name"
                                        value={characterInfo.name}
                                        onChange={handleChange}></Input>
                                </FormGroup>
                                <div style={{ paddingLeft: '30px' }}>
                                    <label for="file-upload" className="custom-file-upload">Tải ảnh minh họa</label>
                                    <Input name='pathFile' id="file-upload" type="file"
                                        style={{ display: 'none' }} onChange={(e) => handleFile(e)} />
                                </div>
                            </div>
                            <FormGroup className='image_preview'>
                                <div style={{
                                    float: 'right', width: '300px', height: '200px',
                                    marginRight: '100px', display: 'flex', border: '1px solid #e1e1ef'
                                }} >
                                    {preview()}
                                </div>
                            </FormGroup>
                            <FormGroup className="wrap-gender-box">
                                <label className='label-in-character' >Giới tính </label>
                                <Radio.Group onChange={genderSelected} value={gender}>
                                    <Radio value={1}>Nam</Radio>
                                    <Radio value={0}>Nữ</Radio>
                                    {/* <Radio value={3}>Chưa xác định</Radio> */}

                                </Radio.Group>
                            </FormGroup>
                            <FormGroup className="wrap-bornIn-box">
                                <label className='label-in-character'>Sinh tại </label>
                                <Input id="custom-input-bornIn" name="address" value={characterInfo.address} onChange={handleChange}></Input>
                            </FormGroup>
                            <FormGroup className="wrap-dateOfBirth-box">
                                <label className='label-in-character'>Ngày sinh</label>
                                <DatePicker
                                    style={{ width: 300, borderRadius: '5px' }}
                                    format={dateFormat}
                                    placeholder={'Ngày/tháng/năm'}
                                    value={characterInfo.dob && moment(characterInfo.dob) || ''}
                                    onChange={onChangeDate}
                                />
                            </FormGroup>

                            {/* <FormGroup className="wrap-height-box">
                                <label className='label-in-character' >Chiều cao</label>
                                <Input id="custom-input-height" value={characterInfo.height} name="height" onChange={handleChange}></Input>
                                <label style={{ paddingLeft: '30px' }}>(cm)</label>

                            </FormGroup> */}
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
                </div >
            </Modal>
        </>
    );

}

export default ModalSharing;