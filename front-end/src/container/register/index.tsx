import { Button, Form, Input, Typography } from "antd";
import { NavLink } from "react-router-dom";
export const RegisterContainer = () => {
  return (
    <div className="auth-wrapper">
      <div className="auth-form">
        <Form layout="vertical">
          <Form.Item label="Name">
            <Input />
          </Form.Item>
          <Form.Item label="Email">
            <Input type="email" />
          </Form.Item>
          <Form.Item label="Password">
            <Input type="password" />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit">Register</Button>
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
