
import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { ProfileOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';

function ModalSharing(props) {
    const [visible, setVisible] = useState(false)


    const showModal = () => {
        setVisible(true)
    }
    const hideModal = () => {
        setVisible(false)
    };

    return (
        <>
            <ProfileOutlined style={{ fontSize: '25px', color: 'blueviolet' }}
                type="primary" onClick={showModal}>
            </ProfileOutlined>
            <Modal
                title="Thông tin chi tiết"
                visible={visible}
                onOk={hideModal}
                onCancel={hideModal}
                okText="Chỉnh sửa"
                cancelText="Đóng"
            >
                <Form>
                    <Form.Item name="Tên" label="Tên" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );

}

export default ModalSharing;