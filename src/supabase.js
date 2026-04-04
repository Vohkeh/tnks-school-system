import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = "https://hqusooghcafguejukfex.supabase.co"
const SUPABASE_KEY = "sb_publishable_Wwrgf9CzLq0qUSxrfTXGmw_UZ1V3ehP"

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
