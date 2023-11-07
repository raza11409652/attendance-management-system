import { Input, Form, Button, Typography } from "antd";
import { NavLink } from "react-router-dom";
import { LoginBody } from "../../types";
import { useAppDispatch, useAppSelector } from "../../slice";
import { LoginAction } from "../../slice/reducer/auth";
// import { loginApi } from "../../apis/auth";
// import { Form } from "react-router-dom";

export const LoginContainer = () => {
  const dispatch = useAppDispatch();
  const b: LoginBody = { email: "", password: "" };
  const loading = useAppSelector((a) => a.auth.loading);
  const submitLogin = (body: LoginBody) => {
    dispatch(LoginAction(body));
  };
  return (
    <div className="auth-wrapper">
      <div className="auth-form">
        <Form layout="vertical" initialValues={b} onFinish={submitLogin}>
          <Form.Item
            name={"email"}
            label="Email"
            rules={[
              { type: "email", message: "Valid email is required" },
              { required: true, message: "Valid email is required" },
            ]}
          >
            <Input type="email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name={"password"}
            rules={[
              // { type: "", message: "Valid email is required" },
              { required: true, message: "Password is required" },
            ]}
          >
            <Input type="password" />
          </Form.Item>
          <Form.Item>
            <Button loading={loading} htmlType="submit">
              Login
            </Button>
          </Form.Item>
          <Form.Item>
            <Typography.Text>
              Don't have account <NavLink to={"/register"}>Register </NavLink>{" "}
              here
            </Typography.Text>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
