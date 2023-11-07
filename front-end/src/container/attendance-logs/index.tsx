import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../slice";
import { GetAttendanceLogsAction } from "../../slice/reducer/attendance";
import { Pagination, Table, Image } from "antd";
import { AttendanceLog } from "../../types";

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
            render: (a: string) =>
              a ? <Image width={"200px"} src={a} /> : "-",
          },
          {
            title: "Location",
            dataIndex: "_id",
            key: "_id",
            render: (_: string, data: AttendanceLog) =>
              data.latitude && data.longitude ? (
                <>{`${data.latitude},${data.longitude}`}</>
              ) : (
                "-"
              ),
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
