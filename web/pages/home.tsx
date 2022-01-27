import { NextPage } from "next";
import { Router, useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { get } from "../common/api";
import { getSession } from "../common/auth";
import { ResponseAndThreadData, ThreadData } from "../common/types";
import { ResponseCard } from "../components/responseCard";
import { ThreadCard } from "../components/threadCard";
import cards from "../styles/card.module.css";

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

const Home: NextPage = () => {
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
  let responses: ResponseAndThreadData[];

  try {
    const session = getSession(ctx);

    // If not logged in, fails with TypeError
    const responsesResp = await get("/responses/feed", { session });
    const json: ResponseFeedResponse = await responsesResp.json();
    responses = json.responses;
  } catch (err) {
    // Generar errors
    if (!(err instanceof TypeError)) {
      throw err;
    }

    // If not authorized, redirect
    if (typeof ctx.res !== "undefined") {
      ctx.res.setHeader("Location", "/");
      ctx.res.statusCode = 307; // Temporary redirect
      ctx.res.end();
      return {};
    }

    // Unknown errors
    throw new Error("エラーが発生しました");
  }

  const threadsResp = await get("/threads");
  const { threads } = await threadsResp.json();

  return {
    responses,
    threads,
  };
};

export default Home;
