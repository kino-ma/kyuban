const PORT = 5000;

const checkClientSide = (): boolean => {
  return typeof window === "undefined";
};

const getBaseUrl = (isServerSide: boolean): string => {
  const host = isServerSide ? "api" : "localhost";
  const baseUrl = `http://${host}:${PORT}`;
  return baseUrl;
};

export const post = (
  path: string,
  data: Record<string, string>,
  isServerSide?: boolean
): Promise<Response> => {
  const params = new URLSearchParams(data);

  if (typeof isServerSide === "undefined") {
    isServerSide = !checkClientSide();
  }
  const baseUrl = getBaseUrl(isServerSide);

  const resp = fetch(`${baseUrl}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params,
  });

  return resp;
};

export const get = (
  path: string,
  isServerSide?: boolean
): Promise<Response> => {
  if (typeof isServerSide === "undefined") {
    isServerSide = !checkClientSide();
  }
  const baseUrl = getBaseUrl(isServerSide);

  const resp = fetch(`${baseUrl}${path}`);
  return resp;
};
