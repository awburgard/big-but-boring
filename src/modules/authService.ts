import supabase from '../client/supabase'

// Sign up a new user
export const signupUser = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) throw error
  return data.user
}

// Login a user
export const loginUser = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) throw error
  return data.user
}

// Logout a user
export const logoutUser = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}
