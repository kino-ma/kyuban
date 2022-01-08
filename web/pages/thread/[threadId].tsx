import { NextPage } from "next";
import Head from "next/head";
import React, { useState } from "react";

import { get } from "../../common/api";
import { ThreadData } from "../../common/types";
import { Response } from "../../components/response";

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
  const responses = thread.responses;
  const responseItems = responses.map((response) => (
    <li key={response.id}>
      <Response {...response} />
    </li>
  ));

  return (
    <React.Fragment>
      <Head>
        <title>thread</title>
      </Head>
      <main>
        <h1>{thread.title}</h1>
        <ul>{responseItems}</ul>
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
