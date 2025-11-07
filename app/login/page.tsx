"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button, Checkbox, Form, Input, Alert } from "antd";

interface FieldType {
  email: string;
  password: string;
  remember?: boolean;
}

const LoginPage: React.FC = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const { data: session } = useSession();

  // ถ้ามี session แล้วให้ redirect ไป /welcome
  if (session) router.replace("/welcome");

  const onFinish = async (values: FieldType) => {
    console.log("Form submitted:", values);

    const res = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    console.log("SignIn result:", res);

    if (res?.error) {
      setError("Invalid email or password");
      return;
    }

    router.replace("/welcome");
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div style={{ maxWidth: 500, margin: "0 auto", padding: "40px 20px" }}>
      
      <h2 style={{ textAlign: "center", marginBottom: 20, }}>Login Page</h2>

      {error && (
        <Alert
          message={error}
          type="error"
          showIcon
          style={{ marginBottom: 20 }}
        />
      )}

      <Form
        name="login"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Invalid email format" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<FieldType>
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" block>
            Sign In
          </Button>
        </Form.Item>
      </Form>

      <p style={{ textAlign: "center" }}>
        Don’t have an account?{" "}
        <Link href="/register" style={{ color: "#1677ff" }}>
          Register
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
