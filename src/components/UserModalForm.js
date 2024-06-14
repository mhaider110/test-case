import React, { useEffect, useRef } from 'react';
import { DatePicker, Form, Input, Modal, Select, Button, InputNumber } from 'antd';
import moment from 'moment';
import iconOptions from '../utils/icon-options';
// reset form fields when modal is form, closed
const useResetFormOnCloseModal = ({ form, open }) => {
  const prevOpenRef = useRef();

  useEffect(() => {
    prevOpenRef.current = open;
  }, [open]);

  const prevOpen = prevOpenRef.current;

  useEffect(() => {
    if (!open && prevOpen) {
      form.resetFields();
    }
  }, [form, prevOpen, open]);

};

export const ModalForm = ({ open, onCancel, selectedUser, isEdit, deleteUser }) => {
  const [form] = Form.useForm();

  useResetFormOnCloseModal({ form, open });

  const onOk = () => {
    form.submit();
  };

  useEffect(() => {
    if (selectedUser) {
      form.setFieldsValue({
        ID: selectedUser.id,
        Name: selectedUser.name,
        About: selectedUser.about,
        Birthday: moment(selectedUser.birthday, 'MMMM DD, YYYY'),
        Icon: selectedUser.icon
      })
    }
    // eslint-disable-next-line
  }, [selectedUser]);

  return (
    <Modal title={isEdit ? 'Edit user' : 'Add user'}
      open={open}
      okText={isEdit ? 'Save' : 'Add'}
      onOk={onOk}
      okButtonProps={{ 'data-testid': 'addNow' }}
      onCancel={onCancel}
      cancelText={'Close'}>
      <Form form={form} layout="vertical" name="userForm">
        <Form.Item
          name="ID"
          label="ID"
          rules={[{ required: true }]}>
          <InputNumber disabled={isEdit} style={{ width: '100%' }} data-testid="field-ID"  />
        </Form.Item>
        <Form.Item
          name="Name"
          label="Name"
          rules={[{ required: true }]}>
          <Input  data-testid="field-name"/>
        </Form.Item>
        <Form.Item
          name="Birthday"
          label="Birthday"
          rules={[{ required: true }]}>
          <DatePicker style={{ width: '100%' }} data-testid="field-dob"/>
        </Form.Item>
        <Form.Item
          name="About"
          label="About"
          rules={[{ required: true }]}>
          <Input.TextArea placeholder='About user' data-testid="field-about"/>
        </Form.Item>
        <Form.Item
          name="Icon"
          initialValue={'🆕'}
          label="Logo">
          <Select options={iconOptions} />
        </Form.Item>

        {isEdit && <Form.Item>
          <Button htmlType="button" danger onClick={() => {
            deleteUser(selectedUser.id);
            onCancel();
          }}>Delete
          </Button>
        </Form.Item>}
      </Form>
    </Modal>
  );
};
