import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signupUser } from '../modules/authService'
import SignupPresentation from '../components/SignupPresentation'

const SignupContainer = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await signupUser(email, password)
      navigate('/') // Redirect to the main page after signup
    } catch (err) {
      setError((err as Error).message)
    }
  }

  return (
    <SignupPresentation
      email={email}
      password={password}
      error={error}
      onEmailChange={setEmail}
      onPasswordChange={setPassword}
      onSubmit={handleSignup}
    />
  )
}

export default SignupContainer
