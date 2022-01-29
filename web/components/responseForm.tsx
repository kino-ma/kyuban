import { useRouter } from "next/router";
import React, { useState } from "react";

import { post } from "../common/api";
import { ResponseData } from "../common/types";
import button from "../styles/button.module.css";
import threads from "../styles/thread.module.css";

// FIXME: error validation
type PostResponseResponse = SuccessResponse;

type SuccessResponse = {
  response: ResponseData;
  success: true;
};

interface ErrorResponse {
  success: false | undefined;
  error: false | undefined;
}

interface IResponseFormProps {
  threadId: number;
  preRequestHook?: () => void;
  postRequestHook?: (response: ResponseData) => void;
}

export const ResponseForm: React.FC<IResponseFormProps> = ({
  threadId,
  preRequestHook: preHook,
  postRequestHook: postHook,
}) => {
  const router = useRouter();
  const [content, setContent] = useState("");

  const handleSubmit: React.MouseEventHandler = async (evt) => {
    try {
      evt.preventDefault();

      if (preHook) {
        preHook();
      }

      // FIXME: get user from session
      const resp = await post("/responses", {
        content,
        receiveThread: threadId.toString(),
      });
      const { response }: PostResponseResponse = await resp.json();

      setContent("");
      if (postHook) {
        postHook(response);
      }
    } catch (e) {
      console.error("an error occured while creating user:", e);
    }
  };

  return (
    <React.Fragment>
      <div className={threads.thread__input__container}>
        <textarea
          className={threads.thread__input__area}
          rows={6}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          className={button.button}
          onClick={handleSubmit}
          style={{ marginTop: 0 }}
        >
          送信
        </button>
      </div>
    </React.Fragment>
  );
};
