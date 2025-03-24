import React from "react";
import { observer } from "mobx-react-lite";
import {
  store,
  UserState,
  IncomingTask,
  TaskList,
  StationLogin,
} from "@webex/cc-widgets";

const FloatingWindow: React.FC = observer(() => {
  return (
    <>
      <h1>Floating Window</h1>
      {store.isAgentLoggedIn ? (
        <>
          <UserState />
          <IncomingTask />
          <TaskList />
        </>
      ) : (
        <StationLogin />
      )}
    </>
  );
});

export default FloatingWindow;
