import React, { MouseEventHandler, useState } from "react";
import { delete_, post } from "../common/api";
import { FollowData, UserAndFriendsData, UserData } from "../common/types";
import { Button } from "./button";
import { Icon } from "./icon";
import { UserName } from "./userName";
import styles from "../styles/card.module.css";
import { ManagedFollowButton } from "./managedFollowButton";
import { Friends } from "./friends";

interface IUserProfileProps {
  user: UserAndFriendsData;
  isMe: boolean;
}

export const UserProfile: React.FC<IUserProfileProps> = ({ user, isMe }) => {
  const [followed, setFollowed] = useState(false);

  const onFollowStateChange = (follow: FollowData) =>
    setFollowed(follow.followed);

  const followButton = !isMe ? (
    <ManagedFollowButton {...{ user, onFollowStateChange }} />
  ) : null;

  const followedText = followed ? <p>あなたをフォローしています</p> : null;

  const friends = <Friends {...{ user }} />;

  return (
    <React.Fragment>
      <div className={styles.profile}>
        <Icon user={user} />
        <h3>
          <UserName {...{ user }} /> さん
        </h3>
        {followButton}
        {followedText}
        {friends}
      </div>
    </React.Fragment>
  );
};
