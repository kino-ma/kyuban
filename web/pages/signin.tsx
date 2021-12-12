import { NextPage } from "next";
import Head from "next/head";
import React, { useState } from "react";
import styles from "../styles/Home.module.css";
import card from "../styles/card.module.css";
import form from "../styles/form.module.css";
import button from "../styles/button.module.css";

const SignIn = () => {
  return (
    <React.Fragment>
      <Head>
        <title>sign in</title>
      </Head>
      <main className={styles.main}>
        <h1>ようこそ！</h1>
        <div className={card.signin}>
          <h2>Sign In</h2>
          <div className={form.singin__form}>
            <input
              style={{ outline: "none", border: "none" }}
              placeholder="ユーザー名"
            />
          </div>
          <div className={form.singin__form}>
            <input
              style={{ outline: "none", border: "none" }}
              placeholder="パスワード"
            />
          </div>
            <button className={button.button}>SIGN IN</button>
        </div>
      </main>
    </React.Fragment>
  );
};

export default SignIn;
