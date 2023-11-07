import { Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { LoginContainer } from "../container/login";
import { RegisterContainer } from "../container/register";
import { useAppSelector } from "../slice";
import { AppDashboard } from "../container/dashboard";
import { EmpDashboard } from "../container/emp-dash";
import { EmployeeContainer } from "../container/employee/employeeContainer";
import { RosterContainer } from "../container/rosters/rosterContainer";

export const AppRoutes = () => {
  const auth = useAppSelector((a) => a.auth.auth && a.auth.role !== undefined);
  const role = useAppSelector((a) => a.auth.role);
  return (
    <>
      <Suspense fallback={<>Loading....</>}>
        <BrowserRouter>
          <Routes>
            {auth ? (
              role === "EMPLOYEE" ? (
                <>
                  <Route path="/">
                    <Route
                      index
                      element={<AppDashboard children={<EmpDashboard />} />}
                    />
                  </Route>
                </>
              ) : (
                <>
                  <Route path="/">
                    <Route
                      index
                      element={<AppDashboard children={<>Manager</>} />}
                    />
                    <Route
                      path="employee"
                      element={
                        <AppDashboard children={<EmployeeContainer />} />
                      }
                    />
                    <Route
                      path="rosters"
                      element={<AppDashboard children={<RosterContainer />} />}
                    />
                  </Route>
                </>
              )
            ) : (
              <>
                <Route path="/">
                  <Route index element={<LoginContainer />} />
                  <Route path="register" element={<RegisterContainer />} />
                </Route>
              </>
            )}
            <Route path="*" element={<Navigate to={"/"} />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </>
  );
};
