import { Button, Form, Input, Typography, message } from "antd";
import { NavLink } from "react-router-dom";
import { RegisterBody } from "../../types";
import { useState } from "react";
import { registerApi } from "../../apis/auth";
export const RegisterContainer = () => {
  const [loader, setLoader] = useState(false);
  const body: RegisterBody = { name: "", email: "", password: "" };
  // const navigation = useLocation()
  const submit = (a: RegisterBody) => {
    setLoader(true);
    // console.log(a);
    registerApi(a)
      .then(() => {
        message.success("Registration success , Login");
        // navigation({t})
      })
      .catch(() => message.warning("Invalid data passed , Register failed"))
      .finally(() => setLoader(false));
  };
  return (
    <div className="auth-wrapper">
      <div className="auth-form">
        <Form layout="vertical" initialValues={body} onFinish={submit}>
          <Form.Item
            label="Name"
            name={"name"}
            rules={[{ required: true, message: "Name is required" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name={"email"}
            rules={[
              { required: true, message: "Email is required" },
              { type: "email", message: "Email is required" },
            ]}
          >
            <Input type="email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name={"password"}
            rules={[
              { required: true, message: "Password is required" },
              // { type: "email", message: "Email is required" },
            ]}
          >
            <Input type="password" />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" loading={loader}>
              Register
            </Button>
          </Form.Item>
          <Form.Item>
            <Typography.Text>
              Already have account <NavLink to={"/"}>Login </NavLink> here
            </Typography.Text>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
