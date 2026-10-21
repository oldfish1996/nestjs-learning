import { useState } from "react";
import { Alert, Button, ConfigProvider, Form, Input } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";
import "./register.css";
import { registerUser } from "../../interface";

interface RegisterValues {
  username: string;
  password: string;
  confirmPassword: string;
}

export default function Register() {
  const [form] = Form.useForm<RegisterValues>();
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    text: string;
  }>();

  async function handleRegister({ username, password }: RegisterValues) {
    setSubmitting(true);
    setFeedback(undefined);
    try {
      await registerUser(username, password);

      form.resetFields();
      setFeedback({
        type: "success",
        text: "注册成功，请点击「去登录」登录账号。",
      });
    } catch (error) {
      let text = "注册失败，请稍后重试";
      if (axios.isAxiosError<{ message?: string | string[] }>(error)) {
        const serverMessage = error.response?.data?.message;
        if (typeof serverMessage === "string") {
          text = serverMessage;
        } else if (Array.isArray(serverMessage)) {
          text = serverMessage.join("；");
        } else if (!error.response) {
          text = "无法连接服务器或请求超时，请稍后重试";
        }
      } else if (error instanceof Error) {
        text = error.message;
      }
      setFeedback({ type: "error", text });
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
      <main className="register-page">
        <h1>图书管理系统</h1>
        <Form<RegisterValues>
          className="register-form"
          form={form}
          name="register"
          labelCol={{ flex: "0 0 var(--register-label-width)" }}
          wrapperCol={{ flex: "1" }}
          colon={false}
          onFinish={handleRegister}
          disabled={submitting}
        >
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
            <Input.Password placeholder="请输入" autoComplete="new-password" />
          </Form.Item>
          <Form.Item
            label="确认密码"
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "请再次输入密码" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  return !value || getFieldValue("password") === value
                    ? Promise.resolve()
                    : Promise.reject(new Error("两次输入的密码不一致"));
                },
              }),
            ]}
          >
            <Input.Password placeholder="请输入" autoComplete="new-password" />
          </Form.Item>
          <div className="register-actions">
            <p className="register-login">
              <Link to="/login">已有账号？ 去登录</Link>
            </p>
            {feedback && (
              <div role="status">
                <Alert type={feedback.type} title={feedback.text} showIcon />
              </div>
            )}
            <Button type="primary" htmlType="submit" block loading={submitting}>
              注册
            </Button>
          </div>
        </Form>
      </main>
    </ConfigProvider>
  );
}
