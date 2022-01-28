import { useState } from "react";
import { delete_, post } from "../common/api";
import { FollowData, UserData } from "../common/types";
import { FollowButton, FollowButtonEventHandler } from "./followButton";

interface IManagedFollowButtonProps {
  user: UserData;
  onFollowStateChange?: (follow: FollowData) => any;
}

export const ManagedFollowButton = ({
  user,
  onFollowStateChange,
}: IManagedFollowButtonProps) => {
  const [{ following, followed }, setFollow] = useState({
    following: false,
    followed: false,
  });

  const setFollowWithHook = (follow: FollowData) => {
    setFollow(follow);
    onFollowStateChange(follow);
  };

  const handleFollow: FollowButtonEventHandler = async (_evt) => {
    const uri = `/follows/${user.id}`;
    const resp = await post(uri);
    const { success } = await resp.json();

    if (success) {
      setFollowWithHook({ following: true, followed });
    }
  };

  const handleFollowing: FollowButtonEventHandler = async (_evt) => {
    const sure = confirm(`${user.name} さんのフォローを外しますか？`);
    if (!sure) {
      return;
    }

    const uri = `/follows/${user.id}`;
    const resp = await delete_(uri);
    const { success } = await resp.json();

    if (success) {
      setFollowWithHook({ following: false, followed });
    }
  };

  const followedText = followed ? <p>あなたをフォローしています</p> : null;

  return (
    <div>
      <FollowButton
        following={following}
        onClickFollowing={handleFollowing}
        onClickNotFollowing={handleFollow}
      />
    </div>
  );
};
