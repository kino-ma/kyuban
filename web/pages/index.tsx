import Head from "next/head";
import Link from "next/link";
import React from "react";

import styles from "../styles/Home.module.css";
import card from "../styles/card.module.css";
import { Button } from "../components/button";

export default function Home() {
  return (
    <React.Fragment>
      <Head>
        <title>けいじばん</title>
      </Head>
      <main className={styles.main}>
        <h1>ようこそ！</h1>
        <div className={card.index}>
          <Link href="/signin">
            <Button>サインイン</Button>
          </Link>
          <Link href="/register">
            <Button>登録</Button>
          </Link>
        </div>
      </main>
    </React.Fragment>
  );
}
