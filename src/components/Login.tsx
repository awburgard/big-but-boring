import { FormEvent, useState } from 'react'
import supabase from '../client/supabase'

export const Login = () => {
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  })

  const handleLoginForm = ({ key, value }: { key: string; value: string }) => {
    setLoginForm((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()
    await supabase.auth.signInWithPassword({
      ...loginForm,
    })
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        <input
          type='text'
          value={loginForm.email}
          placeholder='email'
          onChange={(e) =>
            handleLoginForm({ key: 'email', value: e.target.value })
          }
        />
        <input
          type='password'
          value={loginForm.password}
          placeholder='password'
          onChange={(e) =>
            handleLoginForm({ key: 'password', value: e.target.value })
          }
        />
        <button type='submit'>Login</button>
      </div>
    </form>
  )
}
