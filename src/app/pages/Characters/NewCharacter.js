import { AddCircleOutline, PowerOffOutlined, RemoveCircleOutline } from '@material-ui/icons';
import { Button, DatePicker, Image, Input, Radio } from 'antd'

import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { Form, FormGroup, FormText } from 'reactstrap';
import { dateFormat } from '../../Utils/constants';
import MakeRequest from '../../Utils/MakeRequest';
import { showErrorMessage, showSuccessMessage } from '../../Utils/notification';
import { generateRandomCode } from '../../Utils/random';
import './NewCharacter.css'
export default function NewCharater() {

    const [characterInfo, setInfo] = useState({
        name: '',
        dOb: '',
        bornIn: '',
        height: '',
        description: '',
    })

    const [clear, setClear] = useState(false)
    const [listUniDel, setListUniDel] = useState([])
    const [file, setFile] = useState('')
    const [gender, setGender] = useState(1)
    const [pathFile, setPath] = useState('')
    const [imageSaved, setImgaeSaved] = useState('')
    const [isLoading, setLoading] = useState(false)
    const { TextArea } = Input;
    const [id, setID] = useState('')
    const clearState = () => {
        setInfo({
            name: '',
            bornIn: '',
            height: '',
            description: '',
        })

        setFile('')
        setGender('')
        setPath('')
        setLoading(false)

    }
    const preview = () => {
        let show = (file.name) ?
            (
                <>
                    <Image height={200} src={pathFile} />
                    <Button onClick={(e) => clearFile()}>x</Button>
                </>
            ) : ('')
        return show
    }
    useEffect(() => { preview() }, [file])
    useEffect(() => {
        clearState()
        setClear(false)
    }, [clear])
    const submitButton = async () => {
        setLoading(true)
        let dataPost = new FormData();
        dataPost.append('image', file);
        const image = await saveImage(dataPost)
        console.log(characterInfo);


        if (image && image.signal === 1) {
            const dataCharacter = {
                id: characterInfo.id,
                name: characterInfo.name,
                dob: characterInfo.dOb,
                description: characterInfo.description,
                address: characterInfo.bornIn,
                gender: gender,
                image: image.data.imagePath
            }
            const character = await saveCharacter(dataCharacter)
            if (character && character.signal === 1) {
                showSuccessMessage("Tạo diễn viên thành công")
            } else {
                showErrorMessage("Tạo diễn viên thất bại")
            }
        } else {
            showErrorMessage("Không tải được ảnh")
        }

    }
    useEffect(() => {
         console.log(characterInfo);
    }, [characterInfo])
    const saveImage = async (dataPost) => {
        const res = await MakeRequest('post', `upload/photo`, dataPost
            , {
                'Content-Type': 'multipart/form-data'
            }
        )
        if (res.data && res.data.signal === 1) {
            setImgaeSaved(res.data.data)
            return res.data

        } else {
            showErrorMessage('Tạo thất bạii')
            setLoading(false)
        }
    }
    const saveCharacter = async (dataPost) => {
        const res = await MakeRequest('post', `character/create`, dataPost

        )
        if (res.data && res.data.signal === 1) {
            return res.data
        } else {
            showErrorMessage('Tạo thất bạii')
            setLoading(false)
        }
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

    const handleFile = (e) => {
        e.preventDefault();
        const url = e.target.files[0]
        setFile(e.target.files[0])
        var path = (window.URL || window.webkitURL).createObjectURL(url)
        setPath(path)

    }
    const clearFile = (e) => {
        setFile('')
        setPath('')
    }
    const genderSelected = (e) => {
        console.log('radio checked', e.target.value);
        setGender(e.target.value)
    }
    return (
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
                    {isLoading ?
                        <Button type="primary" loading>Thêm mới diễn viên</Button> :
                        <Button type="primary" onClick={() => submitButton()}>Thêm mới diễn viên</Button>}


                </FormGroup>

            </Form>
        </div >
    )
}