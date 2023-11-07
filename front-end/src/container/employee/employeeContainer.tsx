import React from "react";
import { useAppDispatch, useAppSelector } from "../../slice";
import { GetEmployeeListAction } from "../../slice/reducer/employee";
import { EmployeeTable } from "./employeeTable";
import { Button, Drawer, Pagination, Typography } from "antd";
import { NewEmployeeForm } from "../../components/forms/newEmployeeForm";
import { GetRostersAction } from "../../slice/reducer/roster";
import { AttendanceLogs } from "../attendance-logs";
// import { CreateEmployee } from "../../types";

export const EmployeeContainer = () => {
  const { rosters } = useAppSelector((a) => a.roster);
  const [open, setOpen] = React.useState(false);
  const [userId, setUser] = React.useState("");

  const [openLogs, setOpenLogs] = React.useState(false);

  const dispatch = useAppDispatch();
  const { loader, records, totalCount, currentPage } = useAppSelector(
    (a) => a.employee
  );
  const [page, setPage] = React.useState(1);
  React.useEffect(() => {
    // console.log(page);
    dispatch(GetEmployeeListAction(page));
  }, [dispatch, page]);

  const onSuccess = () => {
    dispatch(GetEmployeeListAction(page));
    setOpen(false);
  };
  const showLogs = (a: string) => {
    // console.log(a);
    setUser(a);
    setOpenLogs(true);
  };
  return (
    <>
      <div className="app-body">
        <div className="header">
          <Typography.Text>Employee List</Typography.Text>
          <Button
            onClick={() => {
              dispatch(GetRostersAction());
              setOpen(true);
            }}
            type="text"
          >
            Add new employee
          </Button>
        </div>
        <div className="body">
          <EmployeeTable
            loading={loader}
            records={records}
            onClick={showLogs}
          />
        </div>
        <div className="footer">
          <Pagination
            total={totalCount}
            pageSize={50}
            current={currentPage}
            onChange={() => setPage((a) => a + 1)}
          />
        </div>
      </div>
      <Drawer
        destroyOnClose
        children={<NewEmployeeForm onSuccess={onSuccess} rosters={rosters} />}
        width={"45vw"}
        onClose={() => setOpen(false)}
        open={open}
        title="Add new employee"
      />
      <Drawer
        children={<AttendanceLogs user={userId} />}
        width={"75vw"}
        open={openLogs && userId.trim().length > 0}
        onClose={() => setOpenLogs(false)}
        title="View Logs"
      />
    </>
  );
};
