import { NextPage } from "next";
import { Router, useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { get } from "../common/api";
import {
  ResponseAndThreadData,
  ResponseData,
  ThreadData,
} from "../common/types";
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

interface HomeProps {
  threads: ThreadData[];
}

const Home: NextPage<HomeProps> = ({ threads }) => {
  const router = useRouter();

  const [responses, setResponses] = useState<ResponseAndThreadData[]>([]);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const resp = await get(`/responses/feed`);
        const json = await resp.json();
        const { responses } = json;
        setResponses(responses);
      } catch (err) {
        if (err?.status === 401) {
          console.error("unauthorized");
          router.push("/");
        }
      }
    };

    fetchFeed();
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

Home.getInitialProps = async (ctx) => {
  const threadsResp = await get("/threads");
  const { threads }: GetThreadsResponse = await threadsResp.json();

  return {
    threads,
  };
};

export default Home;
