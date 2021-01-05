
import React, { useState } from 'react';
import { Modal } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { Form } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';
import { showErrorMessage, showSuccessMessage } from './notification';
import MakeRequest from './MakeRequest';
import { Button } from 'react-bootstrap';
function ModalConfirm(props) {
    const { message } = props
    const [visible, setVisible] = useState(false)

    const showModal = () => {
        console.log("14 in modal");
        setVisible(true)
    }
    const hideModal = () => {
        setVisible(false)
    };
    const handleOk = () => {
        // console.log(props.value);
        props.handleOk(props.value)
        hideModal()
    }
    const handleCancel = () => {
        hideModal()
    }
    return (
        <>
            <DeleteOutlined style={{ paddingLeft: '20px', width: "50px", height: "30px", fontSize: '25px', color: 'blueviolet' }}
                type="primary" onClick={showModal}>
            </DeleteOutlined>
            <Modal
                // title="Thông báo"
                visible={visible}
                onOk={() => { handleOk() }}
                onCancel={() => handleCancel()}
                cancelText="Hủy"
                okText="Xóa"
            >
                <p style={{ fontSize: '15px', fontWeight: 500 }}>{message}</p>
            </Modal>
        </>
    );

}

export default ModalConfirm;