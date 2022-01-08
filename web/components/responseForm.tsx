import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import { post } from "../common/api";
import { ResponseData } from "../common/types";

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

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (evt) => {
    try {
      evt.preventDefault();

      if (preHook) {
        preHook();
      }

      // FIXME: get user from session
      const resp = await post("/response", {
        content,
        receiveThread: threadId.toString(),
      });
      const { response }: PostResponseResponse = await resp.json();

      if (postHook) {
        postHook(response);
      }
    } catch (e) {
      console.error("an error occured while creating user:", e);
    }
  };

  return (
    <React.Fragment>
      <h3>レスポンスを投稿する</h3>
      <form onSubmit={handleSubmit}>
        <label>
          投稿内容:
          <br />
          <textarea
            name="content"
            onChange={(e) => setContent(e.target.value)}
          />
        </label>
        <br />
        <input type="submit" value="Submit" />
      </form>
    </React.Fragment>
  );
};
