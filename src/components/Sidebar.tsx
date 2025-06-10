import React from "react";
import { observer } from "mobx-react-lite";
import { store, UserState, CallControl, StationLogin } from "@webex/cc-widgets";

interface SidebarProps {
  isSdkReady: boolean;
}

const Sidebar: React.FC<SidebarProps> = observer(({ isSdkReady }) => {
  if (!isSdkReady) {
    return <div>Loading SDK...</div>;
  }
  const onLogin = () => {
    console.log("Login button clicked");
  };
  const onLogout = () => {
    console.log("Logout button clicked");
  };
  const onCCSignOut = () => {
    console.log("CC Sign Out button clicked");
  };
  const handleSaveStart = () => {
    console.log("Save Start button clicked");
  };
  const handleSaveEnd = () => {
    console.log("Save End button clicked");
  };
  return (
    <>
      <h1>Sidebar</h1>
      {store.isAgentLoggedIn ? (
        <>
          <StationLogin
            profileMode={true}
            onSaveStart={handleSaveStart}
            onSaveEnd={handleSaveEnd}
          />
          <UserState />
          {store.currentTask && <CallControl />}
          <StationLogin />
        </>
      ) : (
        <StationLogin />
      )}
    </>
  );
});

export default Sidebar;
