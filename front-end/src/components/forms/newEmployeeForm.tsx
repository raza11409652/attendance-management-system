import { Button, Form, Input, Select } from "antd";
import { CreateEmployee, Roster } from "../../types";
import React from "react";
import { createEmployeeApi } from "../../apis/employee";
interface Props {
  rosters: Roster[];
  onSuccess: () => void;
  // onSubmit: (a: CreateEmployee) => void;
}
export const NewEmployeeForm: React.FC<Props> = ({ rosters, onSuccess }) => {
  const [loader, setLoader] = React.useState(false);
  const b: CreateEmployee = {
    name: "",
    password: "",
    email: "",
    roster: "",
  };
  const submit = (a: CreateEmployee) => {
    setLoader(true);
    createEmployeeApi(a)
      .then(() => {
        onSuccess();
        // console.log(a);
      })
      .finally(() => setLoader(false));
  };
  return (
    <>
      <Form
        layout="vertical"
        initialValues={b}
        requiredMark={false}
        onFinish={submit}
      >
        <Form.Item
          label="Employee name"
          name={"name"}
          rules={[{ required: true, message: "Name is required" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Employee email"
          name={"email"}
          rules={[
            { required: true, message: "Email is required" },
            { type: "email", message: "Email is invalid" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Employee Password"
          name={"password"}
          rules={[{ required: true, message: "Password is required" }]}
        >
          <Input type="password" />
        </Form.Item>
        <Form.Item
          label="Select Roster / Shift"
          name={"roster"}
          rules={[{ required: true, message: "Email is required" }]}
        >
          <Select
            options={rosters.map((a) => {
              return { value: a._id, label: a.title };
            })}
          />
        </Form.Item>
        <Form.Item>
          <Button loading={loader} htmlType="submit">
            Create
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
