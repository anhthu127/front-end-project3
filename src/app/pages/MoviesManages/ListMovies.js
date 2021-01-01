import React, { useEffect, useState } from 'react';
import makeRequest from '../../Utils/MakeRequest';
import { Table } from 'reactstrap'
import Selector from '../../Utils/Selector'
// import ReactPlayer from 'react-player'
import { Pagination } from 'antd';
import MakeRequest from '../../Utils/MakeRequest';
import { Image } from 'react-bootstrap';
import { DiffOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import ModalConfirm from '../../Utils/ModalConfirm';
import { showErrorMessage, showSuccessMessage, showSuccessMessageIcon } from '../../Utils/notification';
import ModalDetail from './ModalDetail';
export default function ListMovies() {

    const [category, setCategory] = useState('');
    const [listMovie, setListMovie] = useState([]);
    const [dataSearch, setData] = useState();
    const [searchCategories, setSearchCategories] = useState();
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    useEffect(() => {
        getListCategory()
        getList()
    }, [])

    async function getListCategory() {
        const categories = await makeRequest('GET', 'category/all')
        if (categories.data.signal === 1) {
            const data = categories.data.data
            setCategory(data)
        }
    }
    const getList = async () => {
        const data = {
            page: page,
            limit: 10
        }
        const res = await MakeRequest('GET', '/movies/list', data)
        if (res.data.signal === 1) {
            const data = res.data.data
            setTotal(data.count)
            setListMovie(data.rows)
        }
    }
    const getData = async (value) => {
        const res = await makeRequest('POST', 'movies/listByCategory', value)
        console.log(res.data);
    }
    const editMovie = async (value) => {
        const res = await makeRequest("POST", "movies/edit", value)
        if (res.data.signal === 1) {
            showSuccessMessage("Cập nhật thành công")
            getList()
        }else{
            showErrorMessage("Cập nhật thất bại")
        }
    }
    const onChange = async (pageNum) => {
        console.log(pageNum);
        setPage(pageNum)
        const data = {
            page: pageNum,
            limit: 10
        }
        const res = await MakeRequest('GET', '/movies/list', data)
        if (res.data.signal === 1) {
            const data = res.data.data
            setTotal(data.count)
            setListMovie(data.rows)
        }
    };
    const handleDetails = () => {

    }
    const handleEdit = () => {

    }
    const handleDelete = async (value) => {
        console.log(value);
        const res = await makeRequest("POST", "/movies/del", value)
        if (res.data.signal === 1) {
            showSuccessMessageIcon("Xóa thành công")
            const data = {
                page: page,
                limit: 10
            }
            const list = await MakeRequest('GET', '/movies/list', data)
            if (list.data.signal === 1) {
                const data = list.data.data
                setTotal(data.count)
                setListMovie(data.rows)
            }
        }
    }
    return (
        <div classNa="movies_home" >
            <div style={{ paddingTop: '20px', paddingBottom: '20px', float: 'left' }}>
                <Selector data={category} placeholder="Chọn loại phim" multiple="multiple"
                    name='category' getData={(value) => getData(value)} />
            </div>
            <br />
            <div>
                <Table>
                    {/* <thead> */}
                    <tr>
                        <th>  STT</th>
                        <th> Tên phim  </th>
                        <th> Banner  </th>
                        <th> Tác giả  </th>
                        <th> Miêu tả  </th>
                        <th>  Link phim  </th>
                        <th>  Hành động </th>
                    </tr>
                    {/* </thead> */}
                    <tbody>
                        {(listMovie.length > 0) && listMovie.map((value, index) => {
                            return (
                                <tr key={index}>
                                    <th  >{index + 1}</th>
                                    <td>{value.name}</td>
                                    <td>
                                        <Image height={100} src={value.image} />
                                    </td>
                                    <td>{value.author}</td>
                                    <td>{value.description}</td>
                                    <td>{value.link}</td>
                                    <td>
                                        <div>
                                            <ModalDetail
                                                data={value}
                                                handleOk={(value) => {
                                                    editMovie(value)
                                                }}
                                            />

                                            {/* <EditOutlined style={{
                                                paddingLeft: '20px', width: "50px",
                                                height: "30px", fontSize: '25px', color: 'blueviolet'
                                            }}
                                                onClick={() => { handleEdit() }}
                                            /> */}
                                            <ModalConfirm value={value}
                                                handleOk={(value) => {
                                                    handleDelete(value)
                                                }}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>

                {(total > 9) ? (
                    <div className="custom-svg customSelector">
                        <Pagination defaultCurrent={page}
                            total={(total + 10 - (total % 10))}
                            onChange={(e) => onChange(e)}
                        />
                    </div>
                ) : (
                        <div></div>
                    )}
            </div>
        </div>
    )

}

