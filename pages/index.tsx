import React from 'react';
import Head from 'next/head';
import Form from 'components/Form/Form';
import Editor from 'components/Editor/Editor';
import styles from './index.module.css';

export default function Home() {
  function handleSubmit({ interval, url }: { interval: number; url: string }) {
    console.log(interval);
    console.log(url);
  }

  return (
    <>
      <Head>
        <title>NotifyMe!</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className={styles.Home}>
        <Editor />
        <Form onSubmit={handleSubmit} />
      </div>
    </>
  );
}
