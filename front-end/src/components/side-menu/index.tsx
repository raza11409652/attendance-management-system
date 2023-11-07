import { NavLink } from "react-router-dom";
import "./side-menu.css";
import { UserRole } from "../../types";
interface Props {
  role: UserRole;
}
export const SideMenu: React.FC<Props> = ({ role }) => {
  return (
    <>
      <div className="side-menu">
        <ul>
          <li>
            <NavLink to={"/"}> Dashboard</NavLink>
          </li>
          {role === "MANAGER" && (
            <>
              <li>
                <NavLink to={"/employee"}> Employee Management</NavLink>
              </li>
              <li>
                <NavLink to={"/rosters"}> Roster Management</NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </>
  );
};
