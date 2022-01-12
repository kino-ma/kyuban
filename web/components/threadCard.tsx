import React from "react";
import { ThreadData } from "../common/types";
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
      <div>
        <Response {...response} />
      </div>
    </React.Fragment>
  );
};
