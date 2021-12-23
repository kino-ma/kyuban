// miki-san
import { NextPage } from "next";
import Head from "next/head";
import React, { useState } from "react";

const Register = () => {
  // ここを編集する

  return (
    <React.Fragment>
      <Head>
        <title>register</title>
      </Head>
      <main>
        <h1>登録画面</h1>
        <form>
        <label>
          名前:<br />
          <input type="text" name="name" />
        </label>
        </form>
        <br />
        <form>
        <label>
          パスワード:<br />
          <input type="text" name="password" />
        </label>
        <br /><br />
        <input type="submit" value="Submit" onClick=""/>
        </form>
      </main>
    </React.Fragment>
  );
};

export default Register;
