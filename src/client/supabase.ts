import { Database } from './../../database.types'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient<Database>(
  'https://bavkvgrcxszucnfatdjk.supabase.co',
  import.meta.env.VITE_SUPABASE_PUBLIC_ANON_KEY
)

export default supabase
