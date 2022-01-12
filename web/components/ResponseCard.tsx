import React from "react";
import { ResponseAndThreadData } from "../common/types";
import { Response } from "./response";
import { ThreadTitle } from "./threadTitle";

interface IResponseCardProps {
  response: ResponseAndThreadData;
}

export const ResponseCard: React.FC<IResponseCardProps> = ({ response }) => {
  const thread = response.thread;
  return (
    <React.Fragment>
      <ThreadTitle {...{ thread }} />
      <div>
        <Response {...response} />
      </div>
    </React.Fragment>
  );
};
