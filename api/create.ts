const CREATE_URL = '{{API_HOST}}/api/create';

interface ErrorResponse {
  type: 'error';
  error: string;
}

interface CreateResponse {
  type: 'success';
  id: string;
}

async function create({
  apiHost,
  url,
  interval,
  script,
}: {
  apiHost: string;
  url: string;
  interval: number;
  script: string;
}): Promise<{ id: string }> {
  const body = {
    url,
    interval,
    script,
  };

  const apiUrl = CREATE_URL.replace('{{API_HOST}}', apiHost);
  try {
    const response: ErrorResponse | CreateResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      body: JSON.stringify(body),
    }).then(response => response.json());

    if ('error' in response) {
      throw response.error;
    } else {
      return { id: response.id };
    }
  } catch (error) {
    if (error instanceof TypeError) {
      throw 'Server error. try again later';
    }

    throw error;
  }
}

export { create };
