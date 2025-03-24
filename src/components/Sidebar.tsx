import React from "react";
import { observer } from "mobx-react-lite";
import { store, UserState, CallControl, StationLogin } from "@webex/cc-widgets";
import { ButtonCircle } from "@momentum-ui/react-collaboration";

const Sidebar: React.FC = observer(() => {
  return (
    <>
      <h1>Sidebar</h1>
      {store.isAgentLoggedIn ? (
        <>
          <UserState />
          <CallControl />
          <StationLogin />
          <ButtonCircle color="join" />
        </>
      ) : (
        <StationLogin />
      )}
    </>
  );
});

export default Sidebar;
