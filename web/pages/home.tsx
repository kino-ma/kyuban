import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { get } from "../common/api";
import { getSession } from "../common/auth";
import { ResponseAndThreadData, ThreadData } from "../common/types";
import { ResponseCard } from "../components/responseCard";
import { ThreadCard } from "../components/threadCard";

type GetThreadsResponse = GetThreadsSuccessResponse;
type GetResponsesResponse = GetResponsesSuccessResponse;

type GetThreadsSuccessResponse = {
  threads: ThreadData[];
  success: true;
};

type GetResponsesSuccessResponse = {
  responses: ResponseAndThreadData[];
  success: true;
};

interface ErrorResponse {
  success: false | undefined;
  error: false | undefined;
}

// TODO: usestate to responses/threads
const Home: NextPage = () => {
  const [threads, setThreads] = useState<ThreadData[]>([]);
  const [responses, setResponses] = useState<ResponseAndThreadData[]>([]);

  useEffect(() => {
    get(`/thread`)
      .then((resp) => {
        return resp.json();
      })
      .then((json: GetThreadsResponse) => {
        const { threads } = json;
        setThreads(threads);
      });
  }, []);

  useEffect(() => {
    get(`/response/feed`)
      .then((resp) => {
        return resp.json();
      })
      .then((json: GetResponsesResponse) => {
        const { responses } = json;
        setResponses(responses);
      });
  }, []);

  const responseItems =
    responses.length > 0 ? (
      responses.map((response) => <ResponseCard {...{ response }} />)
    ) : (
      <p>フォローしているユーザのレスポンスがここに表示されます</p>
    );

  const threadItems = threads.map((thread) =>
    threads.length > 0 ? <ThreadCard {...{ thread }} /> : "読み込み中..."
  );

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
