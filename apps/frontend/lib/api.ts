const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

export const itemApi = {
  list: () => request<import('./types').ItemResource[]>('/item'),
  get: (uuid: string) => request<import('./types').ItemResource>(`/item/${uuid}`),
  create: (body: import('./types').CreateItemInput) =>
    request<import('./types').ItemResource>('/item', { method: 'POST', body: JSON.stringify(body) }),
  update: (uuid: string, body: import('./types').UpdateItemInput) =>
    request<import('./types').ItemResource>(`/item/${uuid}`, {
      method: 'PATCH',
      body: JSON.stringify(body),
    }),
};

export const itemTypeApi = {
  list: () => request<import('./types').ItemTypeResource[]>('/item-type'),
  get: (uuid: string) => request<import('./types').ItemTypeResource>(`/item-type/${uuid}`),
  create: (body: import('./types').CreateItemTypeInput) =>
    request<import('./types').ItemTypeResource>('/item-type', {
      method: 'POST',
      body: JSON.stringify(body),
    }),
  update: (uuid: string, body: import('./types').UpdateItemTypeInput) =>
    request<import('./types').ItemTypeResource>(`/item-type/${uuid}`, {
      method: 'PATCH',
      body: JSON.stringify(body),
    }),
};
