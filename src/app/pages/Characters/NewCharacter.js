import { AddCircleOutline, PowerOffOutlined, RemoveCircleOutline } from '@material-ui/icons';
import { Button, DatePicker, Image, Input, Radio } from 'antd'
import { setDate } from 'date-fns';
import { set } from 'lodash';
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
        description: ''
    })
    const [uniMovies, setUniMovies] = useState([
        { placeholder: "Nhập tên phim", unique: 'abcdefgh', name: '' },
        { placeholder: "Nhập tên phim", unique: 'nmdjaksh', name: '' }

    ])
    const [clear, setClear] = useState(false)
    const [listUniDel, setListUniDel] = useState([])
    const [file, setFile] = useState('')
    const [gender, setGender] = useState(1)
    const [pathFile, setPath] = useState('')
    const [isLoading, setLoading] = useState(false)
    const { TextArea } = Input;
    const [id, setID] = useState('')
    const clearState = () => {
        setInfo({
            name: '',
            dOb: '',
            bornIn: '',
            height: '',
            description: ''
        })
        setUniMovies([
            { placeholder: "Nhập tên phim", unique: 'abcdefgh', name: '' },
            { placeholder: "Nhập tên phim", unique: 'nmdjaksh', name: '' },
        ])
        setFile('')
        setGender('')
        setPath('')
        setLoading(false)

    }
    useEffect(() => {
        clearState()
        setClear(false)
    }, [clear])
    const submitButton = async () => {
        setLoading(true)
        let dataPost = new FormData();
        dataPost.append('file', file);
        dataPost.append('name', characterInfo.name)
        dataPost.append('dOb', characterInfo.dOb)
        dataPost.append("gender", gender)
        dataPost.append("height", characterInfo.height)
        dataPost.append("bornIn", characterInfo.bornIn)
        dataPost.append("description", characterInfo.description)
        dataPost.append("uniMovies", uniMovies)
        if (characterInfo.name.length > 0 && characterInfo.dOb.length > 0 && (characterInfo.height > 70 || characterInfo.height)
            && pathFile.length > 0 && characterInfo.bornIn.length > 0) {
            const res = await saveCharacter(dataPost)
            let movieSaved
            console.log(res);
            if (res.data && res.data.signal === 0) {
                showSuccessMessage("" + res.data.data.message)
            }
            if (res) {
                // setID(res.data.data.id)
                movieSaved = await saveUniMovies(res.data.data.id)
            }
            if (res && res.data && res.data.signal === 1 && movieSaved.data.signal === 1) {
                setLoading(false)
                setClear(true)
                showSuccessMessage('Tạo thành công')
            } else {
                setLoading(false)
                // setClear(true)
                showSuccessMessage('Tạo thất bại' + res.data.data.message)
            }
        } else {
            showErrorMessage('Điền đầy đủ thông tin')
            setLoading(false)
        }
    }
    const saveCharacter = async (dataPost) => {
        const res = await MakeRequest('post', `character/add`, dataPost
            , {
                'Content-Type': 'multipart/form-data'
            }
        )
        if (res.data && res.data.signal === 1 && res.data.code === 200) {
            return res

        } else {
            showErrorMessage('Tạo thất bạii')
            setLoading(false)
        }
    }
    const saveUniMovies = async (characterId) => {
        console.log("character id: " + characterId);
        const uniMovieInfo = {
            character_id: characterId,
            uniMovies: uniMovies
        }
        const res = await MakeRequest('post', 'uniMovies/saveByCharacterId', uniMovieInfo)
        // console.log("moviesaved   ", res);
        return res
    }

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setInfo({
            ...characterInfo,
            [name]: value,
        })
    }
    const removeUniMovie = (e, index) => {
        e.preventDefault();
        let data = [...uniMovies];
        if (data[index].id) {
            let movieDel = [...listUniDel];
            movieDel.push(data[index].id);
            setListUniDel(movieDel);
        }
        let datafilter = data.filter((_item, key) => {
            if (key !== index) {
                return true;
            }
            return false;
        });
        setUniMovies(datafilter);
    };
    const handleUniMovie = (e, index) => {
        e = window.event || e;
        e.preventDefault();
        let movies = [...uniMovies];
        movies[index].name = e.target.value;
        setUniMovies(movies);
    }
    const addMoreUniMovie = (e) => {
        let placeholder = "Nhập tên phim";
        let unique = generateRandomCode(6);
        let data = [...uniMovies];
        data.push({ placeholder, unique });
        setUniMovies(data);
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
                            {file != '' &&
                                (
                                    <>
                                        <Image height={200} src={pathFile} />
                                        <Button onClick={(e) => clearFile()}>x</Button>
                                    </>
                                )}
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
                    <FormGroup className="wrap-unique-movies-box">
                        <p className='label-uniMovies-in-character' >Danh sách phim tiêu biểu</p>
                        <div >
                            {uniMovies.map((item, idx) => {
                                return (
                                    <div style={{ display: 'flex', paddingBottom: '10px' }}>
                                        <Input id="custom-input-uniMovie" name="uniMovies"
                                            placeholder={item.placeholder}
                                            value={item.name}
                                            onChange={(event) => handleUniMovie(event, idx)} />
                                        <div style={{ paddingLeft: '30px' }}>  <AddCircleOutline
                                            style={{ cursor: "pointer" }}
                                            onClick={() => addMoreUniMovie()}
                                        />
                                            {uniMovies.length > 1 && (
                                                <RemoveCircleOutline
                                                    style={{ cursor: "pointer" }}
                                                    onClick={(e) => removeUniMovie(e, idx)}
                                                />
                                            )}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </FormGroup>
                    {isLoading ?
                        <Button type="primary" loading>Thêm mới diễn viên</Button> :
                        <Button type="primary" onClick={() => submitButton()}>Thêm mới diễn viên</Button>}

                </FormGroup>
            </Form>
        </div >
    )
}