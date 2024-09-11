import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://bavkvgrcxszucnfatdjk.supabase.co',
  import.meta.env.VITE_SUPABASE_PUBLIC_ANON_KEY
)

export default supabase
