import React, { useReducer } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { create } from 'api/create';
import Form from 'components/Form/Form';
import styles from './index.module.css';

const Editor = dynamic(() => import('components/Editor/Editor'), {
  ssr: false,
  loading: () => <div className={styles['Home__loader']} />,
});

const defaultScriptValue = `// All your code should be written here
// The script should return either 'true' or 'false'.
// The moment this script returns 'true', you will be
// notified via our Telegram bot
`;

const initialState = {
  scriptValue: defaultScriptValue,
  errors: [],
  scriptId: '',
  isFetching: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SCRIPT_CHANGED':
      return { ...state, scriptValue: action.payload };

    case 'FETCH_CREATE':
      return { ...state, isFetching: true, errors: [] };

    case 'FETCH_CREATE_SUCCESS':
      return { ...state, isFetching: false, scriptId: action.payload };

    case 'FETCH_CREATE_FAILURE':
      return { ...state, isFetching: false, errors: action.payload };

    case 'VALIDATION_ERRORS':
      return { ...state, errors: action.payload };
  }
}

export default function Home() {
  const [state, dispatch] = useReducer(reducer, initialState);

  async function fetchCreate({
    url,
    interval,
    script,
  }: {
    url: string;
    interval: number;
    script: string;
  }) {
    dispatch({ type: 'FETCH_CREATE' });

    try {
      const { id } = await create({ url, interval, script });
      dispatch({ type: 'FETCH_CREATE_SUCCESS', payload: id });
    } catch (error) {
      dispatch({ type: 'FETCH_CREATE_FAILURE', payload: [error] });
    }
  }

  function handleScriptChange(value: string) {
    dispatch({ type: 'SCRIPT_CHANGED', payload: value });
  }

  async function handleSubmit({ interval, url }: { interval: number; url: string }) {
    const script = state.scriptValue.replace(defaultScriptValue, '');

    if (script.length > 10_000) {
      dispatch({
        type: 'VALIDATION_ERRORS',
        payload: ['The script is too long. The maximum length is 10,000.'],
      });
      return;
    }

    fetchCreate({ url, interval, script });
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
        <Form
          isFetching={state.isFetching}
          errors={state.errors}
          scriptId={state.scriptId}
          onSubmit={handleSubmit}
        />
        <Editor value={state.scriptValue} onChange={handleScriptChange} />
      </div>
    </>
  );
}
