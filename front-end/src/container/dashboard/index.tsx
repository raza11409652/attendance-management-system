import React from "react";
import "./dashboard.css";
import { SideMenu } from "../../components/side-menu";
import { AppNavbar } from "../../components/navabr";
import { useAppSelector } from "../../slice";
interface Props {
  children: JSX.Element;
}
export const AppDashboard: React.FC<Props> = ({ children }) => {
  const role = useAppSelector((a) => a.auth.role);
  return (
    <>
      <div className="app-dashboard">
        <AppNavbar />
        <div className="container">
          <div className="left">{role ? <SideMenu role={role} /> : <></>}</div>
          <div className="right">{children}</div>
        </div>
      </div>
    </>
  );
};
