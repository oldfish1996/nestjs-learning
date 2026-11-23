import { Button, Form, Input, message } from "antd";
import axios from "axios";

function App() {
  const [form] = Form.useForm();

  const login = async (values: { email: string; code: string }) => {
    const res = await axios.post("http://localhost:3000/user/login", {
      email: values.email,
      code: values.code,
    });
    if (res.data === "success") {
      message.success("登录成功");
    } else {
      message.error(res.data.message);
    }
  };

  const sendEmailCode = async () => {
    const res = await axios.get("http://localhost:3000/email/code", {
      params: {
        address: form.getFieldValue("email"),
      },
    });
    message.info(res.data);
  };

  return (
    <div style={{ width: "500px", margin: "100px auto" }}>
      <Form form={form} onFinish={login}>
        <Form.Item
          label="邮箱"
          name="email"
          rules={[
            {
              required: true,
              message: "请输入邮箱地址",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="验证码"
          name="code"
          rules={[
            {
              required: true,
              message: "请输入验证码",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button onClick={sendEmailCode}>发送验证码</Button>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default App;
