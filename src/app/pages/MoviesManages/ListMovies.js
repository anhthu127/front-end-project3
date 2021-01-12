import React, { useEffect, useState } from 'react';
import makeRequest from '../../Utils/MakeRequest';
import { Table, Input, Button, FormGroup } from 'reactstrap'
import Selector from '../../Utils/Selector'
import { Pagination } from 'antd';
import MakeRequest from '../../Utils/MakeRequest';
import { Image } from 'react-bootstrap';
import { DiffOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import ModalConfirm from '../../Utils/ModalConfirm';
import { showErrorMessage, showSuccessMessage, showSuccessMessageIcon } from '../../Utils/notification';
import ModalDetail from './ModalDetail';
import { defaultImage, media_url } from '../../Utils/constants'
export default function ListMovies(props) {

    const [category, setCategory] = useState([]);
    const [listMovie, setListMovie] = useState([]);
    const [dataSearch, setData] = useState();
    const [searchCategories, setSearchCategories] = useState();
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    useEffect(() => {
        // getListCategory()
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
        const res = await MakeRequest('GET', 'movie/all', data)
        if (res.data.signal === 1) {
            console.log(res.data);
            const data = res.data.data
            setTotal(data.pagination.totalRecords)
            setListMovie(data.data)
        }
    }
    const getData = async (value) => {
        const data = {
            page: page,
            limit: 10,
            code: value
        }
        const res = await makeRequest('get', 'movies/listByCategory/', data)
        console.log(res.data);
    }
    const editMovie = async (value) => {
        const res = await makeRequest("POST", "movies/edit", value)
        if (res.data.signal === 1) {
            showSuccessMessage("Cập nhật thành công")
            getList()
        } else {
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
        const res = await MakeRequest('GET', 'movie/all', data)
        if (res.data.signal === 1) {
            const data = res.data.data
            setTotal(data.count)
            setListMovie(data.rows)
        }
    };
    const handleSort = (e) => {
        const code = e.target.value
        getData(code)
    }

    const handleDetails = () => {

    }
    const handleEdit = () => {

    }
    const handleSearch = async (e) => {
        const data = {
            page: page,
            limit: 10
        }
        const { value, name } = e.target
        const res = await makeRequest('get', 'movie/all?searchData=' + value, data)
        console.log(res.data.data.data);
        if (res.data.signal === 1) {
            const data = res.data.data
            setTotal(data.totalPage)
            setListMovie(data.data)
        }
    }
    const handleDelete = async (value) => {
        console.log(value);
        const res = await makeRequest("POST", "movies/del", value)
        if (res.data.signal === 1) {
            showSuccessMessageIcon("Xóa thành công")
            const data = {
                page: page,
                limit: 10
            }
            const list = await MakeRequest('GET', 'movie/all', data)
            if (list.data.signal === 1) {
                const data = list.data.data
                setTotal(data.count)
                setListMovie(data.rows)
            }
        }
    }
    return (
        <div classNa="movies_home" >
            <div style={{ paddingBottom: '20px', float: 'left' }}>
                <div style={{ display: 'flex', paddingTop: '20px' }}>
                    <FormGroup style={{ display: 'flex', alignSelf: 'center', paddingRight: '200px', paddingLeft: '100px', margin: '0px' }}>
                        <Input
                            style={{ width: '500px' }}
                            type="search"
                            name="dataSearch"
                            id="exampleSearch"
                            placeholder="Tìm kiếm"
                            onChange={(e) => {
                                handleSearch(e)
                            }}
                        />
                        <Button>
                            <i class="fas fa-search"></i></Button>
                    </FormGroup>
                    <FormGroup style={{ margin: '0px' }}>
                        <Input type="select" name="select" id="exampleSelect" onChange={(e) => {
                            handleSort(e)
                        }}>
                            <option name="default" value="default">Lọc thể loại phim</option>
                            {
                                category.map((item, index) => {
                                    return (
                                        <option name="price" value={item.code}>{item.name}</option>
                                    )
                                })
                            }
                        </Input>
                    </FormGroup>

                </div>
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

                                        {value.image === null ? (<Image height={100} src={defaultImage} />
                                        ) : (<Image height={100} src={media_url + value.image} />
                                            )}                                    </td>
                                    <td>{value.author}</td>
                                    <td>{value.description}</td>
                                    <td>{value.link_movie}</td>
                                    <td>
                                        <div>
                                            {value.link_movie === null ? (
                                                <DiffOutlined style={{ paddingLeft: '20px', width: "50px", height: "30px", fontSize: '25px', color: 'blueviolet' }}
                                                    type="primary" onClick={() => {
                                                        props.history.push({
                                                            pathname: '/admin/movie/series/detail/',
                                                            search: '?id=' + value.id,
                                                            state: { id: value.id }
                                                        })
                                                    }}>
                                                </DiffOutlined>

                                            ) : (
                                                    <ModalDetail
                                                        data={value}
                                                        handleOk={(value) => {
                                                            editMovie(value)
                                                        }}
                                                    />
                                                )}


                                            {/* <EditOutlined style={{
                                                paddingLeft: '20px', width: "50px",
                                                height: "30px", fontSize: '25px', color: 'blueviolet'
                                            }}
                                                onClick={() => { handleEdit() }}
                                            /> */}
                                            <ModalConfirm value={value}
                                                message="Bạn có chắc muốn xóa phim này?"
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

