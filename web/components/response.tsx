import React from "react";

import { ResponseData } from "../common/types";
import { Icon } from "./icon";
import { UserName } from "./userName";

export const Response: React.FC<ResponseData> = (response) => {
  return (
    <React.Fragment>
      <Icon user={response.sender} size={30} />
      [<UserName user={response.sender} />
      ]: {response.content}
    </React.Fragment>
  );
};
