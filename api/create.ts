// TODO use env variables
const CREATE_URL = `http://localhost:4000/create`;

interface ErrorResponse {
  type: 'error';
  error: string;
}

interface CreateResponse {
  type: 'success';
  id: string;
}

async function create({
  url,
  interval,
  script,
}: {
  url: string;
  interval: number;
  script: string;
}): Promise<{ id: string }> {
  const body = {
    url,
    interval,
    script,
  };

  try {
    const response: ErrorResponse | CreateResponse = await fetch(CREATE_URL, {
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
    throw error;
  }
}

export { create };
