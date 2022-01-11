// API からくるデータ：
/*
user = { // 引数
    "id": 1234
    "name": "kino-ma",
    "updatedAt": "2021/12/12",
    "createdAt": "2021/12/12"
}
*/

import { get } from "../../common/api";
import { UserData } from "../../common/types";

// minamiku-san
const User = ({ user }) => {
  // ここを編集する
  return user.name;
};

// FIXME: error validation
type GetUserResponse = SuccessResponse;

type SuccessResponse = {
  user: UserData;
  success: true;
};

interface ErrorResponse {
  success: false | undefined;
  error: false | undefined;
}

User.getInitialProps = async ({ query }) => {
  const res = await get(`/user/${query.userId}`);
  const { user }: GetUserResponse = await res.json();

  return { user };
};

export default User;
