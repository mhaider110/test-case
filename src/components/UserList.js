import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Table, Space, Button, Popconfirm, Modal, Input, Card, Row, Col, DatePicker } from "antd";
import { DeleteFilled, EditFilled } from '@ant-design/icons';
import { PlusOutlined } from '@ant-design/icons';

const usersData = [
  {
    id: 1,
    name: "Elon Musk",
    icon: "🚀",
    birthday: "June 28, 1971",
    about: "CEO of SpaceX and Tesla, Inc."
  },
  {
    id: 2,
    name: "Bill Gates",
    icon: "💻",
    birthday: "October 28, 1955",
    about: "Co-founder of Microsoft Corporation"
  },
  {
    id: 3,
    name: "Mark Zuckerberg",
    icon: "🌐",
    birthday: "May 14, 1984",
    about: "Co-founder and CEO of Facebook, Inc."
  },
  {
    id: 4,
    name: "Sundar Pichai",
    icon: "🔍",
    birthday: "June 10, 1972",
    about: "CEO of Alphabet Inc. and Google LLC"
  },
  {
    id: 5,
    name: "Tim Cook",
    icon: "🍏",
    birthday: "November 1, 1960",
    about: "CEO of Apple Inc."
  },
  {
    id: 6,
    name: "Satya Nadella",
    icon: "☁️",
    birthday: "August 19, 1967",
    about: "CEO of Microsoft Corporation"
  },
  {
    id: 7,
    name: "Jeff Bezos",
    icon: "🛒",
    birthday: "January 12, 1964",
    about: "Founder and former CEO of Amazon.com, Inc."
  }
];


function UserList() {

  const [users, setUsers] = useState([...usersData]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [newUser, setNewUser] = useState({
    id: 0,
    name: "",
    icon: "",
    birthday: "",
    about: ""
  });



  const showModal = (user = null) => {
    setIsModalVisible(true);
    setIsEditMode(user !== null);
    setNewUser(user);
  };

  const handleSave = () => {
    if (isEditMode) {
      setUsers(users.map(user => user.id === newUser.id ? { ...newUser } : user));
      setIsModalVisible(false);
      setNewUser(null);
    } else {
      setUsers([...users, { ...newUser, icon: "🆕" }]);
      setIsModalVisible(false);
      setNewUser(null);
    }
  };

  const handleDelete = (id) => {
    setUsers(users.filter(user => user.id !== id));
    setIsModalVisible(false);
  };

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
          <Button type='primary' ghost icon={<EditFilled />} onClick={() => showModal(row)}></Button>
          <Popconfirm
            title="Delete user"
            description={`Are you sure to delete ${row.name} ${row.icon} ?`}
            onConfirm={() => handleDelete(row.id)}
            okText="Yes"
            cancelText="No">
            <Button danger icon={<DeleteFilled />}></Button>
          </Popconfirm>

        </Space>
      ),
    },
  ];

  return (
    <Row>
      <Col span={24}>
        <Card
          title="Users"
          extra={
            <Button type="primary" icon={<PlusOutlined />} iconPosition={'end'} onClick={() => showModal()} >
              Add new user
            </Button>
          }
          style={{
            margin: '16px'
          }}>
          <Table
            dataSource={[...users]}
            columns={columns}
            rowKey={({ id }) => id}
            pagination={{
              total: users.length,
              defaultCurrent: 1,
              defaultPageSize: 5,
              showTotal: (total) => `Total ${total} items`
            }} />
          <Modal
            title={isEditMode ? 'Edit User' : 'Add User'}
            open={isModalVisible}
            onOk={handleSave}
            onCancel={() => setIsModalVisible(false)}
            footer={[
              isEditMode && <Button key="delete" onClick={() => handleDelete(newUser.id)}>Delete</Button>,
              <Button key="submit" type="primary" onClick={handleSave}>
                {isEditMode ? 'Save' : 'Add'}
              </Button>
            ]}>
            <Input
              placeholder="ID"
              style={{ marginBottom: '7px' }}
              value={newUser?.id || Math.round(Math.random() * 10) }
              onChange={e => setNewUser({ ...newUser, id: e.target.value })}
            />
            <Input
              placeholder="User Name"
              style={{ marginBottom: '7px' }}
              value={newUser?.name || ''}
              onChange={e => setNewUser({ ...newUser, name: e.target.value })}
            />
            <DatePicker
              placeholder='Birthday'
              style={{ marginBottom: '7px' }}
              onChange={(date, dateString) => setNewUser({ ...newUser, birthday: dateString })} />
            <Input
              placeholder="About"
              style={{ marginBottom: '7px' }}
              value={newUser?.about || ''}
              onChange={e => setNewUser({ ...newUser, about: e.target.value })}
            />

          </Modal>
        </Card>
      </Col>
    </Row>


  )
}

UserList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    birthday: PropTypes.string.isRequired,
    about: PropTypes.string.isRequired,
  }))
};

export default UserList;