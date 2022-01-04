export type UserData = {
  id: number;
  name: string;
};

// API からくるデータ：
/*
user = { // 引数
    "id": 1234
    "name": "kino-ma",
    "updatedAt": "2021/12/12",
    "createdAt": "2021/12/12"
}
*/

// minamiku-san
const User = ({ user }) => {
  // ここを編集する
  return user.name;
};

User.getInitialProps = async (_ctx) => {
  const user = {
    // 引数
    id: 1234,
    name: "kino-ma",
    updatedAt: "2021/12/12",
    createdAt: "2021/12/12",
  };

  return { user };
};

export default User;
