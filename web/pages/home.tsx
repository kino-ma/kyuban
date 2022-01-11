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

  const responseItems = responses.map((response) => (
    <ResponseCard {...{ response }} />
  ));
  const threadITems = threads.map((thread) => <ThreadCard {...{ thread }} />);

  return (
    <React.Fragment>
      <h3>Feed</h3>
      <div>{responseItems}</div>
      <h3>Threads</h3>
      <div>{threadITems}</div>
    </React.Fragment>
  );
};

Home.getInitialProps = async (ctx) => {
  const session = getSession(ctx);

  const responsesResp = await get("/response/feed", { session });
  const threadsResp = await get("/thread");

  const { responses } = await responsesResp.json();
  const { threads } = await threadsResp.json();

  return {
    responses,
    threads,
  };
};

export default Home;
