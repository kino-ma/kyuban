import { NextPage } from "next";
import Head from "next/head";
import React, { useState } from "react";

import { UserData } from "./user";

import styles from "../styles/Home.module.css";
import threads from "../styles/thread.module.css";
import button from "../styles/button.module.css";

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
  // const responses = thread.responses;
  // const responseItems = responses.map((response) => (
  //   <li key={response.id}>
  //     [<b>{response.user.name}</b>]: {response.content}
  //   </li>
  // ));

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
          <div className={threads.thread__items}>
            {(() => {
              const items = [];
              for (let i = 0; i < 6; i++) {
                items.push(
                  <>
                    <div className={threads.thread__item__user}>名前</div>
                    <div className={threads.thread__item__text}>テキスト</div>
                    <div className={threads.thread__item__date}>日付</div>
                  </>
                );
              }
              return <div>{items}</div>;
            })()}
          </div>
        </div>
        <div className={threads.thread__container__right}>
          <h3 style={{ margin: 0 }}>レスポンスする</h3>
          <div className={threads.thread__input__container}>
            <textarea
              className={threads.thread__input__area}
              rows={6}
            />
            <button className={button.button} style={{ marginTop: 0 }}>送信</button>
          </div>
        </div>
        <div className={threads.main}></div>

        {/* <h1>{thread.title}</h1>
        <ul>{responseItems}</ul> */}
      </main>
    </React.Fragment>
  );
};

// Thread.getInitialProps = async (_ctx) => {
//   const res = await fetch("http://api:5000/thread");
//   const thread = await res.json();

//   return {
//     thread,
//   };
// };

export default Thread;
