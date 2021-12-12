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
  responses: ResponseData[];
};

type ResponseData = {
  id: number;
  threadId: number;
  user: UserData;
  content: string;
};

const Thread: NextPage<ThreadProps> = ({ thread }) => {
  const responses = thread.responses;
  const responseItems = responses.map((response) => (
    <li key={response.id}>
      [<b>{response.user.name}</b>]: {response.content}
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
  const res = await fetch("http://api:5000/thread");
  const thread = await res.json();

  return {
    thread,
  };
};

export default Thread;
