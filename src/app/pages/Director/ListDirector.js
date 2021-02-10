import React from 'react'
import { Table } from 'reactstrap'
import { EditOutlined, DeleteOutlined, ProfileOutlined, SyncOutlined } from '@ant-design/icons';
import MakeRequest from '../../Utils/MakeRequest';
import { media_url } from '../../Utils/constants'
import { Image } from 'antd';
import { Modal, Pagination, Select, Spin } from "antd";
import ModalSharing from '../SharingComponents/Modal';
import { withRouter } from 'react-router-dom';
import Search from 'antd/lib/input/Search';
import Sort from '../../Utils/Sort';
import ModalConfirm from '../../Utils/ModalConfirm';
import { showErrorMessage, showSuccessMessage } from '../../Utils/notification';
import UpdateDirector from './updateDirector';
import { ValidToken } from '../../Utils/CheckToken';

class ListDirector extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            listData: [],
            page: 1,
            total: 0,
            loading: false,
            dataSearch: undefined,
            limitInPage: 10,

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
        const res = await MakeRequest('GET', 'director/all', data)
        if (res.data.signal === 1) {
            await this.setState({
                ... this.state,
                listData: res.data.data.data,
                total: res.data.data.pagination.totalRecord,
            })
        } else if (res.data.signal === 0 && res.data.message === " Token invalid") {
            ValidToken(this.props)
        } else {

        }
    }


    handleDelete = async (value) => {
        console.log(value);
        const res = await MakeRequest("DELETE", "director/" + value.id)
        if (res.data.signal === 1) {
            showSuccessMessage("Xóa thành công")

            await this.getList()
        } else {
            showErrorMessage("Xóa thất bại do " + res.data.message)
        }
    }
    updateListCharacter = async (data, pagination) => {
        console.log(JSON.stringify(data) + "==>" + JSON.stringify(pagination));
        await this.setState({
            ...this.state,
            listData: data,
            total: pagination.totalRecord
        })

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
                        {/* <td>{value.gender === 0 ? ("nữ") : ("nam")}</td> */}
                        <td>{value.dob}</td>
                        <td>{value.description}</td>


                        <td>
                            <UpdateDirector item={value} page={this.state.page}
                                updateListCharacter={(data, pagination) => {
                                    this.updateListCharacter(data, pagination)
                                }}></UpdateDirector>
                            <ModalConfirm value={value}
                                message="Bạn có chắc xóa đạo diễn này?"
                                handleOk={(value) => {
                                    this.handleDelete(value)
                                }}
                            />
                        </td >
                    </tr >)
            })
            return show;
        }
    }
    updateListCharacter = async (data, pagination) => {
        console.log(JSON.stringify(data) + "==>" + JSON.stringify(pagination));
        await this.setState({
            ...this.state,
            listData: data,
            total: pagination.totalRecord
        })

    }
    render() {
        return (
            <div>
                {/* <Sort data={''} page={this.state.page} updateListCharacter={(data, pagination) => {
                    this.updateListCharacter(data, pagination)
                }} /> */}
                <br />
                <Table>
                    <tr>
                        <th>STT</th>
                        <th>Tên</th>
                        <th>Năm sinh</th>
                        <th>Miêu tả </th>
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
export default withRouter(ListDirector)