type RequestParams = {
  baseUrl?: string;
  api: string;
  headers?: HeadersInit;
  data?: object;
  method: 'GET' | 'POST';
};

const httpRequest = async (params: RequestParams) => {
  const { method, api, baseUrl, data, headers } = params;
  const isApiFullUrl = ['http', 'https'].some((protocol) => api.includes(protocol));
  // ignore default base url if full url is passed.
  const requestUrl = new URL(`${isApiFullUrl ? '' : baseUrl || process.env.REACT_APP_BASE_API_URL}${api}`);

  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  if (method === 'GET') {
    if (data) {
      requestUrl.search = new URLSearchParams(data as Record<string, string>).toString();
    }
  } else if (method === 'POST') {
    options.body = JSON.stringify(data);
  }

  return await fetch(requestUrl, options);
};

export { httpRequest };
