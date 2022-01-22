import React from "react";
import { ResponseData } from "../common/types";
import styles from "../styles/responseItem.module.css";
import { Icon } from "./icon";
import { UserName } from "./userName";

interface IResponseItemProps {
  response: ResponseData;
}

export const ResponseItem = ({ response }: IResponseItemProps) => {
  return (
    <div className={styles.container}>
      <Icon user={response.sender} size={40} />
      <div className={styles["second-column"]}>
        <span className={styles["user-name"]}>
          <UserName user={response.sender} />
        </span>
        <span className={styles.content}>{response.content}</span>
        <span className={styles.date}>{response.createdAt}</span>
      </div>
    </div>
  );
};
