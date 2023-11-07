import { Table, Tag } from "antd";
import { Employee, Roster } from "../../types";

interface Props {
  records: Employee[];
  loading: true | false;
}
export const EmployeeTable: React.FC<Props> = ({ loading, records }) => {
  return (
    <>
      <Table
        rowKey={"_id"}
        columns={[
          { title: "Name", dataIndex: "name" },
          { title: "Email", dataIndex: "email" },
          { title: "Role", dataIndex: "role" },
          {
            title: "Roster",
            dataIndex: "roster",
            render: (a: Roster) => {
              return a ? <Tag color="geekblue">{a.title}</Tag> : "-";
            },
          },
        ]}
        loading={loading}
        pagination={false}
        dataSource={records}
      />
    </>
  );
};
