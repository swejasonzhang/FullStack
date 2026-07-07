export async function csrfFetch(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const method = (options.method ?? "GET").toUpperCase();
  const headers = new Headers(options.headers);

  if (method !== "GET") {
    if (!headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }
    headers.set("X-CSRF-Token", sessionStorage.getItem("X-CSRF-Token") ?? "");
  }

  const res = await fetch(url, { ...options, method, headers });

  if (res.status >= 400) throw res;

  return res;
}

export function storeCSRFToken(response: Response): void {
  const csrfToken = response.headers.get("X-CSRF-Token");
  if (csrfToken) sessionStorage.setItem("X-CSRF-Token", csrfToken);
}

export async function restoreCSRF(): Promise<Response> {
  const response = await csrfFetch("/api/session");
  storeCSRFToken(response);
  return response;
}
