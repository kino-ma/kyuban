import { NextPage } from "next";
import Head from "next/head";
import React, { useState } from "react";

import { UserData } from "../user";
import { get } from "../../utils/api";

interface ThreadProps {
  thread: ThreadData;
}

export type ThreadData = {
  id: number;
  title: string;
  responses: ResponseData[];
};

type ResponseData = {
  id: number;
  receiveThreadId: number;
  sender: UserData;
  content: string;
  createdAt: string;
  updatedAt: string;
};

const Thread: NextPage<ThreadProps> = ({ thread }) => {
  const responses = thread.responses;
  const responseItems = responses.map((response) => (
    <li key={response.id}>
      [<b>{response.sender.name}</b>]: {response.content}
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
  const { threads } = await res.json();

  return {
    thread: threads[0],
  };
};

export default Thread;