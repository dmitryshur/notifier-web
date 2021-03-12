import React, { useState } from 'react';
import Input from 'components/Input/Input';
import Button from 'components/Button/Button';
import styles from './Form.module.css';

const MAX_INTERVAL = 604_800;

interface FormProps {
  onSubmit: ({ interval, url }: { interval: number; url: string }) => void;
}

function Form(props: FormProps) {
  const [intervalValue, setIntervalValue] = useState('');
  const [urlValue, setUrlValue] = useState('');
  const [errors, setErrors] = useState({ interval: '', url: '' });

  function isFormValid(): boolean {
    const validationErrors = { interval: '', url: '' };

    if (
      Number(intervalValue) < 5 ||
      Number(intervalValue) > MAX_INTERVAL ||
      Number(intervalValue) % 5 !== 0
    ) {
      validationErrors.interval =
        'Interval must be in range 5-604,800 (week in seconds) and a multiple of 5';
    }

    try {
      new URL(urlValue);
    } catch (_error) {
      validationErrors.url = 'URL must not be empty and should be valid';
    }

    if (validationErrors.interval || validationErrors.url) {
      setErrors(validationErrors);
      return false;
    }

    return true;
  }

  function handleIntervalChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (errors.interval) {
      setErrors(prevState => ({ ...prevState, interval: '' }));
    }

    const digitsRegex = /^\d*$/;
    const value = event.target.value;

    if (!digitsRegex.test(value)) {
      return;
    }

    setIntervalValue(value);
  }

  function handleUrlChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (errors.url) {
      setErrors(prevState => ({ ...prevState, url: '' }));
    }

    const value = event.target.value;

    setUrlValue(value);
  }

  // TODO error msgs will be passed to the inputs here
  function handleSubmit() {
    if (isFormValid()) {
      props.onSubmit({ interval: Number(intervalValue), url: urlValue });
    }
  }

  return (
    <div className={styles.Form}>
      <div className={styles['Form__text']}>
        <h1>NotifyMe!</h1>
        <p>
          NotifyMe! is a service which allows you to be notified via our Telegram bot when a
          Javascript script, provided by you, successfully executes and returns 'true' <br /> How to
          get started:
        </p>
        <ol>
          <li>Fill in the interval value in seconds between 5 - 604,800</li>
          <li>Fill in the URL of the website your script should on</li>
          <li>Submit the data by clicking the SUBMIT button</li>
          <li>
            A new Telegram button should appear. Click it. This should start a conversation with our
            bot
          </li>
        </ol>
        Your script should now be executed on our server every N number of seconds, where N is the
        number you specified.
        <br /> To view the available commands of our bot, you can use the
        <strong> /help</strong> command in its chat.
      </div>
      <div className={styles['Form__inputs']}>
        <Input
          className={styles['Form__input']}
          helperText="Value in seconds"
          placeholder="Interval"
          errorText={errors.interval}
          value={intervalValue}
          onChange={handleIntervalChange}
        />
        <Input
          className={styles['Form__input']}
          helperText="The website where the script will execute"
          placeholder="URL"
          errorText={errors.url}
          value={urlValue}
          onChange={handleUrlChange}
        />
      </div>
      <Button disabled={!intervalValue || !urlValue} onClick={handleSubmit}>
        SUBMIT
      </Button>
    </div>
  );
}

export default Form;
