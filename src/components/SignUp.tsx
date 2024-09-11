import { FormEvent, useState } from 'react'
import supabase from '../client/supabase'

export const SignUp = () => {
  const [signUpForm, setSignUpForm] = useState({
    email: '',
    password: '',
  })

  const handleSignUpForm = ({ key, value }: { key: string; value: string }) => {
    setSignUpForm((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()
    await supabase.auth.signUp({
      ...signUpForm,
    })
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        <input
          type='text'
          value={signUpForm.email}
          placeholder='email'
          onChange={(e) =>
            handleSignUpForm({ key: 'email', value: e.target.value })
          }
        />
        <input
          type='password'
          value={signUpForm.password}
          placeholder='password'
          onChange={(e) =>
            handleSignUpForm({ key: 'password', value: e.target.value })
          }
        />
        <button type='submit'>Sign Up</button>
      </div>
    </form>
  )
}
