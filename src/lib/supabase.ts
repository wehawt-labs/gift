import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-supabase-project.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key'

/**
 * Supabase Client Instance
 * Used for direct Supabase client queries, authentication, storage, or realtime features.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
