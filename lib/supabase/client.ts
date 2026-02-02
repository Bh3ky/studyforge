import { createClient } from "@supabase/supabase-js"

const DEFAULT_SCHEMA = "app"

export function getSupabaseUserClient(accessToken: string) {
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY ?? process.env.SUPABASE_PUBLISHABLE_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase anon or publishable credentials are not set.")
  }

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
      accessToken: async () => accessToken,
    },
    db: {
      schema: DEFAULT_SCHEMA,
    },
  })
}
