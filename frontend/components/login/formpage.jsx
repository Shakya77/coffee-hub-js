"use client";

import { Button, Card, Form, Input, Tabs, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const { Title } = Typography;

const onChange = (key) => {
  console.log(key);
};

const VendorComponent = () => {
  return (
    <Form.Item
      name="contactNumber"
      label="Contact Number"
      rules={[{ required: true, message: "Please input your contact number!" }]}
    >
      <Input prefix={<UserOutlined />} placeholder="Whatsapp business Number" />
    </Form.Item>
  );
};

const items = [
  {
    key: "1",
    label: "Farmer",
    children: (
      <Form.Item
        name="contactNumber"
        label="Contact Number"
        rules={[
          { required: true, message: "Please input your contact number!" },
        ]}
      >
        <Input prefix={<UserOutlined />} placeholder="Contact Number" />
      </Form.Item>
    ),
  },
  {
    key: "2",
    label: "Vendor",
    children: <VendorComponent />,
  },
];

export const RoleTab = () => {
  return <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;
};

export default function FormPage({ type, path }) {
  const onFinish = (values) => {};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md shadow-xl rounded-2xl">
        <Title level={3} className="text-center mb-6">
          {type === "login" ? "Login" : "Register"}
        </Title>

        <Form
          name={type}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
        >
          {type === "register" ? (
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input prefix={<UserOutlined />} placeholder="Name" />
            </Form.Item>
          ) : null}

          {type === "register" ? (
            <>
              <RoleTab />
            </>
          ) : null}

          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full rounded-lg h-10"
            >
              {type === "login" ? "Log in" : "Sign up"}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
