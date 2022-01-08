export const post = (
  path: string,
  data: Record<string, string>
): Promise<Response> => {
  const params = new URLSearchParams(data);

  const resp = fetch(`http://localhost:5000${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params,
  });

  return resp;
};

export const get = (path: string): Promise<Response> => {
  const resp = fetch(`http://localhost:5000${path}`);

  return resp;
};
