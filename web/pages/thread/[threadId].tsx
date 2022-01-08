import { NextPage } from "next";
import { Router, useRouter } from "next/dist/client/router";
import Head from "next/head";
import React, { useState } from "react";

import { get } from "../../common/api";
import { ResponseData, ThreadData } from "../../common/types";
import { Response } from "../../components/response";
import { ResponseForm } from "../../components/responseForm";

// FIXME: error validation
type GetThreadResponse = SuccessResponse;

type SuccessResponse = {
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
    <li key={response.id}>
      <Response {...response} />
    </li>
  ));

  const postRequestHook = (response: ResponseData): void => {
    setResponses([...responses, response]);
  };

  return (
    <React.Fragment>
      <Head>
        <title>thread</title>
      </Head>
      <main>
        <h1>{thread.title}</h1>
        <ul>{responseItems}</ul>
        <ResponseForm {...{ threadId: thread.id, postRequestHook }} />
      </main>
    </React.Fragment>
  );
};

Thread.getInitialProps = async ({ query }) => {
  const res = await get(`/thread/${query.threadId}`);
  const { thread }: GetThreadResponse = await res.json();

  return { thread };
};

export default Thread;
