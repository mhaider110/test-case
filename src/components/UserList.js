import React, { useState } from 'react';
import {
  Table,
  Space,
  Button,
  Popconfirm,
  Card,
  Row,
  Col,
  Form,
  message
} from "antd";
import { DeleteFilled, EditFilled } from '@ant-design/icons';
import { PlusOutlined } from '@ant-design/icons';
import usersData from '../utils/default-user-data';
import { ModalForm } from './UserModalForm';
function UserList() {
  const [users, setUsers] = useState([...usersData]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();

  const columns = [
    {
      title: 'Name',
      key: 'name',
      render: (_, row) => (
        <Space size="small">
          {row.icon} {row.name}
        </Space>
      )
    },
    {
      title: 'Birthday',
      dataIndex: 'birthday',
      key: 'birthday',
    },
    {
      title: 'About',
      dataIndex: 'about',
      key: 'about',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, row) => (
        <Space size="small">
          <Button type='primary' ghost icon={<EditFilled />} data-testid={`edit${row.id}`} onClick={() => { showUserModal({ ...row }) }}></Button>
          <Popconfirm
            title="Delete user"
            description={`Are you sure to delete ${row.name} ${row.icon} ?`}
            onConfirm={() => handleDeleteUser(row.id)}
            okText="Yes"
            cancelText="No">
            <Button danger icon={<DeleteFilled />} data-testid={`delete${row.id}`}></Button>
          </Popconfirm>

        </Space>
      ),
    },
  ];

  const showUserModal = (user = null) => {
    setSelectedUser(user);
    setIsEditMode(user !== null);
    setOpen(true);
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const handleAddUser = (user) => {
    setUsers([...users, user]);
  };

  const handleUpdateUser = (newUser) => {
    setUsers(users.map(user => user.id === newUser.id ? newUser : user));
  };

  const hideUserModal = () => {
    setOpen(false);
  };

  const error = (errorText) => {
    messageApi.open({
      type: 'error',
      content: errorText
    });
  };

  return (
    <Row>
      <Col span={24}>
        <Card
          title="Users"
          styles={{ body: { 'padding': 0 } }}
          extra={
            <Button data-testid='addNewUser' type="primary" icon={<PlusOutlined />} iconPosition={'end'} onClick={() => showUserModal()} >
              Add new user
            </Button>
          }
          style={{
            margin: '16px'
          }}>
          <Table
            data-testid='usersTable'
            dataSource={[...users]}
            columns={columns}
            rowKey={({ id }) => id}
            pagination={{
              total: users.length,
              defaultCurrent: 1,
              defaultPageSize: 8,
              showTotal: (total) => `Total ${total} items`
            }} />
          <Form.Provider
            onFormFinish={(name, { values, forms }) => {
              if (name === 'userForm') {
                const userFormValues = {
                  id: values.ID,
                  name: values.Name,
                  about: values.About,
                  birthday: values?.Birthday?.format('MMMM DD, YYYY') || '',
                  icon: values.Icon || "🆕"
                }
                if (isEditMode) {
                  handleUpdateUser(userFormValues);
                  setOpen(false);
                } else {
                  if (users.findIndex((user) => Number(user.id) === Number(values.ID)) === -1) {
                    handleAddUser(userFormValues);
                    setOpen(false);
                  } else {
                    error(`ID ${values.ID} is already exist.`)
                  }
                }
              }
            }}>
            <ModalForm
              open={open}
              onCancel={hideUserModal}
              selectedUser={selectedUser}
              isEdit={isEditMode}
              deleteUser={handleDeleteUser}
            />
            {contextHolder}
          </Form.Provider>
        </Card>
      </Col>
    </Row>
  )
}
export default UserList;