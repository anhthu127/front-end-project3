import { CardMedia, Card, Icon, Divider } from '@material-ui/core'
import { Carousel, Input } from 'antd'
import { media_url } from '../../Utils/constants'
import React, { useEffect, useState } from 'react'
import { Button, Label } from 'reactstrap'
import MakeRequest from '../../Utils/MakeRequest'
import SeriesCast from '../SharingComponents/CardMovie'
import PreView from './PreviewMovie'
import Selector from '../../Utils/Selector'

function DetailSingleMovie(props) {
    const [singleMovie, setMovie] = useState([])
    const [character, setCharacter] = useState([])
    const [director, setDirector] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [comment, setComment] = useState([])
    const getData = async () => {
        const id = props?.match?.params?.id
        const res = await MakeRequest('get', 'movie/single/' + id)
        if (res?.data?.signal === 1) {
            console.log(res.data);
            setMovie(res.data.data)
            setCharacter(res.data.data.characters)
            setDirector(res.data.data.director_name)
            setComment(res.data.data.comments)
            setLoading(true)
        }
    }
    const changeDirector = async (e) => {
        const value = e.target.value
        const search = {
            searchData: value
        }
        const res = await MakeRequest('get', 'director/search/', search)
        if (res.data.signal === 1) {
            console.log('director ', res.data);
            setDirector(res.data.data)
        } else {

        }
    }
    const handleUpdate = () => {
        console.log(character);
        console.log(director);
        console.log(singleMovie);
    }
    useEffect(() => {
        getData()
    }, [])
    useEffect(() => {
        console.log('character', character);
    }, [character])
    const changeLinkFilms = (...link) => {
        console.log(link);
    }
    const changeLinkTrailer = (...link) => {
        console.log(link);

    }
    return (
        isLoading ? (
            <>
                <div>
                    <h3>
                        {singleMovie.name}
                    </h3>
                    {character.length > 0 ? (<SeriesCast character={character} />) : (null)}
                    <div>
                        <label className="label-in-new-movies"> Đạo diễn</label>
                        <Input id="custom-input-name" defaultValue={director} onChange={(e) => {
                            changeDirector(e)
                        }}></Input>
                    </div>
                    <PreView details={{
                        linkMovie: singleMovie.link_movie,
                        linkTrailer: singleMovie.link_trailer,
                        comment: comment
                    }}
                        changeLinkFilms={(link) => changeLinkFilms(link)}
                        changeLinkTrailer={(link) => changeLinkTrailer(link)}

                    />
                </div>
                <div style={{ width: '100%', height: '50px' }}></div>
                <div className='btn-action'>
                    <Button color='info' onClick={() => handleUpdate()}>Cập nhật</Button>
                    {/* <Button color='danger' onClick={()=> ha}>Trở lại</Button> */}
                </div>
            </>
        ) : (null)
    )
}

export default DetailSingleMovie;