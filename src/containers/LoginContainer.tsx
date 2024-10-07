import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../modules/authService'
import LoginPresentation from '../components/LoginPresentation'

const LoginContainer = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await loginUser(email, password)
      navigate('/') // Redirect to the main page after login
    } catch (err) {
      setError((err as Error).message)
    }
  }

  return (
    <LoginPresentation
      email={email}
      password={password}
      error={error}
      onEmailChange={setEmail}
      onPasswordChange={setPassword}
      onSubmit={handleLogin}
    />
  )
}

export default LoginContainer
