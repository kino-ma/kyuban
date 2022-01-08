import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import React, { useState } from "react";
import { ThreadData } from "./[threadId]";
import { post } from "../../utils/api";

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
  const [description, setDescription] = useState("");

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (evt) => {
    try {
      evt.preventDefault();

      const resp = await post("/thread", { title, creator: "1" });
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

export default CreateThread;
