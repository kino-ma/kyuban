import { NextPage } from "next";
import React from "react";
import { get } from "../common/api";
import { getCurrentUser, getSession } from "../common/auth";
import { ResponseAndThreadData, ThreadData } from "../common/types";
import { ResponseCard } from "../components/responseCard";
import { ThreadCard } from "../components/threadCard";

interface IHomeProps {
  responses: ResponseAndThreadData[];
  threads: ThreadData[];
}

const Home: NextPage<IHomeProps> = ({ responses, threads }) => {
  console.log({ threads, responses });

  const responseItems =
    responses.length > 0 ? (
      responses.map((response) => <ResponseCard {...{ response }} />)
    ) : (
      <p>フォローしているユーザのレスポンスがここに表示されます</p>
    );

  const threadItems = threads.map((thread) => <ThreadCard {...{ thread }} />);

  return (
    <React.Fragment>
      <main>
        <h3>Feed</h3>
        <div>{responseItems}</div>
        <h3>Threads</h3>
        <div>{threadItems}</div>
      </main>
    </React.Fragment>
  );
};

type ResponseFeedResponse = {
  responses: ResponseAndThreadData[];
  success: true;
};

Home.getInitialProps = async (ctx) => {
  let responses: ResponseAndThreadData[];

  try {
    const session = getSession(ctx);
    const responsesResp = await get("/response/feed", { session });
    const json: ResponseFeedResponse = await responsesResp.json();
    responses = json.responses;
  } catch (err) {
    if (!(err instanceof TypeError)) {
      throw err;
    }
    responses = [];
  }

  const threadsResp = await get("/thread");
  const { threads } = await threadsResp.json();

  return {
    responses,
    threads,
  };
};

export default Home;
