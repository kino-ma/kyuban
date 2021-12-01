import { NextPage } from "next";
import Head from "next/head";
import React, { useState } from "react";

import { UserData } from "./user";

interface ThreadProps {
  thread: ThreadData;
}

export type ThreadData = {
  id: number;
  title: string;
};

type ResponseData = {
  id: number;
  thread: ThreadData;
  user: UserData;
  content: string;
};

const Thread: NextPage<ThreadProps> = ({ thread }) => {
  const user1: UserData = {
    id: 1,
    name: "hoge",
  };
  const user2: UserData = {
    id: 2,
    name: "fuga",
  };

  const sampleResponses: ResponseData[] = [
    {
      id: 1,
      thread,
      user: user1,
      content: "hello thread",
    },
    {
      id: 2,
      thread,
      user: user2,
      content: "aaaaa",
    },
    {
      id: 3,
      thread,
      user: user1,
      content: "this is sample",
    },
    {
      id: 3,
      thread,
      user: user2,
      content: "sample response",
    },
  ];

  const [responses, setResponses] = useState<ResponseData[]>(sampleResponses);
  const responseItems = responses.map((response) => (
    <li key={response.id}>
      [{response.user.name}]: {response.content}
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

Thread.getInitialProps = async (_ctx) => {
  const thread: ThreadData = {
    id: 1,
    title: "Test Thread",
  };

  return {
    thread,
  };
};

export default Thread;
