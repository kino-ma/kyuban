import Link from "next/link";

import { UserData } from "../common/types";

interface IUserNameProps {
  user: UserData;
}

export const UserName: React.FC<IUserNameProps> = ({ user }) => {
  const uri = `/user/${user.id}`;

  return (
    <Link href={uri}>
      <a>{user.name}</a>
    </Link>
  );
};
