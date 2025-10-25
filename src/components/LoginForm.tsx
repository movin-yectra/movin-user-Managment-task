import { Card, Form, Input, Button, Checkbox, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { login } from "../redux/actions";
import { useNavigate } from "react-router-dom";

// --------------------------------------------------------------------

const defaultCreds = { email: "eve.holt@reqres.in", password: "cityslicka" };

// --------------------------------------------------------------------

export default function LoginForm() {
  const dispatch: any = useDispatch();
  const navigate = useNavigate();

  const savedCreds = JSON.parse(localStorage.getItem("rememberMe") || "null");

  const onFinish = async (
    values: typeof defaultCreds & { remember: boolean }
  ) => {
    try {
      await dispatch(login(values.email, values.password));
      message.success("Login successful");

      if (values.remember) {
        localStorage.setItem(
          "rememberMe",
          JSON.stringify({ email: values.email, password: values.password })
        );
      } else {
        localStorage.removeItem("rememberMe");
      }

      navigate("/users");
    } catch (err: any) {
      message.error(err?.message || "Login failed");
    }
  };

  const inputStyle = {
    borderRadius: 3,
    height: 40, // make inputs a little bigger
    fontSize: 14, // slightly larger text
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#f0f2f5",
      }}
    >
      <Card
        style={{
          width: 460,
        }}
      >
        <Form
          layout="vertical"
          initialValues={{
            email: savedCreds?.email || defaultCreds.email,
            password: savedCreds?.password || defaultCreds.password,
            remember: !!savedCreds,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Email required" }]}
          >
            <Input
              prefix={<UserOutlined style={{ paddingRight: 10 }} />}
              style={inputStyle}
            />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Password required" }]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ paddingRight: 10 }} />}
              style={inputStyle}
            />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <Form.Item>
            <Button type="primary" block htmlType="submit" style={inputStyle}>
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
