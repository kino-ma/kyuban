import { NextPage } from "next";
import { Router, useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { get } from "../common/api";
import { getSession } from "../common/auth";
import { ResponseAndThreadData, ThreadData } from "../common/types";
import { ResponseCard } from "../components/ResponseCard";
import { ThreadCard } from "../components/threadCard";
import cards from "../styles/card.module.css";

type GetThreadsResponse = GetThreadsSuccessResponse;
type GetResponsesResponse = GetresponsesuccessResponse;

type GetThreadsSuccessResponse = {
  threads: ThreadData[];
  success: true;
};

type GetresponsesuccessResponse = {
  responses: ResponseAndThreadData[];
  success: true;
};

interface ErrorResponse {
  success: false | undefined;
  error: false | undefined;
}

const Home: NextPage = () => {
  const router = useRouter();

  const [threads, setThreads] = useState<ThreadData[]>([]);
  const [responses, setResponses] = useState<ResponseAndThreadData[]>([]);

  useEffect(() => {
    get(`/threads`)
      .then((resp) => {
        return resp.json();
      })
      .then((json: GetThreadsResponse) => {
        const { threads } = json;
        setThreads(threads);
      })
      .catch((err) => {
        if (err.status === 401) {
          router.push("/");
        }
      });
  }, []);

  useEffect(() => {
    get(`/responses/feed`)
      .then((resp) => {
        return resp.json();
      })
      .then((json: GetResponsesResponse) => {
        const { responses } = json;
        setResponses(responses);
      })
      .catch((err) => {
        console.error("caught");
        if (err.status === 401) {
          router.push("/");
        }
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
      <main style={{ display: "flex", flexFlow: "row" }}>
        <div className={cards.threads__container}>
          <h3>ホーム</h3>
          <div>{responseItems}</div>
        </div>
        <div className={cards.threads__container}>
          <h3>スレッド一覧</h3>
          <div>{threadItems}</div>
        </div>
      </main>
    </React.Fragment>
  );
};

type ResponseFeedResponse = {
  responses: ResponseAndThreadData[];
  success: true;
};

Home.getInitialProps = async (ctx) => {
  try {
    const responsesResp = await get("/responses/feed");
    const json: ResponseFeedResponse = await responsesResp.json();
    const responses: ResponseAndThreadData[] = json.responses;

    const threadsResp = await get("/threads");
    const { threads } = await threadsResp.json();

    return {
      responses,
      threads,
    };
  } catch (e) {
    TODO: fails when serverside: 401
    console.error({ feedError: e });
    console.error({ headers: e.headers });
    if (e?.status === 401) {
      console.log("unauthorized. redirecting...");
      ctx.res.setHeader("Location", "/");
      ctx.res.statusCode = 307; // Temporary redirect
      ctx.res.end();
      return {};
    }
  }
};

export default Home;
