import { NextPage } from "next";
import { Router, useRouter } from "next/router";
import Head from "next/head";
import React, { useState } from "react";

import { get } from "../../common/api";
import {
  ResponseAndThreadData,
  ResponseData,
  ThreadData,
} from "../../common/types";
import { Response } from "../../components/response";
import { ResponseForm } from "../../components/responseForm";
import styles from "../../styles/Home.module.css";
import threads from "../../styles/thread.module.css";
import { ResponseItem } from "../../components/ResponseItem";

// FIXME: error validation
type GetThreadResponse = GetThreadSuccessResponse;
type PostResponseResponse = PostResponseSuccessResponse;

type PostResponseSuccessResponse = {
  response: ResponseAndThreadData;
  success: true;
};

type GetThreadSuccessResponse = {
  thread: ThreadData;
  success: true;
};

interface ErrorResponse {
  success: false | undefined;
  error: false | undefined;
}

interface ThreadProps {
  thread: ThreadData;
}

const Thread: NextPage<ThreadProps> = ({ thread }) => {
  const router = useRouter();

  const [responses, setResponses] = useState(thread.responses);
  const responseItems = responses.map((response) => (
    <ResponseItem {...{ response }} key={response.id} />
  ));

  const postRequestHook = (response: ResponseData): void => {
    setResponses([...responses, response]);
  };

  return (
    <React.Fragment>
      <Head>
        <title>thread</title>
      </Head>
      <main
        className={styles.main}
        style={{ flexFlow: "row", alignItems: "flex-start" }}
      >
        <div className={threads.thread__container__left}>
          <div className={threads.thread__title}>
            <h3 style={{ margin: 0 }}>スレッドタイトル</h3>
          </div>
          {responseItems}
        </div>
        <div className={threads.thread__container__right}>
          <h3 style={{ margin: 0 }}>レスポンスする</h3>
          <ResponseForm
            threadId={thread.id}
            postRequestHook={postRequestHook}
          />
        </div>
        <div className={threads.main}></div>
      </main>
    </React.Fragment>
  );
};

Thread.getInitialProps = async ({ query }) => {
  const res = await get(`/threads/${query.threadId}`);
  const { thread }: GetThreadResponse = await res.json();

  return { thread };
};

export default Thread;
