import { Button } from 'antd'
import { Alert, Input } from 'antd'
import React, { useEffect, useState } from 'react'
import { rootImage } from '../../Utils/constants'
import makeRequest from '../../Utils/MakeRequest'
import { Form, FormGroup, FormText } from 'reactstrap';
import Selector from '../../Utils/Selector'
import { Col, Image } from 'react-bootstrap'
import TextArea from 'antd/lib/input/TextArea'
import { generateRandomCode } from '../../Utils/random'
import { AddCircleOutline, RemoveCircleOutline } from '@material-ui/icons'
import { Row } from 'react-bootstrap'
import './NewMovies.css'
import { showErrorMessage, showSuccessMessage } from '../../Utils/notification'
import { forEach } from 'lodash'
import AddMoreCharacter from './addMoreCharacter'


export default function NewMovies() {
    const [file, setFile] = useState('')
    const [pathFile, setPath] = useState('')
    const [movieInfo, setInfor] = useState({
        nameMovie: '',
        description: '',
        author: '',
        linkMovie: '',
        category: '',
        listCharacter: ''
    })
    const [characterDel, setCharacterDel] = useState([])
    const [clear, setClear] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const [listCharacter, setListCharacter] = useState([])
    const [categories, setCategories] = useState({
        name: '',
        category_code: ''
    })
    const clearState = async () => {
        setInfor({
            nameMovie: '',
            description: '',
            author: '',
            linkMovie: '',
            category: '',
            listCharacter: ''
        })

        const res = await makeRequest('GET', 'category/all')
        const character = await makeRequest('GET', 'character/getAll')

        if (res.data.signal === 1) {
            const data = res.data.data
            setCategories(data)
        }
        if (character.data.signal === 1) {
            const data = character.data.data
            setListCharacter(data)
        }
        setFile('')
        setPath('')
        setLoading(false)
    }
    useEffect(() => {
        clearState()
        setClear(false)
    }, [clear])
    useEffect(() => {

        async function fetchCategory() {
            const res = await makeRequest('GET', 'category/all')
            const character = await makeRequest('GET', 'character/getAll')
            if (res.data.signal === 1) {
                const data = res.data.data
                setCategories(data)
            }
            if (character.data.signal === 1) {
                console.log(character.data.data);
                const data = character.data.data
                setListCharacter(data)
            }
        }
        fetchCategory()
        console.log(listCharacter);
    }, [])

    const submitHandle = async () => {
        setLoading(true)
        console.log("movieInfor: " + JSON.stringify(movieInfo));
        let dataPost = new FormData();
        dataPost.append('file', file);
        dataPost.append("nameMovie", movieInfo.nameMovie);
        dataPost.append("description", movieInfo.description);
        dataPost.append("author", movieInfo.author);
        dataPost.append("linkMovie", movieInfo.linkMovie);
        dataPost.append("listCharacter", movieInfo.listCharacter);
        console.log(movieInfo.listCharacter);
        if (movieInfo.nameMovie.length < 3 || movieInfo.description.length < 3 || movieInfo.linkMovie.length < 3
            || movieInfo.author.length < 3 || movieInfo.category.length < 1) {
            showErrorMessage("Điền đầy đủ thông tin")
            setTimeout(() => {
                setLoading(false)
            }, 500)
        } else {
            const addResponse = await makeRequest('POST', 'movies/add', dataPost
                , {
                    'Content-Type': 'multipart/form-data'
                })
            if (addResponse.data.signal === 1 && addResponse.data.code === 200) {
                setTimeout(() => {
                    setLoading(false)
                }, 500)
                showSuccessMessage("Tạo phim mới thành công")
                clearState()
            } else {
                setTimeout(() => {
                    setLoading(false)
                }, 500)
                showSuccessMessage("" + addResponse.data.message)
            }
        }
    }
    const handleFile = (e) => {
        const url = e.target.files[0]
        setFile(e.target.files[0])
        var path = (window.URL || window.webkitURL).createObjectURL(url)
        setPath(path)
    }
    const getCategory = (value) => {
        console.log("value   ", value);
        setInfor({
            ...movieInfo,
            category: value
        })
    }
    const getCharacter = (value) => {
        console.log("value   ", value);
        setInfor({
            ...movieInfo,
            listCharacter: value
        })
    }
    const handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        setInfor({
            ...movieInfo,
            [name]: value,
        })
    }
    const clearFile = (e) => {
        setFile('')
        setPath('')
    }


    return (
        <div>
            <FormGroup>
                <FormGroup className="wrap-movies-name">
                    <label className="label-in-new-movies">Tên phim</label>
                    <Input id="custom-input-movie-name" name="nameMovie" value={movieInfo.nameMovie} onChange={handleChange}></Input>
                </FormGroup>
                <FormGroup className="wrap-movies-link">
                    <label className="label-in-new-movies"> Link phim </label>
                    <Input name="linkMovie" id="custom-input-link-phim" value={movieInfo.linkMovie} onChange={handleChange}></Input>
                </FormGroup>

                <FormGroup className="wrap-movies-description">
                    <label className="label-in-new-movies">Miêu tả</label>
                    <TextArea id="custom-description-movie" name="description" value={movieInfo.description} onChange={handleChange}></TextArea>
                </FormGroup>
                <FormGroup className="wrap-movies-link" style={{ display: 'flex' }}>
                    <div className='label-in-character'>
                        <label className="label-in-new-movies" className="custom-file-upload" type="file-upload"
                            htmlFor="file-upload" >Ảnh nền phim </label>
                        <Input name='pathFile' id="file-upload" type="file"
                            style={{ display: 'none' }}
                            placeholder="file"
                            onChange={(e) => handleFile(e)}
                        />
                    </div>
                    <div style={{ width: '20px' }}></div>
                    <div className='image_preview' style={{
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
                <FormGroup className="wrap-unique-movies-box">
                    <label className="label-in-new-movies" >Danh sách diễn viên</label>
                    <Selector placeholder="Chọn danh sách diễn viên" data={listCharacter} multiple="multiple"
                        name='category' getData={(value) => getCharacter(value)} />
                    <AddMoreCharacter />
                </FormGroup>


                <FormGroup className="">
                    <label className="label-in-new-movies"> Đạo diễn</label>
                    <Input name='author' id="custom-input-infor-author" value={movieInfo.author} onChange={handleChange} ></Input>
                </FormGroup>

                <FormGroup className="wrap-movies-category">
                    <label className="label-in-new-movies"> Thể loại </label>
                    <Selector placeholder="Chọn thể loại phim" data={categories} multiple="multiple"
                        name='category' getData={(value) => getCategory(value)}
                    />
                </FormGroup>
            </FormGroup>
            <div>

                {isLoading ?
                    <Button id="btn-handle-submit" type="primary" loading>Tạo phim</Button> :
                    <Button id="btn-handle-submit"
                        onClick={() => submitHandle()}
                    >Tạo phim</Button>
                }
            </div>
        </div>
    )
}

