// miki-san
import { NextPage } from "next";
import Head from "next/head";
import React, { useState } from "react";

const Register = () => {
  const [formInput, setFormInput] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const params = new URLSearchParams(formInput);

    return fetch("http://localhost:5000/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params
    })
      .then((resp) => {
        return resp.json();
      })
      .then((json) => alert(json))
      .catch((err) => console.error(err))
  }

  return (
    <React.Fragment>
      <Head>
        <title>register</title>
      </Head>
      <main>
        <h1>登録画面</h1>
        <form onSubmit={handleSubmit}>
          <label>
            名前:<br />
            <input type="text" name="name" onChange={(e) => setFormInput({ ...formInput, name: e.target.value })} />
          </label>
          <br />
          <label>
            メールアドレス:<br />
            <input type="email" name="email" onChange={(e) => setFormInput({ ...formInput, email: e.target.value })} />
          </label>
          <br />
          <label>
            パスワード:<br />
            <input type="text" name="password" onChange={(e) => setFormInput({ ...formInput, password: e.target.value })} />
          </label>
          <br /><br />
          <input type="submit" value="Submit" />
        </form>
      </main>
    </React.Fragment>
  );
};

export default Register;
