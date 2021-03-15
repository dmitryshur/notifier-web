import React, { useEffect, useRef } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-gruvbox';
import 'ace-builds/src-noconflict/ext-language_tools';
import styles from './Editor.module.css';

interface EditorProps {
  value: string;
  onChange: Function;
}

function Editor(props: EditorProps) {
  const timer = useRef(0);

  useEffect(() => {
    const savedScript = window.localStorage.getItem('script');
    if (savedScript) {
      handleChange(savedScript);
    }
  }, []);

  function saveScript(value: string) {
    return () => {
      window.localStorage.setItem('script', value);
    };
  }

  function handleChange(value: string): void {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(saveScript(value), 2000);

    if (props.onChange) {
      props.onChange(value);
    }
  }

  return (
    <div className={styles['Editor']}>
      <AceEditor
        height="100%"
        width="100%"
        mode="javascript"
        value={props.value}
        cursorStart={2}
        theme="gruvbox"
        fontSize="1rem"
        setOptions={{ enableBasicAutocompletion: true }}
        onChange={handleChange}
      />
      <div className={styles['Editor__counter']}>{`${props.value.length}/10000`}</div>
    </div>
  );
}

export default Editor;
