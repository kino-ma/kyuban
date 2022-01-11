import { get } from "../../common/api";
import { UserData } from "../../common/types";
import { UserProfile } from "../../components/userProfile";

interface IUserProps {
  user: UserData;
  following: boolean;
  followed: boolean;
}

const User = ({ user, following, followed }) => {
  return (
    <main>
      <UserProfile {...{ user, following, followed }} />
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

User.getInitialProps = async ({ query }) => {
  const getUserRes = await get(`/user/${query.userId}`);
  const { user }: GetUserResponse = await getUserRes.json();

  const getFollowRes = await get(`/follow/${query.userId}`);
  const { following, followed }: GetFollowResponse = await getFollowRes.json();

  return { user, following, followed };
};

export default User;
