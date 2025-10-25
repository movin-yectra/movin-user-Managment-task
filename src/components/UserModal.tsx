import { useEffect } from "react";
import { Modal, Form, Input, Button } from "antd";
import { User } from "../types";

// --------------------------------------------------------------------

interface Props {
  open: boolean;
  user: User | null;
  onClose: () => void;
  onSubmit: (values: Partial<User>) => void;
}

// --------------------------------------------------------------------

export default function UserModal({ open, user, onClose, onSubmit }: Props) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (user) form.setFieldsValue(user);
    else form.resetFields();
  }, [user, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      await onSubmit(values);
      form.resetFields();
      onClose();
    } catch {
      // validation handled by Form
    }
  };

  const inputStyle = {
    borderRadius: 3,
    height: 40, // make inputs a little bigger
    fontSize: 14, // slightly larger text
  };

  const buttonStyle = {
    borderRadius: 3, // square buttons
  };

  return (
    <Modal
      title={user ? "Edit user" : "Create user"}
      open={open}
      footer={[
        <Button key="cancel" onClick={onClose} style={buttonStyle}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={handleOk}
          style={buttonStyle}
        >
          {user ? "Update" : "Create"}
        </Button>,
      ]}
      onCancel={onClose}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="first_name"
          label="First name"
          rules={[{ required: true, message: "First name required" }]}
        >
          <Input placeholder="Please enter first name" style={inputStyle} />
        </Form.Item>

        <Form.Item
          name="last_name"
          label="Last name"
          rules={[{ required: true, message: "Last name required" }]}
        >
          <Input placeholder="Please enter last name" style={inputStyle} />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, type: "email", message: "Valid email required" },
          ]}
        >
          <Input placeholder="Please enter email" style={inputStyle} />
        </Form.Item>

        <Form.Item
          name="avatar"
          label="Profile Image Link"
          rules={[{ required: true, message: "Last name required" }]}
        >
          <Input
            placeholder="Please enter profile image link"
            style={inputStyle}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
