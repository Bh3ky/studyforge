import { describe, it, expect, afterEach } from "vitest"
import { getSupabaseUserClient } from "../lib/supabase/client"

const originalEnv = { ...process.env }

afterEach(() => {
  process.env = { ...originalEnv }
})

describe("getSupabaseUserClient", () => {
  it("throws when env is missing", () => {
    delete process.env.SUPABASE_URL
    delete process.env.SUPABASE_ANON_KEY
    delete process.env.SUPABASE_PUBLISHABLE_KEY
    expect(() => getSupabaseUserClient("token")).toThrow("Supabase anon or publishable credentials are not set.")
  })

  it("returns a client when env is present", () => {
    process.env.SUPABASE_URL = "https://example.supabase.co"
    process.env.SUPABASE_ANON_KEY = "anon-key"
    const client = getSupabaseUserClient("token")
    expect(typeof client.from).toBe("function")
  })

  it("accepts publishable key", () => {
    process.env.SUPABASE_URL = "https://example.supabase.co"
    process.env.SUPABASE_PUBLISHABLE_KEY = "publishable-key"
    const client = getSupabaseUserClient("token")
    expect(typeof client.from).toBe("function")
  })
})
