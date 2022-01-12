import React from "react";
import { ResponseAndThreadData } from "../common/types";
import { Icon } from "./icon";
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
      <div style={{ margin: "1em" }}>
        <Icon user={response.sender} size={30} />
        <Response {...response} />
      </div>
    </React.Fragment>
  );
};
