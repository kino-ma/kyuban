import { NextPage } from "next";
import Head from "next/head";
import React, { useState } from "react";
import styles from "../styles/Home.module.css";
import card from "../styles/card.module.css";
import form from "../styles/form.module.css";
import button from "../styles/button.module.css";
import { UserData } from "../common/types";
import { useRouter } from "next/router";
import { post } from "../common/api";
import { saveCurrentUser } from "../common/auth";

type SigninResponse = SuccessResponse;

type SuccessResponse = {
  user: UserData;
  success: true;
};

interface ErrorResponse {
  success: false | undefined;
  error: string | undefined;
}

const SignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (evt) => {
    try {
      evt.preventDefault();

      const resp = await post("/signin", {
        email,
        password,
      });

      if (!resp.ok) {
        const json = await resp.json();
        alert("サインイに失敗しました..." + json.error);
        return;
      }

      const { user }: SigninResponse = await resp.json();
      saveCurrentUser(user);

      router.push("/home");
    } catch (e) {
      console.error("an error occured while creating user:", e);
    }
  };

  return (
    <React.Fragment>
      <Head>
        <title>sign in</title>
      </Head>
      <main className={styles.main}>
        <h1>ようこそ！</h1>
        <div className={card.signin}>
          <h2>Sign In</h2>
          <form
            onSubmit={handleSubmit}
            className={form.signin__form__container}
          >
            <div>
              <div className={form.singin__form}>
                <input
                  style={{ outline: "none", border: "none" }}
                  placeholder="メールアドレス"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className={form.singin__form}>
                <input
                  type="password"
                  style={{ outline: "none", border: "none" }}
                  placeholder="パスワード"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <button className={button.button}>SIGN IN</button>
          </form>
        </div>
      </main>
    </React.Fragment>
  );
};

export default SignIn;
