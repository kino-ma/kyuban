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
import styles from "../../styles/profile.module.css";
import responseStyles from "../../styles/card.module.css";

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
    get(`/responses?sender=${user.id}`)
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
      <div className={styles.container}>
        <div className={styles.column}>
          <UserProfile {...{ user, following, followed, isMe }} />
        </div>
        <div className={styles.column}>
          <h3 className={styles.field__heading}>
            {user.name} さんが投稿したレスポンス
          </h3>
          {responseItems}
        </div>
      </div>
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
  const getUserRes = await get(`/users/${ctx.query.userId}`);
  const { user }: GetUserResponse = await getUserRes.json();

  const getFollowRes = await get(`/follows/${ctx.query.userId}`);
  const { following, followed }: GetFollowResponse = await getFollowRes.json();

  const me = useMe(ctx);

  return { user, following, followed, me };
};

export default User;
