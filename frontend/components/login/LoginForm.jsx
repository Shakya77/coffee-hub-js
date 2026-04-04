"use client";

import Link from "next/link";
import { Button, Card, Form, Input, Typography, message } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;
const inputIconStyle = { marginInlineEnd: 6 };

export default function LoginForm() {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    message.success("Login form submitted");
    console.log("Login payload:", values);
    form.resetFields(["password"]);
  };

  return (
    <section className="min-h-screen bg-linear-to-b from-sand via-cream to-sand px-4 py-8 sm:py-12">
      <div className="mx-auto flex w-full max-w-md items-center justify-center">
        <Card className="w-full rounded-2xl border border-moss/20 shadow-soft">
          <div className="mb-6 text-center">
            <Title level={3} className="mb-1! text-forest!">
              Welcome Back
            </Title>
            <Text className="text-moss">
              Login with your email and password.
            </Text>
          </div>

          <Form
            form={form}
            name="login"
            layout="vertical"
            requiredMark={false}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Please enter your email" },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input
                size="middle"
                prefix={<MailOutlined style={inputIconStyle} />}
                placeholder="you@example.com"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please enter your password" },
              ]}
            >
              <Input.Password
                size="middle"
                prefix={<LockOutlined style={inputIconStyle} />}
                placeholder="Enter password"
              />
            </Form.Item>

            <Form.Item className="mb-2!">
              <Button type="primary" htmlType="submit" block size="middle">
                Login
              </Button>
            </Form.Item>
          </Form>

          <Text className="block text-center text-moss">
            Don&apos;t have an account?{" "}
            <Link href="/register">Register now</Link>
          </Text>
        </Card>
      </div>
    </section>
  );
}
