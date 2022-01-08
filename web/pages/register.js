import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";

import { post } from "../utils/api";

const Register = () => {
  const [formInput, setFormInput] = useState({
    name: '',
    email: '',
    password: ''
  });

  const router = useRouter();

  const handleSubmit = async (evt) => {
    try {
      evt.preventDefault();
      const params = new URLSearchParams(formInput);

      const resp = await post("http://localhost:5000/user", formInput);
      const json = await resp.json();
      alert("got the response: " + json);

      router.push("/home");
    }
    catch (e) {
      console.error("an error occured while creating user:", e);
    }
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
