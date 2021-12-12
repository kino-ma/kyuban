import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  const content = <p>goodbye</p>;

  return <div style={{ background: "blue" }}>{content}</div>;
}
