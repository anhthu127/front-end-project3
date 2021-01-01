
import React, { useEffect, useState } from 'react';
import { Input, Modal } from 'antd';
import { DiffOutlined } from '@ant-design/icons';
import { Form } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';
import TextArea from 'antd/lib/input/TextArea'
import './AddMoreCharacter.css'
import { Button } from 'react-bootstrap';
import MakeRequest from '../../Utils/MakeRequest';
import { Image } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
function ModalDetail(props) {
    const [visible, setVisible] = useState(false)
    const [movieInfo, setInfor] = useState(props.data)
    const [listCharacter, setList] = useState([])
    const showModal = () => {

        setVisible(true)
    }
    const hideModal = () => {
        setVisible(false)
    };
    const handleOk = () => {
        props.handleOk(movieInfo)
        console.log(movieInfo);
        hideModal()
    }
    const handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        setInfor({
            ...movieInfo,
            [name]: value
        })

    }
    const handleCancel = () => {
        hideModal()
    }
    const onClickDiff = async () => {
        const data = { id: movieInfo.id }
        const list = await MakeRequest("GET", "character/searchById", data)
        if (list.data.signal === 1) {
            setList(list.data.data)
        }
        console.log(movieInfo);
        showModal()
    }
    useEffect(() => {
        console.log(listCharacter.length);

    }, [listCharacter])
    return (
        <>
            <DiffOutlined style={{ paddingLeft: '20px', width: "50px", height: "30px", fontSize: '25px', color: 'blueviolet' }}
                type="primary" onClick={onClickDiff}>
            </DiffOutlined>
            <Modal
                title={"Thông tin chi tiết phim " + movieInfo.name}
                visible={visible}
                onOk={() => { handleOk() }}
                onCancel={() => handleCancel()}
                cancelText="Đóng"
                okText="Cập nhật"
            >
                <FormGroup>
                    <FormGroup className="wrap-movies-name">
                        <label className="label-in-new-movies">Tên phim</label>
                        <Input id="custom-input-movie-name" name="nameMovie"
                            name="name" value={movieInfo.name} onChange={handleChange}></Input>
                    </FormGroup>
                    <FormGroup className="wrap-movies-link">
                        <label className="label-in-new-movies"> Link phim </label>
                        <Input name="link" id="custom-input-link-phim" value={movieInfo.link} onChange={handleChange}></Input>
                    </FormGroup>
                    <div className="wrap-movies-link" style={{
                        textAlign: "center"
                    }}>
                        <Image height={200} id="custom-input-link-phim" src={movieInfo.image} />
                    </div>
                    <FormGroup className="wrap-movies-author">
                        <label className="label-in-new-movies"> Đạo diễn </label>
                        <Input name="author" id="custom-input-link-phim" value={movieInfo.author} onChange={handleChange}></Input>
                    </FormGroup>
                    <FormGroup className="wrap-movies-description">
                        <label className="label-in-new-movies">Miêu tả</label>
                        <TextArea id="custom-description-movie" name="description" value={movieInfo.description} onChange={handleChange}></TextArea>
                    </FormGroup>
                    <FormGroup className="wrap-movies-author">
                        <label className="label-in-new-movies" style={{ paddingBottom: '10px' }}> Danh sách diễn viên </label>
                        {(listCharacter.length > 0) ? (
                            <Row>
                                {   listCharacter.map((item, i) => {
                                    return (
                                        <Col>
                                            <div style={{ border: '1px solid #e1e1ef', width: '71px', height: '51px' }}>
                                                <Image height={50} src={item.image} /></div>
                                            <p>{item.name}</p>
                                            <p>{ }</p>
                                        </Col>

                                    )
                                })}
                            </Row>) : (<p>Không có thông tin diễn viên ...</p>)}
                    </FormGroup>
                </FormGroup>
            </Modal>
        </>
    );
}
export default ModalDetail;