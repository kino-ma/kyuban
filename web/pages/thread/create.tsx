import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import React, { useState } from "react";
import { ThreadData } from ".";

interface ThreadProps {
  thread: ThreadData;
}

const Thread: NextPage<ThreadProps> = ({ thread }) => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (evt) => {
    try {
      evt.preventDefault();
      const params = new URLSearchParams({ title });

      const resp = await fetch("http://localhost:5000/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params,
      });
      const json = await resp.json();
      alert("got the response: " + json);

      router.push("/home");
    } catch (e) {
      console.error("an error occured while creating user:", e);
    }
  };

  return (
    <React.Fragment>
      <Head>
        <title>新しいスレッドを作成</title>
      </Head>
      <main>
        <h1>新しいスレッドを作成</h1>
        <form onSubmit={handleSubmit}>
          <label>
            スレッドタイトル:
            <br />
            <input
              type="text"
              name="title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <br />
          <label>
            このスレッドについて:
            <br />
            <textarea
              name="content"
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <br />
          <input type="submit" value="Submit" />
        </form>
      </main>
    </React.Fragment>
  );
};

Thread.getInitialProps = async (_ctx) => {
  const res = await fetch("http://api:5000/thread");
  const { threads } = await res.json();

  return {
    thread: threads[0],
  };
};

export default Thread;
