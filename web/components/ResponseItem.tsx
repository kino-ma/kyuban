import React from "react";
import { ResponseData } from "../common/types";
import styles from "../styles/thread.module.css";

interface IResponseItemProps {
  response: ResponseData;
}

export const ResponseItem = ({ response }: IResponseItemProps) => {
  return (
    <React.Fragment>
      <div className={styles.thread__item__user}>{response.sender.name}</div>
      <div className={styles.thread__item__text}>{response.content}</div>
      <div className={styles.thread__item__date}>{response.createdAt}</div>
    </React.Fragment>
  );
};
