import { API, responseStatus, statusCode } from '../constants/api';
import { delay } from '../helper/utils';
import { DeliveryRequest, DeliveryResponse } from '../interfaces/Delivery';

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

  if (method === 'POST' && data) {
    options.body = JSON.stringify(data);
  }

  return await fetch(requestUrl, options);
};

const getRoutesInfo = async (token: string): Promise<DeliveryResponse | null> => {
  const res = await httpRequest({
    // api: '/mock/route/inprogress',
    api: `${API.route}/${token}`,
    method: 'GET',
  });

  if (res.status !== statusCode.success) {
    throw new Error(res.statusText);
  }

  const resObject = await res.json();
  const { status } = resObject;

  if (status === responseStatus.inProgress) {
    await delay(1000);
    return await getRoutesInfo(token);
  } else if (status === responseStatus.failure) {
    throw new Error(resObject.error);
  } else if (status === responseStatus.success) {
    return resObject;
  }

  return null;
};

const getRouteToken = async (data: DeliveryRequest) => {
  const res = await httpRequest({
    api: API.route,
    method: 'POST',
    data: {
      origin: data.startingPoint,
      destination: data.dropOffPoint,
    },
  });

  if (res.status !== statusCode.success) {
    throw new Error(res.statusText);
  }

  return await res.json();
};

export { httpRequest, getRouteToken, getRoutesInfo };
