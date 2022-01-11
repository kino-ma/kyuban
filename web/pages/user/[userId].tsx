import { NextPage } from "next";
import { get } from "../../common/api";
import { useMe } from "../../common/auth";
import { UserData } from "../../common/types";
import { UserProfile } from "../../components/userProfile";

interface IUserProps {
  user: UserData;
  following: boolean;
  followed: boolean;
  me: UserData;
}

const User: NextPage<IUserProps> = ({ user, following, followed, me }) => {
  const isMe = me.id === user.id;

  return (
    <main>
      <UserProfile {...{ user, following, followed, isMe }} />
    </main>
  );
};

// FIXME: error validation
type GetUserResponse = GetUserSuccessResponse;
type GetFollowResponse = GetFollowSuccessResponse;

type GetUserSuccessResponse = {
  user: UserData;
  success: true;
};

type GetFollowSuccessResponse = {
  following: boolean;
  followed: boolean;
  success: true;
};

interface ErrorResponse {
  success: false | undefined;
  error: false | undefined;
}

User.getInitialProps = async (ctx) => {
  const getUserRes = await get(`/user/${ctx.query.userId}`);
  const { user }: GetUserResponse = await getUserRes.json();

  const getFollowRes = await get(`/follow/${ctx.query.userId}`);
  const { following, followed }: GetFollowResponse = await getFollowRes.json();

  const me = useMe(ctx);

  return { user, following, followed, me };
};

export default User;
