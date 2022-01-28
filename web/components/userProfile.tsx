import React, { MouseEventHandler, useState } from "react";
import { delete_, post } from "../common/api";
import { FollowData, UserData } from "../common/types";
import { Button } from "./button";
import { Icon } from "./icon";
import { UserName } from "./userName";
import styles from "../styles/card.module.css";
import { ManagedFollowButton } from "./managedFollowButton";

interface IUserProfileProps {
  user: UserData;
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

  return (
    <React.Fragment>
      <div className={styles.profile}>
        <Icon user={user} />
        <h3>
          <UserName {...{ user }} /> さん
        </h3>
        {followButton}
        {followedText}
      </div>
    </React.Fragment>
  );
};
