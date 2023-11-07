import { Button, Table, Tag } from "antd";
import { Employee, Roster } from "../../types";

interface Props {
  records: Employee[];
  loading: true | false;
  onClick?: (id: string) => void;
}
export const EmployeeTable: React.FC<Props> = ({
  loading,
  records,
  onClick,
}) => {
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
          ...(onClick
            ? [
                {
                  title: "Action",
                  dataIndex: "_id",
                  render: (a: string) => (
                    <Button onClick={() => onClick(a)}>View Logs</Button>
                  ),
                },
              ]
            : []),
        ]}
        loading={loading}
        pagination={false}
        dataSource={records}
      />
    </>
  );
};
