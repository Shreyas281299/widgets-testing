import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import {
  store,
  UserState,
  IncomingTask,
  TaskList,
  StationLogin,
} from "@webex/cc-widgets";

const FloatingWindow = (isSdkReady) => {
  const [incomingTasks, setIncomingTasks] = React.useState([]);
  const onAccepted = ({ task }) => {
    console.log("Task accepted:", task);
    // setIncomingTasks((prevTasks) =>
    //   prevTasks.filter((t) => t.data.interactionId !== task.data.interactionId)
    // );
  };

  const onRejected = ({ task }) => {
    console.log("Task rejected:", task);
    // setIncomingTasks((prevTasks) =>
    //   prevTasks.filter((t) => t.data.interactionId !== task.data.interactionId)
    // );
  };

  useEffect(() => {
    const onIncomingTaskCB = ({ task }) => {
      setIncomingTasks((prevTasks) => [...prevTasks, task]);
    };

    store.setIncomingTaskCb(onIncomingTaskCB);
  }, []);

  return (
    <>
      {isSdkReady ? null : <div>Loading SDK...</div>}
      <h1>Floating Window</h1>
      {isSdkReady && store.isAgentLoggedIn ? (
        <>
          <UserState />
          {incomingTasks.map((task) => (
            <IncomingTask
              incomingTask={task}
              onAccepted={(task: typeof store.ITask) => {
                console.log("onAccepted called with task:", task);

                onAccepted({ task });
              }}
              onRejected={onRejected}
            />
          ))}
          <TaskList />
        </>
      ) : (
        <StationLogin />
      )}
    </>
  );
};

export default observer(FloatingWindow);
