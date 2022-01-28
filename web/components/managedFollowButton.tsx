import { useEffect, useState } from "react";
import { delete_, get, post } from "../common/api";
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

  useEffect(() => {
    const fetchFollow = async () => {
      const resp = await get(`/follows/${user.id}`);
      const follow = await resp.json();
      setFollowWithHook(follow);
    };
    fetchFollow();
  }, []);

  const setFollowWithHook = (follow: FollowData) => {
    setFollow(follow);
    onFollowStateChange(follow);
  };

  const handleNotFollowing: FollowButtonEventHandler = async (_evt) => {
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

  return (
    <div>
      <FollowButton
        following={following}
        onClickFollowing={handleFollowing}
        onClickNotFollowing={handleNotFollowing}
      />
    </div>
  );
};
