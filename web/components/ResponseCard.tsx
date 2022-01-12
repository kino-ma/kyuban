import React from "react";
import { ResponseAndThreadData } from "../common/types";
import { Response } from "./response";

interface IResponseCardProps {
  response: ResponseAndThreadData;
}

export const ResponseCard: React.FC<IResponseCardProps> = ({ response }) => {
  const thread = response.thread;
  return (
    <React.Fragment>
      <h4>{thread.title}</h4>
      <div>
        <Response {...response} />
      </div>
    </React.Fragment>
  );
};
