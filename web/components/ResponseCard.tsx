import React from "react";
import { ResponseData, ThreadData } from "../common/types";
import { Response } from "./response";

interface IResponseCardProps {
  thread: ThreadData;
  response: ResponseData;
}

export const ResponseCard: React.FC<IResponseCardProps> = ({
  thread,
  response,
}) => {
  return (
    <React.Fragment>
      <h4>{thread.title}</h4>
      <div>
        <Response {...response} />
      </div>
    </React.Fragment>
  );
};
