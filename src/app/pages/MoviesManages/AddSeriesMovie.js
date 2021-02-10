
import React, { useEffect, useState } from 'react';
import { Input, Modal } from 'antd';
import { DiffOutlined } from '@ant-design/icons';
import { FormGroup } from 'react-bootstrap';
import TextArea from 'antd/lib/input/TextArea'
import MakeRequest from '../../Utils/MakeRequest';
import { Image } from 'react-bootstrap';

import { showErrorMessage, showSuccessMessage } from '../../Utils/notification';
import { Button } from 'reactstrap';
function AddSeriesMovie(props) {
    const [visible, setVisible] = useState(false)
    const [clear, setClear] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const [file, setFile] = useState(' ')
    const [pathFile, setPath] = useState(' ')
    const [seasonInfo, setInfor] = useState({
        name: '',
        description: '',
        image: ''
    })
    const showModal = () => {
        setVisible(true)
    }
    const hideModal = () => {
        setVisible(false)
    };
    // useEffect(()=>{console.log();},[])
    const handleOk = async () => {
        // props.handleOk(seasonInfo)
        console.log(seasonInfo);
        let dataPost = new FormData();
        dataPost.append('image', file);
        let image = null
        if (file.length < 3) {
            showErrorMessage("Cần thêm ảnh phim")
            setLoading(false)
        } else {
            image = await saveImage(dataPost)
            console.log(image);
        }
        if (image && image.signal === 1) {
            if (seasonInfo.name.length > 3 || seasonInfo.description.length > 3) {
                const dataMovie = {
                    name: seasonInfo.name,
                    description: seasonInfo.description,
                    image: image.data.imagePath,
                }
                console.log(dataMovie);
                const movie = await saveSeason(dataMovie)
                setTimeout(() => {
                    setLoading(false)
                    hideModal()
                }, 500)
            } else {
                showErrorMessage("Điền đầy đủ thông tin")
                setLoading(false)
            }
        }
    }
    const saveSeason = async (dataPost) => {
        const addResponse = await MakeRequest('post', 'season/add?movieId=' + props.id, dataPost
        )
        if (addResponse.data.signal === 1) {
            setTimeout(() => {
                setLoading(false)
            }, 500)
            showSuccessMessage("Tạo season thành công")
            props.reloadDetailSeries()
            clearState()
            hideModal()
        } else {
            setTimeout(() => {
                setLoading(false)
            }, 500)
            showSuccessMessage("" + addResponse.data.message)
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
    const handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        setInfor({
            ...seasonInfo,
            [name]: value
        })

    }

    const handleCancel = () => {
        hideModal()
    }
    useEffect(() => {
        clearState()
        setClear(false)
    }, [clear])
    const clearState = async () => {
        setInfor({
            name: '',
            description: '',
            image: ''
        })
        setLoading(false)
        setPath('')
        setFile('')
    }

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
    return (
        <>
            <Button style={{ float: 'right' }} color="info" onClick={() => {
                showModal()
            }}
            >Thêm season</Button>
            <Modal
                title={<><h4 style={{textAlign:'center'}}>Thêm seasion phim dài tập  {props.name}</h4></>}
                visible={visible}
                onOk={() => { handleOk() }}
                onCancel={() => handleCancel()}
                cancelText="Đóng"
                okText="Thêm season"
            >
                <FormGroup>
                    <FormGroup className="wrap-movies-name">
                        <label className="label-in-new-movies">Tên season</label>
                        <Input id="custom-input-movie-name" name="name" value={seasonInfo.name} onChange={handleChange}></Input>
                    </FormGroup>

                    <FormGroup className="wrap-movies-description">
                        <label className="label-in-new-movies">Miêu tả</label>
                        <TextArea id="custom-description-movie" name="description" value={seasonInfo.description} onChange={handleChange}></TextArea>
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
                </FormGroup>

            </Modal>
        </>
    );
}
export default AddSeriesMovie;