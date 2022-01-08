import React from "react";

import { ResponseData } from "../common/types";
import { UserName } from "./username";

export const Response: React.FC<ResponseData> = (response) => {
  return (
    <React.Fragment>
      [<UserName user={response.sender} />
      ]: {response.content}
    </React.Fragment>
  );
};
