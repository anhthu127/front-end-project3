
import React, { useState } from 'react'
import {
    Button,
    Card,
    FormGroup,
    Input,

} from "reactstrap";
import MakeRequest from './MakeRequest';


function Sort(props) {
    const { data, page } = props
    const handleSearch = async (e) => {

        const { name, value } = e.target

        const searchData = {
            searchData: value,
            page: page,
            size: 10,
        }
        const res = await MakeRequest("GET", "character/search", searchData)
        if (res && res.data && res.data.signal === 1) {
            console.log(res.data.data);
            props.updateListCharacter(res.data.data.data, res.data.data.pagination)
        }
    }
    const handleSort = async (e) => {
        const { name, value } = e.target
        const sortType = value.charAt(0)
        const Sortcolumn = value.slice(1, value.length)

        const data = {
            sortType: sortType,
            sortColumn: Sortcolumn,
            page: page,
            size: 10,
        }
        const res = await MakeRequest("GET", "character/all", data)
        console.log(res.data.data.data);
        if (res && res.data && res.data.signal === 1) {
            props.updateListCharacter(res.data.data.data, res.data.data.pagination)

        }
    }
    const handleFileter = async (e) => {
        const { name, value } = e.target

        const data = {
            page: page,
            size: 10,

        }
        const res = await MakeRequest("GET", "character/all?gender=" + value, data)
        if (res && res.data && res.data.signal === 1) {
            props.updateListCharacter(res.data.data.data, res.data.data.pagination)

        }
    }
    return (
        <div style={{ display: 'flex', paddingTop: '20px' }}>
            <FormGroup style={{ display: 'flex', alignSelf: 'center', paddingRight: '100px', paddingLeft: '100px', margin: '0px' }}>
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
{/* 
            <FormGroup style={{ margin: '0px', paddingRight: "50px" }}>
                <Input type="select" name="select" id="exampleSelect" onChange={(e) => {
                    handleSort(e)
                }}>
                    <option name="price" value="1price">Sắp xếp</option>
                    <option value="1" value="1name">Sắp xếp theo tên A-Z</option>
                    <option value="0" value="0name">Sắp xếp theo tên Z-A</option>

                </Input>
            </FormGroup>
         */}
            <FormGroup style={{ margin: '0px' }}>
                <Input type="select" name="select" id="exampleSelect" onChange={(e) => {
                    handleFileter(e)
                }}>
                    <option name="price"  >Lọc</option>
                    <option name="name" value="1">Diễn viên nam</option>
                    <option name="price" value="0">Diễn viên nữ</option>
                </Input>
            </FormGroup>

        </div>
    )
}

export default Sort