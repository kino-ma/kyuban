import { UserAndFriendsData, UserData } from "../common/types";
import styles from "../styles/friends.module.scss";

type PeopleType = "followers" | "followees";

interface IPeopleNumberProps {
  users: UserData[];
  typ: PeopleType;
}

const PeopleNumber = ({ users, typ }: IPeopleNumberProps) => {
  const peopleTypeText = {
    followers: "フォロワー",
    followees: "フォロー中",
  };

  const text = peopleTypeText[typ];

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
  const followees = PeopleNumber({ users: user.followees, typ: "followees" });
  const followers = PeopleNumber({ users: user.followers, typ: "followers" });

  return (
    <div classname={styles["friends-container"]}>
      {followees}
      {followers}
    </div>
  );
};
