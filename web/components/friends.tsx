import { UserAndFriendsData, UserData } from "../common/types";
import styles from "../styles/friends.module.scss";

interface IPeopleNumberProps {
  users: UserData[];
  text: string;
}

const PeopleNumber = ({ users, text }: IPeopleNumberProps) => {
  return (
    <span className={styles["people-number"]}>
      {users.length} {text}
    </span>
  );
};

interface IFriendsProps {
  user: UserAndFriendsData;
}

export const Friends = ({ user }: IFriendsProps) => {
  const followees = PeopleNumber({ users: user.followees, text: "フォロー中" });
  const followers = PeopleNumber({ users: user.followers, text: "フォロワー" });

  return (
    <div>
      {followees}
      {followers}
    </div>
  );
};
