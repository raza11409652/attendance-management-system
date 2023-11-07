import { Button } from "antd";
import { useAppDispatch } from "../../slice";
import { logoutAction } from "../../slice/reducer/auth";
// import {} from
export const AppNavbar = () => {
  const dispatch = useAppDispatch();
  const logout = () => dispatch(logoutAction());
  return (
    <header className="app-navbar">
      <div className="brand-logo"></div>
      <div className="row-flex">
        <Button type="default" danger onClick={logout}>
          Logout
        </Button>
      </div>
    </header>
  );
};
