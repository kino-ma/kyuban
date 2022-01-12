import React from "react";
import { ThreadData } from "../common/types";
import { Icon } from "./icon";
import { Response } from "./response";
import { ThreadTitle } from "./threadTitle";

interface IThreadCardProps {
  thread: ThreadData;
}
export const ThreadCard: React.FC<IThreadCardProps> = ({ thread }) => {
  const response = thread.responses[0];
  return (
    <React.Fragment>
      <ThreadTitle {...{ thread }} />
      <div style={{ margin: "1em" }}>
        <Icon user={response.sender} size={30} />
        <Response {...response} />
      </div>
    </React.Fragment>
  );
};
