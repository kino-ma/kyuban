// const PORT = 5000;
const PORT = 80;

const checkClientSide = (): boolean => {
  return typeof window !== "undefined";
};

const getBaseUrl = (isServerSide: boolean): string => {
  // const host = isServerSide ? "api" : "localhost";
  const host = "";
  const baseUrl = `http://${host}:${PORT}`;
  return baseUrl;
};

type apiOptions = {
  session?: string;
  isServerSide?: boolean;
};

const call = (
  method: "GET" | "POST" | "DELETE",
  path: string,
  data?: Record<string, string>,
  options?: apiOptions
): Promise<Response> => {
  let { isServerSide, session } = options ?? {};

  if (typeof isServerSide === "undefined") {
    isServerSide = !checkClientSide();
  }
  const baseUrl = getBaseUrl(isServerSide);

  const params = data ? new URLSearchParams(data) : undefined;

  let headers: HeadersInit = {};

  if (data) {
    headers["Content-Type"] = "application/x-www-form-urlencoded";
  }

  if (session) {
    headers["Cookie"] = `session=${session}`;
  }

  const resp = fetch(`${baseUrl}${path}`, {
    method,
    headers,
    body: params,
    credentials: "include",
  });

  return resp;
};

export const post = (
  path: string,
  data?: Record<string, string>,
  options?: apiOptions
): Promise<Response> => {
  return call("POST", path, data, options);
};

export const get = (path: string, options?: apiOptions): Promise<Response> => {
  return call("GET", path, null, options);
};

export const delete_ = (
  path: string,
  options?: apiOptions
): Promise<Response> => {
  return call("DELETE", path, null, options);
};
