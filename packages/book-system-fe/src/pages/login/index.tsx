import { useState } from "react";
import { Button, ConfigProvider, Form, Input, message } from "antd";
import { Link } from "react-router-dom";
import "./login.css";
import { loginUser } from "../../interface";

interface LoginValues {
  username: string;
  password: string;
}

export default function Login() {
  // const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  async function handleLogin({ username, password }: LoginValues) {
    setSubmitting(true);
    try {
      await loginUser(username, password);
      message.success("登录成功");

      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } catch (error) {
      message.error(error instanceof Error ? error.message : "登录失败，请稍后重试");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1677ff",
          borderRadius: 8,
          controlHeight: 46,
          fontSize: 20,
        },
      }}
    >
      <main className="login-page">
        <h1>图书管理系统</h1>
        <Form<LoginValues>
          className="login-form"
          name="login"
          labelCol={{ flex: "0 0 var(--login-label-width)" }}
          wrapperCol={{ flex: "1" }}
          colon={false}
          onFinish={handleLogin}
          disabled={submitting}
        >
          {/* 登录请求后续通过 onFinish 接入，目前仅执行表单校验。 */}
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              { required: true, whitespace: true, message: "请输入用户名" },
            ]}
          >
            <Input placeholder="请输入" autoComplete="username" />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[
              { required: true, message: "请输入密码" },
              { min: 6, message: "密码至少为 6 位" },
            ]}
          >
            <Input.Password
              placeholder="请输入"
              autoComplete="current-password"
            />
          </Form.Item>
          <p className="login-register">
            <Link to="/register">还没有账号？ 去注册</Link>
          </p>
          <Button type="primary" htmlType="submit" block>
            登录
          </Button>
        </Form>
      </main>
    </ConfigProvider>
  );
}
