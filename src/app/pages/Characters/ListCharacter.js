import React, { useEffect, useState } from 'react'
import { Table } from 'reactstrap'
import './ListCharacter.css'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import MakeRequest from '../../Utils/MakeRequest';
import { Modal, Pagination, Select, Spin } from "antd";
import { Image } from 'antd';
import { Button } from 'react-bootstrap';
import ModalSharing from '../SharingComponents/Modal';
export default function ListCharacter(props) {
    const limitInPage = 10;
    const [listData, setList] = useState()
    const [isLoading, setLoading] = useState(false)
    const [total, setTotal] = useState(0)
    const [propsToModal, setProps] = useState({
        isOpen: true,
        modalTitle: 'Danh sách tác phẩm tiêu biểu'
    })
    const [page, setPage] = useState(1)
    useEffect(() => {
        const res = componentDidMount()
        setLoading(true)
        console.log("listData    ", listData);
    }, [isLoading])
    const modalContent = async (idCharater) => {
        const listUniMovies = await MakeRequest('GET', 'uniMovies/list')
        return (
            <div>
                {JSON.stringify(listUniMovies)}
            </div>
        )
    }
    const componentDidMount = async () => {
        const data = {
            page: page,
            limit: limitInPage
        }
        const res = await MakeRequest('GET', 'character/list', data)
        if (res.signal === 1) {
            console.log(res.data.data);
            setList(res.data.data.ListCharacter)
            setTotal(res.data.data.total)
            return res.data.data
        } else {
            return 0
        }
    }
    const detailUniMovies = (idCharater) => {
        return (
            <ModalSharing isOpen={propsToModal.isOpen} modalTitle={propsToModal.modalTitle}
                modalContent={modalContent(idCharater)} />
        )
    }
    const showContent = () => {
        listData.map((value, index) => {
            return (
                <tr key={index}>
                    <th scope="row">{index}</th>
                    <td>{value.name}</td>
                    <td>{value.gender}</td>
                    <td>{value.dOb}</td>
                    <td >
                        <Image thumb src={value.image} />
                    </td>
                    <td>
                        <Button onClick={() => detailUniMovies(value.id)}>Chi tiết</Button>
                    </td>
                    <td>
                        <EditOutlined />
                        <DeleteOutlined />
                    </td>
                    <td><ModalSharing /></td>
                </tr>

            )
        })
    }
    return (
        <div>
            <Table>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tên</th>
                        <th>Giới tính</th>
                        <th>Năm sinh</th>
                        <th>Tiểu sử</th>
                        <th>Ảnh </th>
                        <th>Tác phẩm tiêu biểu </th>
                    </tr>
                </thead>
                <tbody>
                    {showContent}
                </tbody>
            </Table>

            {(total > 9) ? (
                <div className="custom-svg customSelector">
                    <Pagination
                        className="pagination-crm"
                    //    current={page}
                    //    pageSize={rowsPerPage}
                    //    total={total}
                    //    onChange={(p, s) => handleChangePage(p)}
                    />
                </div>
            ) : (
                    <div></div>
                )}
        </div>
    )

}