import './App.css';
import React, { useState } from 'react';
import { Modal, Button, Input } from 'antd';

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

const App = () => {
  const [state, setState] = useState({
    users: usersData,
    selectedUser: null,
    isModalVisible: false,
    newUserName: '',
    isEditMode: false
  });

  const showModal = (user = null) => {
    setState(prevState => ({
      ...prevState,
      selectedUser: user,
      isEditMode: !!user,
      isModalVisible: true
    }));
  };

  const handleOk = () => {
    if (state.isEditMode) {
      setState(prevState => ({
        ...prevState,
        users: prevState.users.map(user => user.id === prevState.selectedUser.id ? { ...user, name: state.newUserName } : user),
        isModalVisible: false,
        newUserName: ''
      }));
    } else {
      setState(prevState => ({
        ...prevState,
        users: [...prevState.users, { id: prevState.users.length + 1, name: state.newUserName, icon: "🆕" }],
        isModalVisible: false,
        newUserName: ''
      }));
    }
  };

  const handleDelete = () => {
    setState(prevState => ({
      ...prevState,
      users: prevState.users.filter(user => user.id !== prevState.selectedUser.id),
      isModalVisible: false,
      newUserName: ''
    }));
  };

  return (
    <div style={{ padding: '20px' }}>
      <ul style={{ listStyle: 'none', padding: '0' }}>
        {state.users.map(user => (
          <li key={user.id} style={{ margin: '10px 0' }}>
            <span>{user.icon} {user.name}</span>
            <Button onClick={() => showModal(user)}>Edit</Button>
          </li>
        ))}
      </ul>
      <Button onClick={() => showModal()}>Add User</Button>
      <Modal
        title={state.isEditMode ? 'Edit User' : 'Add User'}
        open={state.isModalVisible}
        onOk={handleOk}
        onCancel={() => setState(prevState => ({ ...prevState, isModalVisible: false }))}
        footer={[
          state.isEditMode && <Button key="delete" onClick={handleDelete}>Delete</Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            {state.isEditMode ? 'Save' : 'Add'}
          </Button>
        ]}
      >
        <Input
          placeholder="User Name"
          value={state.newUserName}
          onChange={e => setState(prevState => ({ ...prevState, newUserName: e.target.value }))}
        />
      </Modal>
    </div>
  );
};

export default App;