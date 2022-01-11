import React from "react";
import { post } from "../common/api";
import { UserData } from "../common/types";
import { Button } from "./button";
import { FollowButton } from "./followButton";
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
  const handleSubmit = async (_evt) => {
    const uri = `/follow/${user.id}`;
    const resp = await post(uri);
    await resp.json();
  };

  return (
    <React.Fragment>
      <h3>
        <UserName {...{ user }} />
      </h3>
      <div>
        <FollowButton
          following={following}
          onClickFollowing={handleSubmit}
          onClickNotFollowing={handleSubmit}
        />
      </div>
    </React.Fragment>
  );
};
