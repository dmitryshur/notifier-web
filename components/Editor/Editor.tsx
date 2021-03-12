import React from 'react';
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
  function handleChange(value: string): void {
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
    </div>
  );
}

export default Editor;
