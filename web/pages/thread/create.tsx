import { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import React, { useState } from "react";
import { post } from "../../common/api";
import { ThreadData } from "../../common/types";

// FIXME: error validation
type CreateThreadResponse = SuccessResponse;

type SuccessResponse = {
  thread: ThreadData;
  success: true;
};

interface ErrorResponse {
  success: false | undefined;
  error: false | undefined;
}

const CreateThread: React.FC = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (evt) => {
    try {
      evt.preventDefault();

      const resp = await post("/threads", { title, content });
      const { thread }: CreateThreadResponse = await resp.json();

      router.push(`/thread/${thread.id}`);
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
              onChange={(e) => setContent(e.target.value)}
            />
          </label>
          <br />
          <input type="submit" value="Submit" />
        </form>
      </main>
    </React.Fragment>
  );
};

export default CreateThread;
