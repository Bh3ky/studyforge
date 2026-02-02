import { describe, it, expect } from "vitest"
import { requireUserId } from "../lib/auth/require-user"

describe("requireUserId", () => {
  it("returns user id when present", () => {
    expect(requireUserId("user_123")).toBe("user_123")
  })

  it("throws when missing", () => {
    expect(() => requireUserId(null)).toThrow("Unauthorized")
  })
})
