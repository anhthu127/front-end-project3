import React from 'react'
import { Table } from 'reactstrap'
import './ListCharacter.css'
import { EditOutlined, DeleteOutlined, ProfileOutlined, SyncOutlined } from '@ant-design/icons';
import MakeRequest from '../../Utils/MakeRequest';
import { Image } from 'antd';
import { Modal, Pagination, Select, Spin } from "antd";
import ModalSharing from '../SharingComponents/Modal';
import { withRouter } from 'react-router-dom';
import Search from 'antd/lib/input/Search';

class ListChar extends React.Component {
    constructor(props) {

        super(props)
        this.state = {
            listData: [],
            page: 1,
            total: 0,
            loading: false,
            dataSearch: undefined,
            limitInPage: 10,
            propsToModal: {
                isOpen: true,
                modalTitle: 'Danh sách tác phẩm tiêu biểu'
            },
        }
    }
    componentDidMount() {
        this.getList()
        // console.log("hihii   ", this.state.total + "  ", this.state.page);
    }
    getList = async () => {
        const data = {
            page: this.state.page,
            limit: this.state.limitInPage
        }
        const res = await MakeRequest('GET', 'character/list', data)
        if (res.data.signal === 1 && res.data.code === 200) {
            await this.setState({
                ... this.state,
                listData: res.data.data.ListCharacter,
                total: res.data.data.total,
            })
        } else {
        }
    }
    modalContent = async (idCharater) => {
        const data = { characterId: idCharater }
        const listUniMovies = await MakeRequest('GET', 'uniMovies/list', data)
        console.log("listUni  ", listUniMovies);
        return (
            <div>
                {JSON.stringify(listUniMovies)}
            </div>
        )
    }
    detailUniMovies = (idCharater) => {
        return (
            <ModalSharing isOpen={this.state.propsToModal.isOpen}
                modalTitle={this.state.propsToModal.modalTitle}
                modalContent={this.modalContent(idCharater)} />
        )
    }
    onChange = async (page) => {
        console.log(page);
        await this.setState({
            ...this.state,
            page: page,
        });
        if (this.state.dataSearch === undefined) {
            await this.getList()
        } else {
            await this.onSearch(this.state.dataSearch)
        }
    };
    showContent = () => {
        if (this.state.listData.length > 0) {
            const show = this.state.listData.map((value, index) => {
                return (
                    <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{value.name}</td>
                        <td>{value.gender}</td>
                        <td>{value.dOb}</td>
                        <td>
                            {value.born_in}
                        </td>
                        <td >
                            <Image height={100} src={value.image} />
                        </td>
                        <td>
                            {/* <ProfileOutlined style={{ fontSize: '25px', color: 'blueviolet' }}
                                onClick={() => this.detailUniMovies(value.id)} /> */}
                            <ModalSharing></ModalSharing>
                            <EditOutlined />
                            <DeleteOutlined />
                        </td >
                    </tr >)
            })
            return show;
        }
    }
    onSearch = async (value) => {
        await this.setState({
            ...this.state,
            // page: 1,
            dataSearch: value
        })
        const dataSearch = {
            dataSearch: value,
            page: this.state.page,
            limit: this.state.limitInPage
        }
        const res = await MakeRequest('GET', '/character/search', dataSearch)
        await this.setState({
            ...this.state,
            listData: (res.data.data.rows) ? (res.data.data.rows) : (''),
            total: res.data.data.count
        })
    };
    render() {
        return (
            <div>
                <Search
                    placeholder="Tìm kiếm"
                    size="large"
                    onSearch={(value) => this.onSearch(value)}
                />
                <br />
                <Table>
                    <tr>
                        <th>STT</th>
                        <th>Tên</th>
                        <th>Giới tính</th>
                        <th>Năm sinh</th>
                        <th>Quê quán</th>
                        <th>Ảnh </th>
                        <th>Hành động</th>
                    </tr>
                    <tbody>
                        {this.showContent()}
                    </tbody>
                </Table>
                {(this.state.total > 9) ? (
                    <div className="custom-svg customSelector">
                        <Pagination defaultCurrent={this.state.page}
                            total={(this.state.total + 10 - (this.state.total % 10))}
                            onChange={this.onChange}
                        />
                    </div>
                ) : (
                        <div></div>
                    )}
            </div>
        )
    }
}
export default withRouter(ListChar)