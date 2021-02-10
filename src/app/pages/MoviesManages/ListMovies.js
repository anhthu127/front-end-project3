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
import { defaultImage, media_url } from '../../Utils/constants'
import { ValidToken } from '../../Utils/CheckToken';
export default function ListMovies(props) {

    const [category, setCategory] = useState([]);
    const [listMovie, setListMovie] = useState([]);
    const [dataSearch, setData] = useState(null);
    const [movieType, setType] = useState(null);
    const [searchCategories, setSearchCategories] = useState(null);
    const [total, setTotal] = useState(0)
    const [totalPage, setTotalPage] = useState(0)
    const [page, setPage] = useState(1)
    useEffect(() => {
        getListCategory()
        getList()
    }, [])
    // useEffect(() => { console.log(category); }, [category])
    async function getListCategory() {
        const categories = await makeRequest('GET', 'category/all')
        if (categories.data.signal === 1) {
            const data = categories.data.data
            console.log(data);
            setCategory(data)
        }
        if (categories.data.signal === 0 && categories.status === 401
        ) {
            ValidToken(props)
        }
    }
    const getList = async () => {
        const data = {
            page: page,
            limit: 10
        }
        const res = await MakeRequest('GET', 'movie/all', data)
        if (res.data.signal === 1) {
            // console.log(res.data);
            const data = res.data.data
            setTotal(data.pagination.totalRecord)
            setTotalPage(data.pagination.totalPage)
            setListMovie(data.data)
        }
    }
    useEffect(() => { console.log(totalPage); }, [totalPage])
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
        // setPage(pageNum)
        let data = null;

        if (searchCategories === null && dataSearch === null) {
            data = {
                page: pageNum,
                limit: 10
            }
            const res = await MakeRequest('GET', 'movie/all', data)
            if (res.data.signal === 1) {
                const data = res.data.data
                setTotal(data.pagination.totalRecord)
                setTotalPage(data.pagination.totalPage)
                setListMovie(data.data)
            }
        } else if (searchCategories != null && dataSearch === null) {
            data = {
                page: pageNum,
                limit: 10,
            }
            const res = await MakeRequest('GET', 'movie/all?category=' + searchCategories, data)
            if (res.data.signal === 1) {
                const data = res.data.data
                setTotal(data.pagination.totalRecord)
                setTotalPage(data.pagination.totalPage)
                setListMovie(data.data)
            }
        } else if (searchCategories === null && dataSearch != null) {
            data = {
                page: pageNum,
                limit: 10,
            }
            const res = await MakeRequest('GET', 'movie/all?searchData=' + dataSearch, data)
            if (res.data.signal === 1) {
                const data = res.data.data
                setTotal(data.pagination.totalRecord)
                setTotalPage(data.pagination.totalPage)
                setListMovie(data.data)
            }
        } else if (searchCategories != null && dataSearch != null) {
            data = {
                page: pageNum,
                limit: 10,
            }
            const res = await MakeRequest('GET', 'movie/all?category=' + searchCategories + "&searchData=" + dataSearch, data)
            if (res.data.signal === 1) {
                const data = res.data.data
                setTotal(data.pagination.totalRecord)
                setTotalPage(data.pagination.totalPage)
                setListMovie(data.data)
            }
        }

    };
    const handleSortType = async (e) => {
        const type = e.target.value
        setType(type)
        if (type != '') {
            await sharingForSearch('searchData', dataSearch, 'category', searchCategories, 'movieType', type)

        } else {
            await getList()
        }
    }
    const handleSort = async (e) => {
        const code = e.target.value
        if (code != '') {
            setSearchCategories(code)
            await sharingForSearch('searchData', dataSearch, 'category', code, 'movieType', movieType)

        } else {
            await getList()
        }
    }

    const handleDetails = (value) => {
        console.log('142', value);
        if (value.movie_type === "series") {
            props.history.push({
                pathname: '/admin/movie/series/' + value.id,

                state: { id: value.id, name: value.name }
            })
        } else if (value.movie_type === 'single') {
            props.history.push({
                pathname: '/admin/movie/single/' + value.id,
                state: { id: value.id, name: value.name }
            })
        }
    }
    const handleEdit = () => {

    }

    const sharingForSearch = async (type1, value1, type2, value2, type3, value3) => {
        if (value1 != null && value2 === null && value3 === null) {
            const data = {
                page: page,
                limit: 10,
                [type1]: value1
            }
            const res = await MakeRequest('GET', 'movie/all/', data)
            if (res.data.signal === 1) {
                const data = res.data.data
                setTotal(data.pagination.totalRecord)
                setTotalPage(data.pagination.totalPage)
                setListMovie(data.data)
            }
        }
        if (type1 != null && type2 != null && type3 === null) {
            const data = {
                page: page,
                limit: 10,
                [type1]: value1,
                [type2]: value2,
            }
            const res = await MakeRequest('GET', 'movie/all/', data)
            if (res.data.signal === 1) {
                const data = res.data.data
                setTotal(data.pagination.totalRecord)
                setTotalPage(data.pagination.totalPage)
                setListMovie(data.data)
            }
        }
        if (type1 != null && type2 != null && type3 != null) {
            const data = {
                page: page,
                limit: 10,
                [type1]: value1,
                [type2]: value2,
                [type3]: value3
            }
            const res = await makeRequest('get', 'movie/all/', data)
            if (res.data.signal === 1) {
                const data = res.data.data
                setTotal(data.pagination.totalRecord)
                setTotalPage(data.pagination.totalPage)
                setListMovie(data.data)
            }
        }
        if (type1 === null && type2 != null && type3 != null) {
            const data = {
                page: page,
                limit: 10,
                [type2]: value2,
                [type3]: value3
            }
            const res = await makeRequest('get', 'movie/all/', data)
            if (res.data.signal === 1) {
                const data = res.data.data
                setTotal(data.pagination.totalRecord)
                setTotalPage(data.pagination.totalPage)
                setListMovie(data.data)
            }
        }
        if (type1 === null && type2 === null && type3 != null) {
            const data = {
                page: page,
                limit: 10,
                [type3]: value3
            }
            const res = await makeRequest('get', 'movie/all/', data)
            if (res.data.signal === 1) {
                const data = res.data.data
                setTotal(data.pagination.totalRecord)
                setTotalPage(data.pagination.totalPage)
                setListMovie(data.data)
            }
        }
        if (type1 != null && type2 === null && type3 != null) {
            const data = {
                page: page,
                limit: 10,
                [type1]: value1,
                [type3]: value3
            }
            const res = await makeRequest('get', 'movie/all/', data)
            if (res.data.signal === 1) {
                const data = res.data.data
                setTotal(data.pagination.totalRecord)
                setTotalPage(data.pagination.totalPage)
                setListMovie(data.data)
            }
        }
        if (type1 === null && type2 != null && type3 === null) {
            const data = {
                page: page,
                limit: 10,
                [type2]: value2,
            }
            const res = await makeRequest('get', 'movie/all/', data)
            if (res.data.signal === 1) {
                const data = res.data.data
                setTotal(data.pagination.totalRecord)
                setTotalPage(data.pagination.totalPage)
                setListMovie(data.data)
            }
        }
    }
    const handleSearch = async (e) => {
        const data = {
            page: page,
            limit: 10
        }
        const { value, name } = e.target
        setData(value)
        await sharingForSearch('searchData', value, 'category', searchCategories, 'movieType', movieType)

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
        <div className="movies_home" >
            <div style={{ paddingBottom: '20px', float: 'left' }}>
                <div style={{ display: 'flex', paddingTop: '20px' }}>
                    <FormGroup style={{ display: 'flex', alignSelf: 'center', paddingRight: '150px', paddingLeft: '50px', margin: '0px' }}>
                        <Input
                            style={{ width: '300px' }}
                            type="search"
                            name="dataSearch"
                            id="exampleSearch"
                            placeholder="Tìm kiếm"
                            onChange={(e) => {
                                handleSearch(e)
                            }}
                        />
                        <Button>
                            <i className="fas fa-search"></i></Button>
                    </FormGroup>
                    <FormGroup style={{ margin: '0px', paddingRight: '100px' }}>
                        <Input type="select" name="select" id="exampleSelect" onChange={(e) => {
                            handleSortType(e)
                        }}>
                            <option name="" value="">Lọc kiểu phim </option>
                            <option name="price" value={'series'}>Phim bộ</option>
                            <option name="price" value={'single'}>Phim lẻ</option>
                        </Input>
                    </FormGroup>
                    <FormGroup style={{ margin: '0px' }}>
                        <Input type="select" name="select" id="exampleSelect" onChange={(e) => {
                            handleSort(e)
                        }}>
                            <option name="" value="">Lọc thể loại phim</option>
                            {
                                category.map((item, index) => {
                                    return (
                                        <option name="price" value={item.id}>{item.name}</option>
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
                        <th style={{ textAlign: 'center' }}>  STT</th>
                        <th style={{ textAlign: 'center' }}> Tên phim  </th>
                        <th style={{ textAlign: 'center' }}> Banner  </th>
                        <th style={{ textAlign: 'center' }}> Miêu tả  </th>
                        <th style={{ textAlign: 'center' }}> Phân loại</th>
                        <th style={{ textAlign: 'center' }}>  Hành động </th>
                    </tr>
                    {/* </thead> */}
                    <tbody>
                        {listMovie.map((value, index) => {
                            if (value.movieType === 'unknown') {
                                return null
                            }
                            return (
                                <tr key={index}>
                                    <th style={{ textAlign: 'center' }}  >{index + 1}</th>
                                    <td style={{ textAlign: 'center' }}>{value.name}</td>
                                    <td >

                                        {(value.image === null || value.image === "") ? (
                                            <div style={{ width: '200px', textAlign: 'center' }}>
                                                <Image height={100} src={require('../../Utils/default.jpg')} /></div>
                                        ) : (<div style={{ width: '200px', textAlign: 'center' }}>
                                            <Image height={100} src={media_url + value.image} /></div>
                                            )}                                    </td>
                                    <td>{value.description}</td>
                                    {value.movie_type === 'series' ? (
                                        <td style={{ textAlign: 'center' }}>Phim bộ</td>) : ((value.movie_type === 'single')
                                            ? (<td style={{ textAlign: 'center' }}>Phim lẻ</td>) : (<td style={{ textAlign: 'center' }}>Unknow</td>))}
                                    <td style={{ textAlign: 'center' }}>
                                        <div>

                                            <DiffOutlined style={{ paddingLeft: '20px', width: "50px", height: "30px", fontSize: '25px', color: 'blueviolet' }}
                                                type="primary" onClick={() => {
                                                    handleDetails(value)
                                                }}
                                            />
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
                            total={total}
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

