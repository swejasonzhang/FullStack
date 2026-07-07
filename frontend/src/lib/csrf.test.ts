import { describe, it, expect, vi, beforeEach } from "vitest";
import { csrfFetch } from "./csrf";

describe("csrfFetch", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    sessionStorage.clear();
  });

  it("sets Content-Type and X-CSRF-Token headers on non-GET requests", async () => {
    sessionStorage.setItem("X-CSRF-Token", "tok");
    const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    await csrfFetch("/api/items", { method: "POST", body: "{}" });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [, options] = fetchMock.mock.calls[0];
    const headers = options.headers as Headers;
    expect(headers.get("Content-Type")).toBe("application/json");
    expect(headers.get("X-CSRF-Token")).toBe("tok");
  });

  it("does not set CSRF headers on GET requests", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    await csrfFetch("/api/session");

    const [, options] = fetchMock.mock.calls[0];
    const headers = options.headers as Headers;
    expect(headers.get("Content-Type")).toBeNull();
    expect(headers.get("X-CSRF-Token")).toBeNull();
  });

  it("throws the Response when status is >= 400", async () => {
    const errorResponse = new Response(null, { status: 422 });
    const fetchMock = vi.fn().mockResolvedValue(errorResponse);
    vi.stubGlobal("fetch", fetchMock);

    await expect(csrfFetch("/api/items", { method: "POST" })).rejects.toBe(
      errorResponse
    );
  });
});
