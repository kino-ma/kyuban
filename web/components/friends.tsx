import Link from "next/link";
import { UserAndFriendsData, UserData } from "../common/types";
import styles from "../styles/friends.module.scss";

type PeopleType = "followers" | "followees";

interface IPeopleNumberProps {
  user: UserAndFriendsData;
  users: UserData[];
  typ: PeopleType;
}

const PeopleNumber = ({ user, users, typ }: IPeopleNumberProps) => {
  const peopleTypeInfo = {
    followers: {
      text: "フォロワー",
      uri: `/user/${user.id}/followers`,
    },
    followees: {
      text: "フォロー中",
      uri: `/user/${user.id}/followees`,
    },
  };

  const { text, uri } = peopleTypeInfo[typ];

  return (
    <Link href={uri}>
      <a className={styles["people-number"]}>
        {users.length} {text}
      </a>
    </Link>
  );
};

interface IFriendsProps {
  user: UserAndFriendsData;
}

export const Friends = ({ user }: IFriendsProps) => {
  const followees = PeopleNumber({
    user,
    users: user.followees,
    typ: "followees",
  });
  const followers = PeopleNumber({
    user,
    users: user.followers,
    typ: "followers",
  });

  return (
    <div className={styles["friends-container"]}>
      {followees}
      {followers}
    </div>
  );
};
