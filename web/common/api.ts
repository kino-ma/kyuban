const PORT = 5000;

const checkClientSide = (): boolean => {
  return typeof window !== "undefined";
};

const getBaseUrl = (isServerSide: boolean): string => {
  const host = isServerSide ? "api" : "localhost";
  const baseUrl = `http://${host}:${PORT}`;
  return baseUrl;
};

type apiOptions = {
  session?: string;
  isServerSide?: boolean;
};

export const post = (
  path: string,
  data: Record<string, string>,
  options?: apiOptions
): Promise<Response> => {
  const params = new URLSearchParams(data);
  let { isServerSide, session } = options ?? {};

  if (typeof isServerSide === "undefined") {
    isServerSide = !checkClientSide();
  }
  const baseUrl = getBaseUrl(isServerSide);

  let headers = { "Content-Type": "application/x-www-form-urlencoded" };
  if (session) {
    headers["Cookie"] = `session=${session}`;
  }

  const resp = fetch(`${baseUrl}${path}`, {
    method: "POST",
    headers,
    body: params,
    credentials: "include",
  });

  return resp;
};

export const get = (path: string, options?: apiOptions): Promise<Response> => {
  let { isServerSide, session } = options ?? {};
  if (typeof isServerSide === "undefined") {
    isServerSide = !checkClientSide();
  }
  const baseUrl = getBaseUrl(isServerSide);

  let headers = {};
  if (session) {
    headers["Cookie"] = `session=${session}`;
  }

  const resp = fetch(`${baseUrl}${path}`, {
    credentials: "include",
    headers,
  });
  return resp;
};
