import React from "react";
import { ThreadData } from "../common/types";
import { Response } from "./response";

interface IThreadCardProps {
  thread: ThreadData;
}
export const ThreadCard: React.FC<IThreadCardProps> = ({ thread }) => {
  const response = thread.responses[0];
  return (
    <React.Fragment>
      <h4>{thread.title}</h4>
      <div>
        <Response {...response} />
      </div>
    </React.Fragment>
  );
};
