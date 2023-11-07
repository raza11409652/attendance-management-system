import { Alert, Button, Modal } from "antd";
import React from "react";
import { CheckInForm } from "../../components/forms/checkInForm";
import { useAppDispatch, useAppSelector } from "../../slice";
import {
  AttendanceCheckOutAction,
  GetTodayCheckInStatusAction,
} from "../../slice/reducer/attendance";
import { AttendanceLogs } from "../attendance-logs";

export const EmpDashboard = () => {
  const [openCheckIn, setOpenCheckIn] = React.useState(false);
  const { todaysAttendance, loading } = useAppSelector((a) => a.attendance);
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(GetTodayCheckInStatusAction());
  }, [dispatch]);
  const checkOut = () => {
    dispatch(AttendanceCheckOutAction()).then(() =>
      dispatch(GetTodayCheckInStatusAction)
    );
  };
  return (
    <>
      {todaysAttendance ? (
        <>
          <Alert
            message={`Today's attendance marked at ${todaysAttendance.checkInTimestamp}`}
            action={
              <Button
                onClick={checkOut}
                disabled={todaysAttendance.checkOutTimestamp !== null}
                loading={loading}
              >
                Checkout
              </Button>
            }
          />
        </>
      ) : (
        <Alert
          message="Look like you have not marked your attendance today"
          action={
            <Button loading={loading} onClick={() => setOpenCheckIn(true)}>
              Check In Now
            </Button>
          }
        />
      )}
      <AttendanceLogs />
      <Modal
        destroyOnClose
        width={"40vw"}
        title={"Mark your attendance now"}
        children={
          <CheckInForm
            onSuccess={() => {
              setOpenCheckIn(false);
              dispatch(GetTodayCheckInStatusAction);
            }}
          />
        }
        open={openCheckIn}
        footer={null}
        onCancel={() => setOpenCheckIn(false)}
      />
    </>
  );
};
