import React, { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import Form from 'components/Form/Form';
import styles from './index.module.css';

const Editor = dynamic(() => import('components/Editor/Editor'), { ssr: false });

const defaultScriptValue = `// All your code should be written here
// The script should return either 'true' or 'false'.
// The moment this script returns 'true', you will be
// notified via our Telegram bot
`;

export default function Home() {
  const [scriptValue, setScriptValue] = useState(defaultScriptValue);

  function handleSubmit({ interval, url }: { interval: number; url: string }) {
    console.log(interval);
    console.log(url);
    console.log(scriptValue);
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
        <Editor value={scriptValue} onChange={setScriptValue} />
        <Form onSubmit={handleSubmit} />
      </div>
    </>
  );
}
