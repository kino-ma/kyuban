import { NextPage } from "next";
import { useState, useEffect } from "react";
import { get } from "../../common/api";
import { useMe } from "../../common/auth";
import {
  ResponseAndThreadData,
  ResponseData,
  UserData,
} from "../../common/types";
import { ResponseCard } from "../../components/responseCard";
import { UserProfile } from "../../components/userProfile";

interface IUserProps {
  user: UserData;
  following: boolean;
  followed: boolean;
  me: UserData;
}

type GetResponsesResponse = GetResponsesSuccessResponse;

type GetResponsesSuccessResponse = {
  responses: ResponseAndThreadData[];
  success: true;
};

// TODO: respnoses become empty sometimes
const User: NextPage<IUserProps> = ({ user, following, followed, me }) => {
  const isMe = me.id === user.id;
  const [responses, setResponses] = useState<ResponseAndThreadData[]>([]);

  useEffect(() => {
    get(`/response?sender=${user.id}`)
      .then((resp) => {
        return resp.json();
      })
      .then((json: GetResponsesSuccessResponse) => {
        const { responses } = json;
        setResponses(responses);
      });
  }, [user]);

  const responseItems =
    responses.length > 0 ? (
      responses.map((r) => <ResponseCard response={r} />)
    ) : (
      <p>読み込み中...</p>
    );

  return (
    <main>
      <UserProfile {...{ user, following, followed, isMe }} />
      {responseItems}
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
