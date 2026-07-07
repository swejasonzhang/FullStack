import { describe, it, expect } from "vitest";
import type { User } from "@/types";
import sessionReducer, {
  setCurrentUser,
  removeCurrentUser,
} from "./sessionSlice";

const user: User = {
  id: 1,
  email: "jason@example.com",
  username: "jason",
  created_at: "2026-01-01",
  updated_at: "2026-01-01",
};

describe("sessionSlice", () => {
  it("setCurrentUser sets the user", () => {
    const state = sessionReducer({ user: null }, setCurrentUser(user));
    expect(state.user).toEqual(user);
  });

  it("removeCurrentUser nulls the user", () => {
    const state = sessionReducer({ user }, removeCurrentUser());
    expect(state.user).toBeNull();
  });
});
