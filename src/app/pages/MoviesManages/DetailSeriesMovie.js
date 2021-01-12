import { Card } from 'antd'
import { defaultImage, media_url } from '../../Utils/constants'
import React, { useEffect, useState } from 'react'
import { ValidToken } from '../../Utils/CheckToken'
import MakeRequest from '../../Utils/MakeRequest'
import { Image } from 'react-bootstrap'
import { DownCircleOutlined, UpCircleOutlined } from '@ant-design/icons'

function DetailSeriesMovie(props) {
    const [listData, setList] = useState([])
    const [isClick, setClick] = useState(false)
    const getSeason = async () => {
        const res = await MakeRequest('get', 'movie/seasons?id=' + props.location.state.id)
        console.log('res  ', res.data);

        if (res.data.signal === 1) {
            setList(res.data.data)
        } else if (res.data.signal === 0 && res.data.message === "token invalid") {
            ValidToken(props)
        }
    }
    useEffect(() => {
        getSeason()
    }, [])

    useEffect(() => {
        console.log(listData);
    }, [listData])
    const ContentInDetail = () => {
        console.log(listData);
        let show = listData.map((item, idx) => {
            return (
                <div style={{ display: 'flex', borderRadius: '5px', border: '1px solid #ffffff' }}>
                    {item.image === null ? (<Image style={{ width: '30%', height: '100%' }} src={defaultImage} />
                    ) : (<Image style={{ width: '20%', height: '100%' }} src={media_url + item.image} />
                        )}
                    <Card title={item.name} extra={
                        <div style={{ paddingRight: '100px' }}>
                            <p>{item.created_at}</p>
                        </div>}
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
                                <DownCircleOutlined style={{ paddingLeft: '20px', width: "50px", height: "30px", fontSize: '25px', color: 'blueviolet' }}
                                    type="primary" /></div>) :
                                (<div style={{
                                    marginLeft: 'auto',
                                    order: 2
                                }}
                                    onClick={() => {
                                        setClick(true)
                                    }}
                                >
                                    <UpCircleOutlined style={{ paddingLeft: '20px', width: "50px", height: "30px", fontSize: '25px', color: 'blueviolet' }}
                                        type="primary" />
                                </div>)
                            }
                        </div>
                    </Card>
                </div >

            )
        })
        return show;
    }
    return (
        <div style={{ padding: '3%' }}>
            <div>
                <h4>Các phần phim</h4>  </div>
            {ContentInDetail()}
        </div>
    )
}

export default DetailSeriesMovie;