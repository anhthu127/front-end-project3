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
import MakeRequest from '../../Utils/MakeRequest'


export default function NewMovies() {
    const [file, setFile] = useState('')
    const [pathFile, setPath] = useState('')
    const [movieInfo, setInfor] = useState({
        name: '',
        description: '',
        link_movie: '',
        category: '',
        listCharacter: ''
    })
    const [characterDel, setCharacterDel] = useState([])
    const [clear, setClear] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const [director, setListDirector] = useState([])
    const [categories, setCategories] = useState({
        name: '',
        category_code: ''
    })
    const clearState = async () => {
        setInfor({
            name: '',
            description: '',
            category: '',
            listCharacter: ''
        })

        const director = await makeRequest('GET', 'director/all')
        if (director.data.signal === 1) {

            const data = director.data.data.data
            setListDirector(data)
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
            // const res = await makeRequest('GET', 'category/all')
            const direactor = await makeRequest('GET', 'director/all')
            // if (res.data.signal === 1) {
            //     const data = res.data.data
            //     setCategories(data)
            // }
            if (direactor.data.signal === 1) {
                console.log(direactor.data.data);
                const data = direactor.data.data.data
                setListDirector(data)
            }
        }
        fetchCategory()
    }, [])
    const saveImage = async (dataPost) => {
        const res = await MakeRequest('post', `upload/photo`, dataPost
            , {
                'Content-Type': 'multipart/form-data'
            }
        )
        if (res.data && res.data.signal === 1) {
            return res.data

        } else {
            showErrorMessage('Tạo thất bạii')
            setLoading(false)
        }
    }
    const submitHandle = async () => {
        setLoading(true)
        // console.log("movieInfor: " + JSON.stringify(movieInfo));
        let dataPost = new FormData();
        dataPost.append('image', file);
        let image = null
        if (file.length < 3) {
            showErrorMessage("Cần thêm ảnh phim")
        } else {
            image = await saveImage(dataPost)
            console.log(image);

        }
        if (image && image.signal === 1) {
            console.log(movieInfo);
            if (movieInfo.name.length > 3 || movieInfo.description.length > 3 || movieInfo.link_movie.length > 3) {
                const dataMovie = {
                    name: movieInfo.name,
                    description: movieInfo.description,
                    directorId: movieInfo.derectorId,
                    linkMovie: movieInfo.link_movie,
                    image: image.data.imagePath
                }
                console.log(dataMovie);
                const movie = await saveMovie(dataMovie)
                setTimeout(() => {
                    setLoading(false)
                }, 500)
            } else {
                showErrorMessage("Điền đầy đủ thông tin")
            }
        }
    }

    const saveMovie = async (dataPost) => {
        const addResponse = await makeRequest('post', 'movie/create', dataPost
        )
        if (addResponse.data.signal === 1) {
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

    const handleFile = (e) => {
        const url = e.target.files[0]
        setFile(e.target.files[0])
        var path = (window.URL || window.webkitURL).createObjectURL(url)
        setPath(path)
    }
    const getDirector = (value) => {
        console.log("value   ", value);
        setInfor({
            ...movieInfo,
            direactorId: value
        })
    }

    const handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        console.log(name + "==>" + value);
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
                    <Input id="custom-input-movie-name" name="name" value={movieInfo.name} onChange={handleChange}></Input>
                </FormGroup>
                <FormGroup className="wrap-movies-link">
                    <label className="label-in-new-movies"> Link phim </label>
                    <Input name="link_movie" id="custom-input-link-phim" value={movieInfo.link_movie} onChange={handleChange}></Input>
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
                        float: 'right', width: '200px', height: '200px',
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
                {/*                 
                <FormGroup className="wrap-unique-movies-box">
                    <label className="label-in-new-movies" >Danh sách diễn viên</label>
                    <Selector placeholder="Chọn danh sách diễn viên" data={listCharacter} multiple="multiple"
                        name='category' getData={(value) => getCharacter(value)} />
                    <AddMoreCharacter />
                </FormGroup> */}


                <FormGroup className="">
                    <label className="label-in-new-movies"> Đạo diễn</label>
                    <Selector placeholder="Chọn đạo diễn" data={director} multiple="none"
                        name='category' getData={(value) => getDirector(value)}
                    />                </FormGroup>
                {/* 
                <FormGroup className="wrap-movies-category">
                    <label className="label-in-new-movies"> Thể loại </label>
                    <Selector placeholder="Chọn thể loại phim" data={categories} multiple="multiple"
                        name='category' getData={(value) => getCategory(value)}
                    />
                </FormGroup>
            */}
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

