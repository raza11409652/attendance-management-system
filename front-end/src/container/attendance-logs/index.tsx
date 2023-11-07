import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../slice";
import { GetAttendanceLogsAction } from "../../slice/reducer/attendance";
import { Pagination, Table } from "antd";

interface Props {
  user?: string;
}
export const AttendanceLogs: React.FC<Props> = ({ user }) => {
  const { loading, logs, totalCount, currentPage } = useAppSelector(
    (a) => a.attendance
  );
  const [page, setPage] = useState(1);
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(GetAttendanceLogsAction({ page, user }));
  }, [page, dispatch, user]);
  return (
    <>
      <Table
        rowKey={"_id"}
        loading={loading}
        dataSource={logs}
        columns={[
          { title: "Date", dataIndex: "date", key: "date" },
          {
            title: "Check in",
            dataIndex: "checkInTimestamp",
            key: "checkInTimestamp",
          },
          {
            title: "Check out",
            dataIndex: "checkOutTimestamp",
            key: "checkOutTimestamp",
          },
          {
            title: "Image",
            dataIndex: "image",
            key: "image",
          },
          {
            title: "Location",
            dataIndex: "image",
            key: "image",
          },
        ]}
        pagination={false}
      />
      <Pagination
        total={totalCount}
        pageSize={50}
        current={currentPage}
        onChange={() => setPage((a) => a + 1)}
      />
    </>
  );
};
