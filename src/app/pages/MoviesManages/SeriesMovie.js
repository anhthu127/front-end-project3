import React, { useEffect, useState } from 'react'
import { Form, FormGroup, FormText, Button } from 'reactstrap';
import { Alert, Input, Image } from 'antd'
import './NewMovies.css'
import TextArea from 'antd/lib/input/TextArea'
import Selector from '../../Utils/Selector';
import MakeRequest from '../../Utils/MakeRequest';
import { showErrorMessage, showSuccessMessage } from '../../Utils/notification';
function SeriesMovie() {
    const [file, setFile] = useState('')
    const [pathFile, setPath] = useState('')
    const [clear, setClear] = useState(false)
    const [isLoading, setLoading] = useState(false)

    const [SeriesMovieInfo, setInfor] = useState({
        name: '',
        description: '',
        seriesMovie: '',
        listCharacter: ''
    })
    const [listCharacter, setListCharacter] = useState([])
    const [categories, setCategories] = useState({
        name: '',
        category_code: ''
    })
    const handleFile = (e) => {
        const url = e.target.files[0]
        setFile(e.target.files[0])
        var path = (window.URL || window.webkitURL).createObjectURL(url)
        setPath(path)
    }
    const clearFile = (e) => {
        setFile('')
        setPath('')
    }
    const clearState = async () => {
        setInfor({
            name: '',
            description: '',
            category: '',
            listCharacter: ''
        })
    }

    const handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        setInfor({
            ...SeriesMovieInfo,
            [name]: value,
        })
    }
    const saveMovie = async (dataPost) => {
        const addResponse = await MakeRequest('post', 'movie/create', dataPost
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
    const handleCreateSeries = async () => {
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
            console.log(SeriesMovieInfo);
            // || SeriesMovieInfo.description.length > 3 || SeriesMovieInfo..length > 3
            if (SeriesMovieInfo.name.length > 3) {
                const dataMovie = {
                    name: SeriesMovieInfo.name,
                    description: SeriesMovieInfo.description,
                    // directorId: SeriesMovieInfo.derectorId,
                    // linkMovie: SeriesMovieInfo.link_movie,
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



    async function fetchCategory() {
        const res = await MakeRequest('GET', 'category/all')
        const character = await MakeRequest('GET', 'character/getAll')
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
    useEffect(() => {
        fetchCategory()
    }, [])

    return (
        <div>
            <FormGroup>
                <FormGroup className="wrap-movies-name">
                    <label className="label-in-new-movies">Tên phim</label>
                    <Input id="custom-input-movie-name" name="name"
                        value={SeriesMovieInfo.name}
                        onChange={handleChange}
                    ></Input>
                </FormGroup>
                <FormGroup className="wrap-movies-description">
                    <label className="label-in-new-movies">Miêu tả</label>
                    <TextArea id="custom-description-movie" name="description" value={SeriesMovieInfo.description} onChange={handleChange}></TextArea>
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
                <div >
                    <Button onClick={() => {
                        handleCreateSeries()
                    }}>
                        Tạo phim
               </Button>
                </div>
            </FormGroup>
        </div>
    )
}

export default SeriesMovie