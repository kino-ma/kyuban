import { UserData } from "../common/types";

interface IUserNameProps {
  user: UserData;
}

export const UserName: React.FC<IUserNameProps> = ({ user }) => {
  const uri = `/user/${user.id}`;
  return (
    <a href={uri}>
      <b>{user.name}</b>
    </a>
  );
};
