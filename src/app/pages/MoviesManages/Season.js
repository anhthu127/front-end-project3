import React, { useEffect, useState } from 'react'
import { Form, FormGroup, FormText, Button } from 'reactstrap';
import { Alert, Input, Image } from 'antd'
import './NewMovies.css'
import './season.css'
import Selector from '../../Utils/Selector';
import MakeRequest from '../../Utils/MakeRequest';
function Season() {
    const [file, setFile] = useState('')
    const [pathFile, setPath] = useState('')
    const [seasonInfo, setInfor] = useState({
        nameMovie: '',
        description: '',
        season: '',
        linkTrailer: '',
        category: '',
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
    const handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        setInfor({
            ...seasonInfo,
            [name]: value,
        })
    }
    async function fetchCategory() {
        const res = await MakeRequest('GET', 'category/all')
        const character = await MakeRequest('GET', 'character/all')
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
                    <Input id="custom-input-movie-name" name="nameMovie"
                        value={seasonInfo.nameMovie}
                        onChange={handleChange}
                    ></Input>
                </FormGroup>
                <FormGroup className="wrap-movies-link">
                    <label className="label-in-new-movies"> Link trailer phim </label>
                    <Input name="linkMovie" id="custom-input-link-phim"
                        value={seasonInfo.linkMovie}
                        onChange={handleChange}
                    ></Input>
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
            </FormGroup>
        </div>
    )
}

export default Season