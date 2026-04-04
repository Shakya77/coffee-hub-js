"use client";

import Link from "next/link";
import {
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  Select,
  Typography,
  message,
} from "antd";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { roleOptions } from "@/constants";

const { Title, Text } = Typography;
const inputIconStyle = { marginInlineEnd: 6 };

const roleFieldConfig = {
  farmer: [
    {
      name: "farmName",
      label: "Farm Name",
      placeholder: "Green Valley Farm",
      rules: [{ required: true, message: "Please enter farm name" }],
    },
    {
      name: "farmLocation",
      label: "Farm Location",
      placeholder: "Addis Ababa",
      rules: [{ required: true, message: "Please enter farm location" }],
    },
    {
      name: "farmSize",
      label: "Farm Size (hectares)",
      component: "number",
      min: 1,
      rules: [{ required: true, message: "Please enter farm size" }],
    },
  ],
  vendor: [
    {
      name: "businessName",
      label: "Business Name",
      placeholder: "Coffee Hub Traders",
      rules: [{ required: true, message: "Please enter business name" }],
    },
    {
      name: "businessType",
      label: "Business Type",
      placeholder: "Roastery / Retail / Distribution",
      rules: [{ required: true, message: "Please enter business type" }],
    },
    {
      name: "contactNumber",
      label: "Contact Number",
      placeholder: "+251 9XX XXX XXX",
      rules: [{ required: true, message: "Please enter contact number" }],
    },
  ],
  agronomist: [
    {
      name: "specialization",
      label: "Specialization",
      placeholder: "Soil management, pest control...",
      rules: [{ required: true, message: "Please enter specialization" }],
    },
    {
      name: "licenseNumber",
      label: "License Number",
      placeholder: "AG-2026-001",
      rules: [{ required: true, message: "Please enter license number" }],
    },
    {
      name: "yearsExperience",
      label: "Years of Experience",
      component: "number",
      min: 0,
      rules: [{ required: true, message: "Please enter years of experience" }],
    },
  ],
};

function RoleSpecificFields({ role }) {
  if (!role || !roleFieldConfig[role]) {
    return null;
  }

  return roleFieldConfig[role].map((field) => (
    <Form.Item
      key={field.name}
      name={field.name}
      label={field.label}
      rules={field.rules}
    >
      {field.component === "number" ? (
        <InputNumber
          size="middle"
          className="w-full!"
          min={field.min ?? 0}
          placeholder={field.placeholder}
        />
      ) : (
        <Input size="middle" placeholder={field.placeholder} />
      )}
    </Form.Item>
  ));
}

export default function RegisterForm() {
  const [form] = Form.useForm();
  const selectedRole = Form.useWatch("role", form);

  const onFinish = (values) => {
    message.success("Registration form submitted");
    console.log("Register payload:", values);
  };

  return (
    <section className="min-h-screen bg-linear-to-b from-sand via-cream to-sand px-4 py-8 sm:py-12">
      <div className="mx-auto w-full max-w-xl">
        <Card className="rounded-2xl border border-moss/20 shadow-soft">
          <div className="mb-6 text-center">
            <Title level={3} className="mb-1! text-forest!">
              Create Your Account
            </Title>
            <Text className="text-moss">
              Fill in your details and we will tailor onboarding based on your
              role.
            </Text>
          </div>

          <Form
            form={form}
            name="register"
            layout="vertical"
            requiredMark={false}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              name="fullName"
              label="Full Name"
              rules={[
                { required: true, message: "Please enter your full name" },
              ]}
            >
              <Input
                size="middle"
                prefix={<UserOutlined style={inputIconStyle} />}
                placeholder="Your full name"
              />
            </Form.Item>

            <Form.Item
              name="role"
              label="Role"
              rules={[{ required: true, message: "Please select your role" }]}
            >
              <Select
                size="middle"
                placeholder="Select role"
                options={roleOptions}
              />
            </Form.Item>

            <RoleSpecificFields role={selectedRole} />

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
                { min: 8, message: "Password must be at least 8 characters" },
              ]}
            >
              <Input.Password
                size="middle"
                prefix={<LockOutlined style={inputIconStyle} />}
                placeholder="Create password"
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label="Confirm Password"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Please confirm your password" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject(new Error("Passwords do not match"));
                  },
                }),
              ]}
            >
              <Input.Password
                size="middle"
                prefix={<LockOutlined style={inputIconStyle} />}
                placeholder="Confirm password"
              />
            </Form.Item>

            <Form.Item className="mb-2!">
              <Button type="primary" htmlType="submit" block size="middle">
                Register
              </Button>
            </Form.Item>
          </Form>

          <Text className="block text-center text-moss">
            Already have an account? <Link href="/login">Login</Link>
          </Text>
        </Card>
      </div>
    </section>
  );
}
