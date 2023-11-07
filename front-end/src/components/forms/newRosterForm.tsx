import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  message,
} from "antd";
import { Days, NewRosterBody } from "../../types";
import dayjs from "dayjs";
import { rosterCreateApi } from "../../apis/roster";
import React from "react";
// import dayjs from "dayjs";
interface Props {
  onSuccess: () => void;
}
export const NewRosterForm: React.FC<Props> = ({ onSuccess }) => {
  const [loader, setLoader] = React.useState(false);
  const obj: NewRosterBody = {
    title: "",
    shift: [
      {
        day: "MONDAY",
        startTime: "",
        endTime: "",
      },
      { day: "TUESDAY", startTime: "", endTime: "" },
      { day: "WEDNESDAY", startTime: "", endTime: "" },
      { day: "THURSDAY", startTime: "", endTime: "" },
      { day: "FRIDAY", startTime: "", endTime: "" },
      { day: "SATURDAY", startTime: "", endTime: "" },
      { day: "SUNDAY", startTime: "", endTime: "" },
    ],
  };
  const [form] = Form.useForm();
  const submitRequest = (body: NewRosterBody) => {
    // console.log(dayjs(body.shift[0].startTime).format("HH:mm:ss"));
    body = {
      ...body,
      shift: body.shift
        .filter((a) => a.startTime && a.endTime)
        .map((a) => {
          return {
            ...a,
            startTime: a.startTime ? dayjs(a.startTime).format("HH:mm:ss") : "",
            endTime: a.endTime ? dayjs(a.endTime).format("HH:mm:ss") : "",
          };
        }),
    };
    // console.log(body);
    setLoader(true);
    rosterCreateApi(body)
      .then(() => {
        onSuccess();
        message.success("Added ");
      })
      .finally(() => setLoader(false));
  };
  return (
    <>
      <Form
        initialValues={obj}
        layout="vertical"
        form={form}
        onFinish={submitRequest}
      >
        <Form.Item
          name={"title"}
          label="Enter title"
          rules={[{ required: true, message: "Title is required" }]}
        >
          <Input />
        </Form.Item>
        <Form.List name={"shift"}>
          {(item) => {
            return (
              <>
                {item.map((a, index) => {
                  return (
                    <Row
                      gutter={24}
                      style={{ alignItems: "center" }}
                      key={index}
                    >
                      <Col span={8}>
                        <Form.Item label="Select Day" name={[a.name, "day"]}>
                          <Select
                            disabled
                            //   value={form.getFieldValue("day")}
                            options={Days.map((ab) => {
                              return { value: ab, label: ab };
                            })}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={5}>
                        <Form.Item
                          label="Start time"
                          name={[a.name, "startTime"]}
                        >
                          <DatePicker picker="time" />
                        </Form.Item>
                      </Col>
                      <Col span={5}>
                        <Form.Item
                          label="Start time"
                          name={[a.name, "endTime"]}
                        >
                          <DatePicker picker="time" />
                        </Form.Item>
                      </Col>
                      {/* <Col span={2}>
                        <Button
                          danger
                          type="text"
                          onClick={() => remove(index)}
                        >
                          Remove
                        </Button>
                      </Col> */}
                    </Row>
                  );
                })}
              </>
            );
          }}
        </Form.List>
        <Form.Item>
          <Button htmlType="submit" loading={loader}>
            Save
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
