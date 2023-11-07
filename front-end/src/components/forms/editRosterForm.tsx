import React from "react";
import { Days, Roster } from "../../types";
import { Button, Col, Form, Input, Row, Select } from "antd";
// import Dayjs from "dayjs";

interface Props {
  data: Roster;
  mode: string;
}
export const EditRosterForm: React.FC<Props> = ({ data, mode }) => {
  const init = {
    ...data,
    timeTable: data.timeTable.map((a) => {
      return {
        ...a,
        // startTime: Dayjs(a.startTime),
        // endTime: Dayjs(a.endTime),
      };
    }),
  };
  return (
    <>
      <Form initialValues={init} layout="vertical" disabled={mode === "view"}>
        <Form.Item name={"title"} label="Title">
          <Input />
        </Form.Item>
        <Form.List name={"timeTable"}>
          {(item,{remove}) => {
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
                          <Input />
                        </Form.Item>
                      </Col>
                      <Col span={5}>
                        <Form.Item
                          label="Start time"
                          name={[a.name, "endTime"]}
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                      <Col span={2}>
                        <Button
                          danger
                          type="text"
                          onClick={() => remove(index)}
                        >
                          Remove
                        </Button>
                      </Col>
                    </Row>
                  );
                })}
              </>
            );
          }}
        </Form.List>
      </Form>
    </>
  );
};
