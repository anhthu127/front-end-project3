import { Card, Col, Row } from 'antd'
import { Button } from 'reactstrap'
import AddSeriesMovie from './AddSeriesMovie'
import { defaultImage, media_url } from '../../Utils/constants'
import React, { useEffect, useState } from 'react'
import { ValidToken } from '../../Utils/CheckToken'
import MakeRequest from '../../Utils/MakeRequest'
import { Image } from 'react-bootstrap'
import './detailSeries.css'
import { DiffOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import moment from 'moment'
import { DownCircleOutlined, UpCircleOutlined, PlusCircleOutlined } from '@ant-design/icons'

function DetailSeriesMovie(props) {
    const [listData, setList] = useState([])
    const [isClick, setClick] = useState(false)
    const [classNameHandle, setName] = useState([])
    const getSeason = async () => {
        const res = await MakeRequest('get', 'movie/seasons?id=' + props.location.state.id)
        console.log('res  ', res.data);
        if (res.data.signal === 1) {
            setList(res.data.data)
            let name = []
            for (let index = 0; index < res.data.data.length; index++) {
                name.push('showBlock')
            }
            console.log(name.length);
            setName(name)
        } else if (res.data.signal === 0 && res.data.message === "Token invalid") {
            ValidToken(props)
        }
    }

    const reload = async () => {
        await getSeason()
    }

    useEffect(() => {
        if (props?.location?.state?.id) {
            getSeason()

        } else {
            setList([])
        }
    }, [])

    useEffect(() => {
        console.log('classNameHandle', classNameHandle);
    }, [classNameHandle])

    const handleOnMouseEnter = (idx) => {
        let hanldeClass = classNameHandle
        hanldeClass[idx] = 'showBlock'
        setName(hanldeClass)
        console.log('name ', classNameHandle);
    }
    const handleOnMouseLeave = (idx) => {
        let hanldeClass = classNameHandle
        hanldeClass[idx] = 'hideBlock'
        setName(hanldeClass)
        console.log('name ', classNameHandle);
    }
    const ContentInDetail = () => {
        let show = listData.map((item, idx) => {
            console.log('66', idx, classNameHandle[idx]);
            return (
                <div key={idx}>
                    <div style={{ display: 'flex', borderRadius: '5px', border: '1px solid #ffffff' }}
                        onMouseEnter={() => {
                            handleOnMouseEnter(idx)
                        }}
                        onMouseLeave={() => {
                            handleOnMouseLeave(idx)
                        }}
                    >
                        {item.image === null ? (<Image style={{ width: '30%', height: '100%' }} src={defaultImage} />
                        ) : (<Image style={{ width: '20%', height: '100%' }} src={media_url + item.image} />
                            )}
                        <Card title={
                            <div>
                                <h4 style={{}}>{item.name}</h4>
                            </div>
                        }
                            extra={
                                <div style={{ display: 'flex', width: '100%' }}>
                                    <h5 style={{}}>{moment(item.created_at).format('DD-MM-YYYY')}</h5>
                                    <div className={classNameHandle[idx]}>
                                        <div className='wrap-btn-action' style={{ display: 'flex', width: '50%' }}>
                                            <DiffOutlined type="primary"
                                                style={{
                                                    paddingLeft: '20px', height: "30px",
                                                    fontSize: '25px', color: '#5578eb'
                                                }}
                                            >
                                            </DiffOutlined>
                                            <DeleteOutlined style={{
                                                paddingLeft: '20px',
                                                height: "30px", fontSize: '25px', color: '#fd397a'
                                            }}
                                                type="primary" >
                                            </DeleteOutlined>

                                        </div>
                                    </div></div>
                            }
                            style={{ width: '80%', background: "rgb(242 243 248)", }}>
                            <div style={{ display: 'flex' }}>
                                <p>{item.description}</p>
                                {isClick ? (<div
                                    onClick={() => {
                                        setClick(false)
                                    }}
                                    style={{
                                        marginLeft: 'auto',
                                        order: 2
                                    }}  >
                                    <DownCircleOutlined
                                        style={{ paddingLeft: '20px', width: "50px", height: "30px", fontSize: '25px', color: 'blueviolet' }}
                                        type="primary" /></div>) :
                                    (<div style={{
                                        marginLeft: 'auto',
                                        order: 2
                                    }}
                                        onClick={() => {
                                            setClick(true)
                                        }}
                                    >
                                        <UpCircleOutlined style={{ paddingLeft: '20px', width: "50px", height: "30px", fontSize: '25px', color: 'blueviolet' }} />
                                    </div>)
                                }
                            </div>
                        </Card>
                    </div>
                    <div style={{ width: '100%', height: '25px' }}></div>

                </div >

            )
        })
        return show;
    }
    return (
        <div style={{ padding: '3%' }}>
            <Row style={{ paddingBottom: '20px' }}>
                <Col span={8} > {props?.location?.state?.name ? (<h4>Chi tiết phim {props?.location?.state?.name}</h4>) : (<h4>Thêm season cho phim</h4>)} </Col>
                <Col span={16}>
                    <AddSeriesMovie name={props?.location?.state?.name} id={props?.location?.state?.id}
                        reloadDetailSeries={() => reload()} />
                </Col>
            </Row>
            {ContentInDetail()}
        </div>
    )
}

export default DetailSeriesMovie;