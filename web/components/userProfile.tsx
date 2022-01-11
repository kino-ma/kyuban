import React, { MouseEventHandler } from "react";
import { post } from "../common/api";
import { UserData } from "../common/types";
import { Button } from "./button";
import { FollowButton, FollowButtonEventHandler } from "./followButton";
import { UserName } from "./userName";

interface IUserProfileProps {
  user: UserData;
  following: boolean;
  followed: boolean;
}

export const UserProfile: React.FC<IUserProfileProps> = ({
  user,
  following,
  followed,
}) => {
  const handleSubmit: FollowButtonEventHandler = async (_evt) => {
    const uri = `/follow/${user.id}`;
    const resp = await post(uri);
    await resp.json();
  };

  const handleFollowing: FollowButtonEventHandler = async (_evt) => {
    console.log("following clicked");
    alert("既にフォローしています");
  };

  return (
    <React.Fragment>
      <h3>
        <UserName {...{ user }} />
      </h3>
      <div>
        <FollowButton
          following={following}
          onClickFollowing={handleFollowing}
          onClickNotFollowing={handleFollowing}
        />
      </div>
    </React.Fragment>
  );
};
