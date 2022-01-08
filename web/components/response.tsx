import React from "react";

import { ResponseData } from "../common/types";

export const Response: React.FC<ResponseData> = (response) => {
  return (
    <React.Fragment>
      [<b>{response.sender.name}</b>]: {response.content}
    </React.Fragment>
  );
};
