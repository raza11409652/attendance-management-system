import { Button, Drawer, Table, Tag, Typography } from "antd";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../slice";
import {
  GetRostersAction,
  singleRosterViewAction,
} from "../../slice/reducer/roster";
import { Roster, TimeTable } from "../../types";
import { NewRosterForm } from "../../components/forms/newRosterForm";
import { EditRosterForm } from "../../components/forms/editRosterForm";

export const RosterContainer = () => {
  const { loader, rosters, singleRoster } = useAppSelector((a) => a.roster);
  const [open, setOpen] = React.useState(false);
  const [openView, setOpenView] = React.useState(false);

  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(GetRostersAction());
  }, [dispatch]);
  const addNewRoster = () => setOpen(true);
  const onSuccess = () => {
    dispatch(GetRostersAction());
    setOpen(false);
  };
  const openViewDetails = (data: Roster, mode: "view" | "edit") => {
    setOpenView(true);
    dispatch(singleRosterViewAction({ roster: data, mode }));
  };
  return (
    <>
      <div className="app-body">
        <div className="header">
          <Typography.Text>Rosters</Typography.Text>
          <Button type="text" onClick={() => addNewRoster()}>
            Add new
          </Button>
        </div>
        <div className="body">
          <Table
            rowKey={"_id"}
            loading={loader}
            pagination={false}
            dataSource={rosters}
            columns={[
              { title: "Title", dataIndex: "title" },
              {
                title: "Working days",
                dataIndex: "timeTable",
                render: (a: TimeTable[]) => <Tag>{a.length}</Tag>,
              },
              {
                title: "Action",
                dataIndex: "_id",
                render: (_: string, data: Roster) => (
                  <>
                    <Button
                      type="text"
                      onClick={() => openViewDetails(data, "view")}
                    >
                      View details
                    </Button>
                    <Button
                      type="text"
                      onClick={() => openViewDetails(data, "edit")}
                    >
                      Update roster
                    </Button>
                  </>
                ),
              },
            ]}
          />
        </div>
      </div>
      <Drawer
        destroyOnClose
        width={"40vw"}
        children={<NewRosterForm onSuccess={onSuccess} />}
        open={open}
        title="Add new roster"
        onClose={() => setOpen(false)}
      ></Drawer>
      <Drawer
        destroyOnClose
        width={"40vw"}
        children={
          singleRoster ? (
            <EditRosterForm
              mode={singleRoster.mode}
              data={singleRoster?.roster}
            />
          ) : (
            <></>
          )
        }
        open={openView}
        title={`${singleRoster ? singleRoster.mode : ""} roster `}
        onClose={() => setOpenView(false)}
      ></Drawer>
    </>
  );
};
