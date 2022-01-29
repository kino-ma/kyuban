import { NextPage } from "next";
import { get } from "../../../common/api";
import { UserAndFriendsData } from "../../../common/types";
import { UserName } from "../../../components/userName";

interface IFollowersProps {
  user: UserAndFriendsData;
}

const Followers: NextPage<IFollowersProps> = ({ user }) => {
  const followerItems = user.followers.map((follower) => (
    <UserName user={follower} />
  ));
  return <main>{followerItems}</main>;
};

type GetUserResponse = GetUserSuccessResponse;

type GetUserSuccessResponse = {
  user: UserAndFriendsData;
  success: true;
};

interface ErrorResponse {
  success: false | undefined;
  error: false | undefined;
}

Followers.getInitialProps = async (ctx) => {
  const resp = await get(`/users/${ctx.query.userId}`);
  const json: GetUserResponse = await resp.json();
  console.log({ json });
  const { user }: GetUserResponse = json;

  return { user };
};

export default Followers;
